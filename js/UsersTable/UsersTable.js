/**
 * This class represents the table that manage users in the application
 * It's built based on the Singleton pattern
 * IMPORTANT: Functions where the name starts with  _ are private
 * Source: https://addyosmani.com/resources/essentialjsdesignpatterns/book/
 *
 * Return the Table instance initialized  and ready to be used as single access point.
 * @return {function} getInstance
 */

const Table = (function() {
  let instance;

  function init() {
    const mainContainer = $(".main-container");

    function construct(container) {
      $.get("html/UserTable.html", function(htmlSkeleton) {
        container.empty().append(htmlSkeleton);
        $("container.find");
        try {
          _showOverlay(true);
          ApiMachine.request("/users", {
            method: "GET",
            successCallback: initUsers
          });
          ApiMachine.request("/skills", {
            method: "GET",
            successCallback: function(response) {},
            storage: { key: "skills", collect: "_id" }
          });
          ApiMachine.request("/langs", {
            method: "GET",
            successCallback: function(response) {},
            storage: { key: "languages", collect: "_id" }
          });
        } catch (err) {
          return console.error("An error happened: ", err);
        }
      }).fail(function(err) {
        _showOverlay(false);
        throw new Error(err);
      });
    }

    /**
     * Initialize all the object event listeners
     * @function _setupInternalEventListeners
     * @private
     */
    function _setupInternalEventListeners() {
      $(window)
        .off("resize")
        .on("resize", function(e) {
          const width = this.innerWidth;
          renderDataOnResize(width);
        });

      if (window.innerWidth > 868) {
        $("div.main-container")
          .find("td.options")
          .off("click")
          .on("click", "button:not(.detail)", _optionButtonsEvent);
      } else {
        $("div#card-container")
          .find(".user-card .card-buttons")
          .off("click")
          .on("click", "button", _optionButtonsEvent);
      }

      $("#userModal").on("show.bs.modal", renderDataOnModal);
    }

    /**
     * This function choose the actions depends on the button that
     * fire the event
     * @function _optionButtonsEvent
     * @private
     * @param {object} event
     */
    function _optionButtonsEvent(event) {
      const button = $(event.currentTarget);
      const userID = button.data("id");
      if (button.hasClass("edit")) {
        getUserByID(userID, userForm.editForm);
      } else {
        if (window.confirm("Are you sure to delete this user?")) {
          deleteUser(userID);
        }
      }
    }

    function _renderLangsAndSkills(user) {
      const skillsFromStorage = JSON.parse(sessionStorage.getItem("skills"));
      const langsFromStorage = JSON.parse(sessionStorage.getItem("languages"));

      const data = {
        skills: [],
        languages: []
      };

      Object.keys(data).forEach(key => {
        data[key] = user[key].map(item => {
          const sourceData = JSON.parse(sessionStorage.getItem(key));
          const dataFromStorage = sourceData[item["_id"] ? item["_id"] : item];
          if (window.innerWidth <= 867) {
            return `<span class="badge badge-secondary mr-1">${
              dataFromStorage.label
            }</span>`;
          } else {
            return `<img class="mx-1 mt-2" src="../assets/images/${key}/${
              dataFromStorage.label
            }.png" alt="${
              dataFromStorage.label
            }" width="48" height="48" title="${dataFromStorage.label}" />`;
          }
        });
      });

      return data;
    }

    /** Display users depending on the actual window size
     * @function initUsers
     * @public
     * @param {array} data - Array of JSON data
     */
    function initUsers(data, browserWidth = window.innerWidth) {
      let users = data;
      if (browserWidth > 868) {
        const tableBody = mainContainer.find("#users-table tbody");
        tableBody.empty();
        for (let user of users) {
          _appendRowData(tableBody, user);
        }

        if (tableBody.children("tr").length === 0) {
          tableBody.append(`
             <div class="alert alert-warning" role="alert">
               <h6>No results found</h6>
              </div>
         `);
        }
      } else {
        mainContainer
          .find("#users-table")
          .hide()
          .find("tbody")
          .empty();
        let cardContainer = mainContainer.find("div#card-container");
        cardContainer.empty();
        for (let user of users) {
          _appendCardData(cardContainer, user);
        }
      }
      _showOverlay(false);
      _setupInternalEventListeners();
    }

    /**
     * Append a new HTML row into the specific container with the user data
     * @function _appendRowData
     * @private
     * @param {jQuery Object} tableBody
     * @param {Object} user
     */
    function _appendRowData(tableBody, user) {
      tableBody.append(_tableRowSkeleton(user));
    }

    /**
     * Append a new HTML Card element into the specific container with the user data
     * @function _appendCardData
     * @private
     * @param {jQuery Object} cardContainer
     * @param {Object} user
     */
    function _appendCardData(cardContainer, user) {
      cardContainer.append(_cardSkeleton(user));
    }

    /**
     * Handle the resize on the browser to render data in a new container
     * @function renderDataOnResize
     * @public
     * @param {Number} width
     */
    function renderDataOnResize(browserWidth = window.innerWidth) {
      const mainTable = mainContainer.find("#users-table");
      const tableBody = mainTable.find("tbody");
      const cardContainer = mainContainer.find("div#card-container");

      if (browserWidth > 868 && tableBody.children("tr").length === 0) {
        _showOverlay(true);

        ApiMachine.request("/users", {
          method: "GET",
          successCallback: function(users) {
            _renderTableOnResize(mainTable, cardContainer, users);
            _showOverlay(false);
            _setupInternalEventListeners();
          }
        });
      } else if (
        browserWidth < 868 &&
        cardContainer.children(".user-card").length === 0
      ) {
        _showOverlay(true);

        ApiMachine.request("/users", {
          method: "GET",
          successCallback: function(users) {
            _renderCardOnResize(mainTable, cardContainer, users);
            _showOverlay(false);
            _setupInternalEventListeners();
          }
        });
      }
    }
    /**
     * @function _renderTableOnResize
     * @private
     * @param {jQuery Object} mainTable
     * @param {jQuery Object} cardContainer
     * @param {Array} users
     */
    function _renderTableOnResize(mainTable, cardContainer, users) {
      cardContainer.empty();
      mainTable.show();
      const tableBody = mainTable.find("tbody");
      tableBody.empty();
      for (let user of users) {
        _appendRowData(tableBody, user);
      }
    }

    /**
     * @function _renderCardOnResize
     * @private
     * @param {jQuery Object} mainTable
     * @param {jQuery Object} cardContainer
     * @param {Array} users
     */
    function _renderCardOnResize(mainTable, cardContainer, users) {
      mainTable
        .hide()
        .find("tbody")
        .empty();
      cardContainer.empty();
      for (let user of users) {
        _appendCardData(cardContainer, user);
      }
    }

    /**
     * HTML5 skeleton to draw a table row
     * @function _tableRowSkeleton
     * @private
     * @param {object} params
     * @return {String} html template
     */
    function _tableRowSkeleton({
      address,
      languages,
      skills,
      _id,
      name,
      username,
      email,
      phone,
      company,
      jobTitle,
      website,
      birthDate,
      experience,
      avatar,
      registeredDate
    }) {
      return `
   <tr scope="row" data-id=${_id}>
     <td class="user-avatar">
           <img class="img-fluid" src=${avatar} alt="${name}" /></td>
           <td class="fullname">
             <p>${name}</p>
           </td>
           <td class="user-email"><a href="mailto:${email}">${email}</a></td>
           <td class="user-city">
           <p> ${address.city}</p>
           </td>
           <td class="user-registered">${new Date(
             registeredDate
           ).toLocaleDateString()}</td>
           <td class="options text-center">
                  <button type="button" class=" my-2 btn btn-outline-success btn-sm detail"
                    data-id=${_id} data-toggle="modal" data-target="#userModal" title="View user">
                       <i class="far fa-eye"></i>
                  </button>
                  <button type="button" class="my-2 btn btn-outline-primary btn-sm edit" data-id=${_id} title="Edit user"><i class="fas fa-user-edit"></i></button>
                  <button type="button" class=" my-2 btn btn-outline-danger btn-sm delete" data-id=${_id} title="Delete user"><i class="far fa-trash-alt"></i></button>
            </td>
         </tr>
         `;
    }

    /**
     * HTML5 skeleton to draw a user card
     * @function _cardSkeleton
     * @private
     * @param {object} params
     * @return {String} html template
     */
    function _cardSkeleton(user) {
      let data = _renderLangsAndSkills(user);
      return `<div class="card user-card mt-3 shadow-lg p-3 mb-5 bg-white rounded" data-id=${
        user._id
      }>
      <div class=" d-flex card-header text-dark header-card shadow-sm  col-sm-12 border  rounded ">
      <div class="col-4"> <img class="img-fluid  mr-2" style="border-radius: 50%" src=${
        user.avatar
      } alt="${user.name}"/></div>
        <div class="font-weight-bold col card-username">
           <p>${user.name}</p>
        </div>
        <div class="d-flex flex-column">
        <span><i class="fas asweome fa-phone-square mr-2"></i><a href="tel:${
          user.phone
        }" target="_blank rel="noopener noreferrer">${user.phone}</a></span>    
        <span><i class="fas asweome fa-at mr-2"></i><a href="mailto:${
          user.email
        }" target="_blank rel="noopener noreferrer">${user.email}</a></span>    
        <span><i class="fas asweome fa-desktop mr-2"></i><a href="${
          user.website
        }" target="_blank rel="noopener noreferrer">${user.website}</a></span>
        </div>
      </div>

    <div class="card-body d-flex justify-content-between">
      <div class="d-flex flex-column">
        <div class="font-weight-bold card-subtitle">Address</div>
        <p class="card-text d-flex flex-column">
        <span><i class="fas asweome fa-envelope-open-text mr-3"></i>${
          user.address.zipcode
        }</span>
        <span><i class="fas asweome asweome-address fa-map-marker-alt mr-3"></i>${
          user.address.street
        }</span>
        <span><i class="fas asweome fa-city mr-3"></i>${
          user.address.city
        }</span>
        <span><i class="fas asweome fa-globe-americas mr-3"></i>${
          user.address.country
        }</span>
        </p>
      </div>

      <div class="d-flex flex-column">
        
        <div class="font-weight-bold card-subtitle">Skills</div>
        <p class="card-text">
          ${data.skills.map(skillTag => skillTag).join("")}
        </p>
        <div class="font-weight-bold card-subtitle">Languages</div>
        <p class="card-text">
        ${data.languages.map(langTag => langTag).join("")}
        </p>
    </div>
    </div>
     <div class="card-footer text-right card-buttons">
        <button type="button" class="btn btn-outline-primary btn-sm edit" data-id=${
          user._id
        }><i class="fas fa-user-edit"></i></button>
        <button type="button" class="btn btn-outline-danger btn-sm delete" data-id=${
          user._id
        }><i class="far fa-trash-alt"></i></button>
     </div>
   </div>
  `;
    }

    /**
     * Get a user object by the properties email or ID
     * @function getUserByID
     * @public
     * @param {string} email || id
     * @return {object} User
     */
    function getUserByID(id, externalCallback) {
      try {
        ApiMachine.request(`/users/${id}`, {
          method: "GET",
          successCallback: function(userFromAPI) {
            externalCallback(userFromAPI);
          }
        });
      } catch (err) {
        return console.error("An error happened: ", err);
      }
    }

    /**
     * Delete user permanently in the JSON data.
     * @function deleteUser
     * @public
     * @param {string} id
     */
    function deleteUser(id) {
      try {
        ApiMachine.request(`/users/${id}`, {
          method: "DELETE",
          successCallback: function(userFromAPI) {
            _removeUserFromDOM(id);
          }
        });
      } catch (err) {
        return console.error("An error happened: ", err);
      }
    }

    /**
     * Delete the user from the DOM after delete it from the JSON.
     * @function _removeUserFromDOM
       @private
     * @param {string} id
     */
    function _removeUserFromDOM(_id) {
      const tableBody = mainContainer.find("#users-table tbody");
      if (tableBody.children("tr").length > 0) {
        tableBody.find(`tr[data-id=${_id}]`).remove();
      } else {
        mainContainer
          .find(`#card-container > .user-card[data-id=${_id}]`)
          .remove();
      }
    }

    function _showOverlay(show) {
      const mainTable = mainContainer.find("#users-table");
      const tableBody = mainTable.find("tbody");
      const cardContainer = mainContainer.find("div#card-container");

      let overlayContainer = tableBody.length > 0 ? tableBody : cardContainer;

      if (show && overlayContainer.find("div.loading").length === 0) {
        overlayContainer
          .css("position", "relative")
          .append(`<div class="loading">Loading&#8230;</div>`);
      } else {
        overlayContainer
          .css("position", "static")
          .find("div.loading")
          .remove();
      }
    }

    /**
     * Render the user data when the modal is opened
     * @function renderDataOnModal
     * @public
     * @param {object} event
     */
    function renderDataOnModal(event) {
      const element = $(event.relatedTarget);
      const modal = $(this);

      ApiMachine.request(`/users/${element.data("id")}`, {
        method: "GET",
        successCallback: function(userFromAPI) {
          const {
            avatar,
            username,
            name,
            birthDate,
            phone,
            address
          } = userFromAPI;
          const modalBody = modal.find(".modal-body");

          modalBody.find("#infoUser span").remove();

          modal.find(".modal-title").text(name + " ~ " + username);
          modalBody.find("img").prop("src", avatar);

          _appendBirthday(modalBody, birthDate);
          _appendPhones(modalBody, { phone });
          _appendAddress(modalBody, address);
          _appendTechSkills(modalBody, userFromAPI);
        }
      });
    }

    function _appendBirthday(container, birthDate) {
      container
        .find(".birthday")
        .append(`<span>${new Date(birthDate).toLocaleDateString()}</span>`);
    }

    function _appendPhones(container, phones) {
      container
        .find(".phones")
        .children("i")
        .each((index, element) => {
          if ($(element).hasClass("fa-mobile-alt")) {
            $(
              `<span><a href="tel:${phones.phone}">${phones.phone}</a></span>`
            ).insertAfter($(element));
          }
        });
    }

    function _appendAddress(container, address) {
      container
        .find(".address")
        .append(
          `<span>${address.street} ~ ${address.city} / ${
            address.country
          }</span>`
        );
    }

    function _appendTechSkills(container, user) {
      let data = _renderLangsAndSkills(user);
      container
        .find(`#skillsInfo.card-body`)
        .empty()
        .append(`${data["skills"].map(skillTag => skillTag).join("")}`);

      container
        .find(`#languagesInfo.card-body`)
        .empty()
        .append(`${data["languages"].map(langTag => langTag).join("")}`);
    }

    return {
      construct,
      initUsers,
      getUserByID,
      renderDataOnResize,
      renderDataOnModal,
      deleteUser
    };
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

const usersTable = Table.getInstance();
