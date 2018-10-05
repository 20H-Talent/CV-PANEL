/**
 * This class represents the table that manage users in the application
 * It's built based on the Singleton pattern
 * IMPORTANT: Functions where the name  starts with _ are private
 * Source: https://addyosmani.com/resources/essentialjsdesignpatterns/book/
 *
 * Return the UsersTable instance initialized  and ready to be used as single access point.
 * @return {function} getInstance
 */
const UsersTable = (function() {
  let instance;

  /**
   * Initialize the UsersTable with the data in .json format
   * @function init
   */
  function init() {
    //DOM active elements
    const mainContainer = $("#data-column");

    //RESOURCE ENDPOINT
    const getUsersURL = `https://randomuser.me/api/?results=100&nat=ES`;

    _setupLocalStorage(initTable);

    /** Prepare localStorage that allow us save the data in client side to work with it
     * @function _setupLocalStorage
     * @private
     * @param {function} callback - Callback that triggers when the localStorage is ready
     */
    function _setupLocalStorage(callback) {
      if (!sessionStorage.getItem("users-list")) {
        $.getJSON(getUsersURL, function(usersData) {
          usersWithExtraData = _appendExtraData(usersData["results"]);

          sessionStorage.setItem(
            "users-list",
            JSON.stringify(usersWithExtraData)
          );

          callback(usersWithExtraData);
        }).fail(function(err) {
          throw new Error(err);
        });
      } else {
        callback();
      }
    }

    /** Display table with the users data when the instance is initialized
     * @function initTable
     * @public
     * @param {array} data - Array of JSON data
     */
    function initTable(usersData) {
      let users = usersData || JSON.parse(sessionStorage.getItem("users-list"));
      users.forEach(user => _appendBodyData(user));
    }

    /** Render again the table with specific conditions
     * @function renderTable
     * @public
     * @param {Object} filters - Conditions to render again the table with filtered data
     * @param {Array} data
     */
    function renderTable(inputsData = [], data = null) {
      let users = data || JSON.parse(sessionStorage.getItem("users-list"));
      _showOverlay();
      const filters = _buildFilters(inputsData);
      const tableBody = mainContainer.find("#users-table  tbody");

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

      setTimeout(() => {
        if (users.length > 0) {
          tableBody.css("position", "static").empty();
          users.map(user => _appendBodyData(user));
        } else {
          tableBody.find("div.table-overlay").empty()
            .html(`<div class="alert alert-warning" role="alert">
             No results found
          </div>`);
        }
      }, 1000);
    }

    /** Show the overlay when a change is produced on the table
     * @function _showOverlay
     * @private
     */
    function _showOverlay() {
      const container =
        window.innerWidth > 768
          ? $("#users-table > table").find("tbody")
          : mainContainer;

      container.empty().html(`<div class="table-overlay">
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>`);
    }

    /**
     * Append a new row in the table body that display each user
     * @function _appendBodyData
     * @private
     * @param {Object} user - User properties
     */
    function _appendBodyData(user) {
      const {
        picture,
        id,
        email,
        name,
        location,
        dob,
        login,
        registered,
        skills,
        languages,
        frameworks
      } = user;

      let registeredDate = new Date(registered["date"]);
      let userFullName = buildUserFullname(name);
      const tableBody = mainContainer.find("#users-table  tbody");

      tableBody.append(`
      <tr scope="row" data-id=${id.value}>
        <td class="user-avatar" data-email=${email} data-toggle="modal" data-target="#userModal">
              <img data-email=${email} class="img-fluid" src=${
        picture.thumbnail
      } alt=${name.first} /></td>
              <td class="username">
                <p>${name.first} ${name.last}</p>
              </td>
              <td class="user-age">${dob.age}</td>
              <td class="user-email"><a href="mailto:${email}">${email}</a></td>
              <td class="user-city">
              <p><i class="fas fa-city"></i> ${location.city}</p>
              </td>
              <td class="user-registered">${registeredDate.toLocaleDateString()}</td>
            </tr>
            `);

      mainContainer.append(
        `<div class="card user-card">
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
            .map(
              skill =>
                `<span class="badge badge-secondary mr-1">${skill}</span>`
            )
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
          <button class="btn btn-dark" data-email=${email} data-toggle="modal" data-target="#userModal">
              <i class="far fa-eye"></i>
          </button>
          <button class="btn btn-dark card-edit-button" data-email=${email}>
              <i class="far fa-edit"></i>
        </button>
      </div>
        </div>
       `
      );
    }

    /**
     * Get a user object by the email.
     * @function getUserByEmail
     * @public
     * @param {string} email
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
     * Get a user object by the email.
     * @function getUserByEmail
     * @public
     * @param {string} email
     * @return {object} User
     */
    function getUserById(id) {}
    /**
     * Filter the inputs when the advanced search is used,
     * only inputs that aren't empty or checked are allowed
     * @function buildFilters
     * @public
     * @param {Array of jQuery objects} elements
     * @return {object} filters
     */
    function _buildFilters(elements) {
      const filters = {};
      elements
        .filter((index, input) => {
          const $input = $(input);
          if (
            $input.prop("type") === "radio" ||
            $input.prop("type") === "checkbox"
          ) {
            return $input.prop("checked");
          } else {
            return $.trim($input.val()).length > 0;
          }
        })
        .each((index, input) => {
          const $input = $(input);
          filters[$input.prop("name")] = $input.val();
        });
      return filters;
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
        let skillsGenerated = _generateExtraData(skills);
        let languagesGenerated = _generateExtraData(languages);
        let frameworksGenerated = _generateExtraData(frameworks);

        user["skills"] = Array.from(skillsGenerated);
        user["languages"] = Array.from(languagesGenerated);
        user["frameworks"] = Array.from(frameworksGenerated);

        return user;
      });

      return usersWithExtraData;
    }

    function _generateExtraData(data) {
      const numberOfItems = Math.floor(Math.random() * data.length);
      const extraData = [];
      for (let index = 0; index <= numberOfItems; index++) {
        extraData.push(data[Math.floor(Math.random() * data.length)]);
      }
      return new Set(extraData);
    }

    return {
      initTable,
      renderTable,
      getUserByEmailOrID,
      buildUserFullname
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

const usersTable = UsersTable.getInstance();

//Submit event for the form that handle the advanced search
$("form#advanced-search").on("submit", function(e) {
  e.preventDefault();
  //Build the filters object to render the table with the new results
  const formInputs = $(this).find("div.collapse.show input");
  usersTable.renderTable(formInputs);
});

//This events triggers the editForm function
$("#data-column > #users-table")
  .find("tbody")
  .on("click", "tr", editForm);

$("#data-column")
  .find(".user-card")
  .on("click", "button.card-edit-button", editForm);

$("#userModal").on("show.bs.modal", function(event) {
  const element = $(event.relatedTarget);
  const modal = $(this);
  const user = usersTable.getUserByEmailOrID(
    element.data("email")
      ? element.data("email")
      : $(event.currentTarget).data("email")
  );

  const { picture, name, login } = user;
  const fullName = usersTable.buildUserFullname(name);

  modal.find(".modal-title").text(fullName + " ~ " + login.username);
  modal.find(".modal-body img").prop("src", picture["large"]);

  //Add info to the modal window. Shows the main information (FUll name, age, email) of the selected user.

  modal.find("#infoUserModal-1").text("Full Name: " + fullName);
  modal.find("#infoUserModal-2").text("Age: " + user.dob.age);
  modal.find("#infoUserModal-3").text("Email: " + user.email);
  modal.find("#infoUserModal-4").text("Phone: " + user.phone);
  modal.find("#infoUserModal-5").text("Post Code: " + user.location.postcode);
  modal.find("#infoUserModal-6").text("State: " + user.location.state);
  modal.find("#infoUserModal-7").text("City: " + user.location.city);
  modal.find("#infoUserModal-8").text("Street: " + user.location.street);
  modal.find("#infoUserModal-9").text("Skills: " + user.skills);
  modal.find("#infoUserModal-10").text("Languages: " + user.languages);
});
