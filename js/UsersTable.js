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
    const mainContainer = $("#users-table").parent();
    let apiURL = setupApiURL({
      results: 100,
      nationalities: ["ES"],
      gender: "",
      format: "json"
    });

    _setupSessionStorage(apiURL, initTable);

    /** Prepare sessionStorage that allow us save the data in client side to work with it
     * @function _setupSessionStorage
     * @private
     * @param {function} callback - Callback that triggers when the response is ready
     */
    function _setupSessionStorage(url, callback) {
      if (!sessionStorage.getItem("users-list")) {
        apiRequest(url, callback);
      } else {
        callback(null, window.innerWidth);
      }
    }

    function apiRequest(url, callback) {
      _showOverlay(true);
      $.getJSON(url, function(response) {
        if (!response["error"]) {
          usersWithExtraData = _appendExtraData(response["results"]);
          sessionStorage.setItem(
            "users-list",
            JSON.stringify(usersWithExtraData)
          );
          callback(usersWithExtraData, window.innerWidth);
        }
      }).fail(function(err) {
        _showOverlay(false);
        throw new Error(err);
      });
    }

    /** Display table with the users data when the instance is initialized
     * @function initTable
     * @public
     * @param {array} data - Array of JSON data
     */
    function initTable(data, browserWidth) {
      let users = data || JSON.parse(sessionStorage.getItem("users-list"));

      if (browserWidth > 768) {
        const tableBody = mainContainer.find("#users-table tbody");
        users.forEach(user => _appendRowData(tableBody, user));
        //_showOverlay(false);
      } else {
        mainContainer
          .find("#users-table")
          .hide()
          .find("tbody")
          .empty();
        let cardContainer = mainContainer.find("div#card-container");
        users.forEach(user => _appendCardData(cardContainer, user));
        _showOverlay(false);
      }
    }

    /**
     * Build the api URL to make a new request
     * @function setupApiURL
     * @public
     * @param {object} config
     * @return {string} baseURL
     */
    function setupApiURL(config) {
      const { results, gender, nationalities, format } = config;

      let nationalitiesFormatted = _nationalitiesRequestFormat(nationalities);
      let baseURL = `https://randomuser.me/api/?results=${results}&gender=${
        gender ? gender : ""
      }&nat=${nationalitiesFormatted}&format=${format}`;

      return baseURL;
    }

    function _nationalitiesRequestFormat(nationalities = []) {
      return nationalities.map(nat => nat).join(",");
    }

    function _appendRowData(tableBody, user) {
      tableBody.append(_tableRowSkeleton(user));
    }

    function _appendCardData(cardContainer, user) {
      cardContainer.append(_cardSkeleton(user));
    }

    /**
     * Handle the resize on the browser to render data in a new container
     * @function renderDataOnResize
     * @public
     * @param {Number} width
     */
    function renderDataOnResize(users = null, browserWidth) {
      const mainTable = mainContainer.find("#users-table");
      const tableBody = mainTable.find("tbody");
      const cardContainer = mainContainer.find("div#card-container");

      if (browserWidth > 868 && tableBody.children("tr").length === 0) {
        const usersData =
          users || JSON.parse(sessionStorage.getItem("users-list"));

        mainContainer.find("div#card-container").empty();
        mainTable.show();
        usersData.forEach(user => _appendRowData(tableBody, user));
      } else if (
        browserWidth < 868 &&
        cardContainer.children(".user-card").length === 0
      ) {
        const usersData =
          users || JSON.parse(sessionStorage.getItem("users-list"));

        mainTable
          .hide()
          .find("tbody")
          .empty();
        usersData.forEach(user =>
          _appendCardData(mainContainer.find("div#card-container"), user)
        );
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
      picture,
      id,
      email,
      name,
      location,
      registered
    }) {
      let registeredDate = new Date(registered["date"]);
      let userFullName = buildUserFullname(name);
      return `
   <tr scope="row" data-id=${id.value}>
     <td class="user-avatar">
           <img class="img-fluid" src=${picture.thumbnail} alt=${
        name.first
      } /></td>
           <td class="fullname">
             <p>${userFullName}</p>
           </td>
           <td class="user-email"><a href="mailto:${email}">${email}</a></td>
           <td class="user-city">
           <p> ${location.city}</p>
           </td>
           <td class="user-registered">${registeredDate.toLocaleDateString()}</td>
           <td class="options text-center">
                  <button type="button" class=" my-2 btn btn-outline-success btn-sm"
                    data-id=${
                      id.value
                    } data-toggle="modal" data-target="#userModal" title="View user">
                       <i class="far fa-eye"></i>
                  </button>
                  <button type="button" class="my-2 btn btn-outline-primary btn-sm edit" data-id=${
                    id.value
                  } title="Edit user"><i class="fas fa-user-edit"></i></button>
                  <button type="button" class=" my-2 btn btn-outline-danger btn-sm delete" data-id=${
                    id.value
                  } title="Delete user"><i class="far fa-trash-alt"></i></button>
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
    function _cardSkeleton({
      name,
      picture,
      email,
      id,
      login,
      skills,
      frameworks,
      languages
    }) {
      let userFullName = buildUserFullname(name);

      return `<div class="card user-card" data-id=${id.value}>
      <div class="card-header d-flex flex-row align-items-center">
         <img class="img-fluid mr-2" src=${picture.medium} alt="test"/>
        <div class="card-username">
           <p>${userFullName}</p>
           <p>${login.username}</p>
        </div>
      </div>
     <div class="card-body">
     <div class="card-subtitle">Skills</div>
     <p class="card-text">
     ${skills
       .map(skill => `<span class="badge badge-secondary mr-1">${skill}</span>`)
       .join("")}
   </p>
   <div class="card-subtitle">Languages</div>
       <p class="card-text">
       ${languages
         .map(
           language =>
             `<span class="badge badge-secondary mr-1">${language}</span>`
         )
         .join("")}
       </p>
       <div class="card-subtitle">Frameworks</div>
         ${frameworks
           .map(
             framework =>
               `<span class="badge badge-secondary mr-1">${framework}</span>`
           )
           .join("")}
     </div>
     <div class="card-footer card-buttons text-right">
        <button type="button" class="btn btn-outline-success btn-sm" data-email=${email} data-toggle="modal" data-target="#userModal"><i class="far fa-eye"></i></button>
        <button type="button" class="btn btn-outline-primary btn-sm" data-id=${
          id.value
        }><i class="fas fa-user-edit"></i></button>
        <button type="button" class="btn btn-outline-danger btn-sm delete" data-id=${
          id.value
        }><i class="far fa-trash-alt"></i></button>
     </div>
   </div>
  `;
    }

    /**
     * Append extra data into the JSON.
     * @function _appendExtraData
     * @private
     * @param {object} usersData
     * @return {object} userWithExtraDAta
     */
    function _appendExtraData(usersData) {
      const skills = [
        "html5",
        "css3",
        "javascript",
        "php",
        "ruby",
        "perl",
        "java",
        "C++",
        "go",
        "sass",
        "python"
      ];

      const languages = [
        "Afrikan",
        "English",
        "Spanish",
        "Romanian",
        "French",
        "German",
        "Italian",
        "Turkish"
      ];

      const frameworks = [
        "django",
        "ruby on rails",
        "react",
        "angular",
        "vue",
        "laravel"
      ];

      usersWithExtraData = usersData.map(user => {
        user["skills"] = _generateExtraData(skills);
        user["languages"] = _generateExtraData(languages);
        user["frameworks"] = _generateExtraData(frameworks);

        return user;
      });

      return usersWithExtraData;
    }

    /**
     * Join the firstname and the last name to build user fullname capitalized
     * @function buildUserFullName
     * @public
     * @param {string} name
     * @return {string} fullName
     */
    function buildUserFullname(name) {
      const { first, last } = name;
      const fullName =
        first.charAt(0).toUpperCase() +
        first.slice(1) +
        " " +
        last.charAt(0).toUpperCase() +
        last.slice(1);

      return fullName;
    }

    /**
     * Get a user object by the properties email or ID
     * @function getUserByEmailOrID
     * @public
     * @param {string} email || id
     * @return {object} User
     */
    function getUserByEmailOrID(value) {
      if (value.includes("@")) {
        return JSON.parse(sessionStorage.getItem("users-list")).find(
          user => user.email === value
        );
      } else {
        return JSON.parse(sessionStorage.getItem("users-list")).find(
          user => user.id.value === value
        );
      }
    }

    /**
     * Generate random content inside an array to assign it later.
     * @function _generateExtraData
     * @private
     * @param {Array} data
     * @return {Array} - array of random data content
     */
    function _generateExtraData(data) {
      const numberOfItems = Math.floor(Math.random() * data.length);
      const extraData = [];
      for (let index = 0; index <= numberOfItems; index++) {
        extraData.push(data[Math.floor(Math.random() * data.length)]);
      }
      return Array.from(new Set(extraData));
    }

    /**
     * Delete user permanently in the JSON data.
     * @function deleteUser
     * @public
     * @param {string} id
     */
    function deleteUser(id) {
      let users = JSON.parse(sessionStorage.getItem("users-list"));
      users = users.filter(user => user.id.value !== id);
      sessionStorage.setItem("users-list", JSON.stringify(users));
      _removeUserFromDOM(id);
    }

    /**
     * Delete the user from the DOM after delete it from the JSON.
     * @function _removeUserFromDOM
       @private
     * @param {string} id
     */
    function _removeUserFromDOM(id) {
      const tableBody = mainContainer.find("#users-table tbody");
      if (tableBody.children("tr").length > 0) {
        tableBody.find(`tr[data-id=${id}]`).remove();
      } else {
        mainContainer
          .find(`#card-container > .user-card[data-id=${id}]`)
          .remove();
      }
    }

    /**
     * Receive new parameters to make a new request to the API
     * @function changeApiParams
     * @public
     * @param {jQuery objects} selects
     */
    function changeApiParams(selects) {
      const paramsObject = { format: "json", nationalities: [] };
      for (select of selects) {
        const $select = $(select);
        if ($select.prop("name") === "nationalities[]") {
          paramsObject["nationalities"] = $select.val();
        }
        paramsObject[$select.prop("name")] = $select.val();
      }
      delete paramsObject["nationalities[]"];
      sessionStorage.removeItem("users-list");

      const apiURL = setupApiURL(paramsObject);
      apiRequest(apiURL, renderDataOnResize);
    }

    /** Render again the table with specific conditions
     * @function renderTable
     * @public
     * @param {Object} filters - Conditions to render again the table with filtered data
     * @param {Array} data
     */
    function renderTable(inputsData = [], data = null) {
      let users = data || JSON.parse(sessionStorage.getItem("users-list"));
      _showOverlay(true);
      const filters = _buildFilters(inputsData);
      const tableBody = mainContainer.find("#users-tabletbody");

      if (filters["gender"]) {
        users = users.filter(
          user => user["gender"] === filters["gender"].toLowerCase()
        );
      }
      if (filters["firstname"] || filters["lastname"]) {
        users = users.filter(user => {
          return (
            user["name"]["first"]
              .toLowerCase()
              .includes(filters["firstname"]) ||
            user["name"]["last"].toLowerCase().includes(filters["lastname"])
          );
        });
      }
    }

    function _showOverlay(show) {
      const mainTable = mainContainer.find("#users-table");
      const tableBody = mainTable.find("tbody");
      const cardContainer = mainContainer.find("div#card-container");

      let overlayContainer = tableBody.length > 0 ? tableBody : cardContainer;

      if (show) {
        overlayContainer.append(`<div class="loading">Loading&#8230;</div>`);
      } else {
        overlayContainer.find("div.loading").remove();
      }
    }

    return {
      setupApiURL,
      buildUserFullname,
      getUserByEmailOrID,
      renderDataOnResize,
      changeApiParams,
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
activateSelect2();

function activateSelect2(container) {
  container = container || document;
  const selects = $(container)
    .find("select.select2:not(.select2-loaded)")
    .each(function() {
      $(this)
        .addClass("select2-loaded")
        .select2({
          selectOnClose: true
        });
    });
}

$("nav.search-navbar").on("change", "select", function(e) {
  const selectsContainer = $(this).closest("nav");
  usersTable.changeApiParams(selectsContainer.find("select"));
});

$(window).on("resize", function(e) {
  const width = this.innerWidth;
  usersTable.renderDataOnResize(null, width);
});

$("div.main-container").on("click", "button.edit", editForm);

$("div.main-container").on("click", "button.delete", function(e) {
  if (window.confirm("Are you sure to delete this user?")) {
    const userID = $(this).data("id");
    usersTable.deleteUser(userID);
  }
});

$("#userModal").on("show.bs.modal", function(event) {
  const element = $(event.relatedTarget);
  const modal = $(this);
  const user = usersTable.getUserByEmailOrID(element.data("id"));

  const { picture, name, login, dob, phone, cell, location } = user;
  const fullName = usersTable.buildUserFullname(name);

  const modalBody = modal.find(".modal-body");

  modalBody.find("#infoUser span").remove();

  modal.find(".modal-title").text(fullName + " ~ " + login.username);
  modalBody.find("img").prop("src", picture["large"]);

  appendBirthday(modalBody, dob.date);
  appendPhones(modalBody, { phone, cell });
  appendAddress(modalBody, location);
  appendTechSkills(modalBody, user);
});

function appendBirthday(container, date) {
  container
    .find(".birthday")
    .append(`<span>${new Date(date).toLocaleDateString()}</span>`);
}

function appendPhones(container, phones) {
  container
    .find(".phones")
    .children("i")
    .each((index, element) => {
      if ($(element).hasClass("fa-phone")) {
        $(`<span>${phones.phone}</span>`).insertAfter($(element));
      }
      if ($(element).hasClass("fa-mobile-alt")) {
        $(`<span>${phones.cell}</span>`).insertAfter($(element));
      }
    });
}

function appendAddress(container, location) {
  container
    .find(".address")
    .append(
      `<span>${location.state} ~ ${location.city} ${location.postcode} / ${
        location.street
      }</span>`
    );
}

function appendTechSkills(container, user) {
  ["skills", "languages", "frameworks"].map(key => {
    const userData = user[key];
    container
      .find(`#${key}Info > .card-body`)
      .empty()
      .append(
        userData.map(
          value =>
            `<img class="mx-1 mt-2" src="../assets/images/${key}/${value}.png" alt="${value}" width="48" height="48" title="${value}" />`
        )
      );
  });
}

//Submit event for the form that handle the advanced search
$("form#advanced-search").on("submit", function(e) {
  e.preventDefault();
  //Build the filters object to render the table with the new results
  const formInputs = $(this).find("input");
  usersTable.renderTable(formInputs);
});
