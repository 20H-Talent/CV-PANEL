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
    const table = $(".table-responsive > table#users-table");
    const tableBody = table.find("tbody");
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
          sessionStorage.setItem(
            "users-list",
            JSON.stringify(usersData["results"])
          );
          callback(usersData["results"]);
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
    function renderTable(filters = {}, data = null) {
      let users = data || JSON.parse(sessionStorage.getItem("users-list"));
      _showOverlay();

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
      tableBody.css("position", "relative").empty()
        .html(`<div class="table-overlay">
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
        phone,
        cell,
        login,
        registered
      } = user;

      let registeredDate = new Date(registered["date"]);

      tableBody.append(`
        <tr scope="row" data-id="${id.value}">
            <td class="user-avatar" data-user=${email} data-toggle="modal" data-target="#userModal">
            <img src=${picture.medium} alt=${
        name.first
      } data-user=${email} /></td>
            <td class="username">
               <p>${name.first} ${name.last}</p>
               <p><i class="fas fa-address-card"></i> <em>${
                 login.username
               }</em></p>

            </td>
            <td class="user-age">${dob.age}</td>
            <td class="user-email"><a href="mailto:${email}">${email}</a></td>
            <td class="user-phone">
              <a href="tel:${phone}"><i class="fas fa-phone"></i> ${phone}</a>
              <a href="tel:${cell}"><i class="fas fa-mobile-alt"></i> ${cell}</a>
            </td>
            <td class="user-city">
            <p><i class="fas fa-city"></i> ${location.city} ~ ${
        location.postcode
      }</p>
            <p><i class="fas fa-map-marked"></i> ${location.street}</p>
            </td>
            <td class="user-registered">${registeredDate.toLocaleDateString()} ~ ${registeredDate.toLocaleTimeString()}</td>
         </tr>`);
    }

    /**
     * Get a user object by the email.
     * @function getUserByEmail
     * @public
     * @param {string} email
     * @return {object} User
     */
    function getUserByEmail(email) {
      return JSON.parse(sessionStorage.getItem("users-list")).find(
        user => user.email === email
      );
    }

    /**
     * Filter the inputs when the advanced search is used,
     * only inputs that aren't empty or checked are allowed
     * @function filterInputs
     * @public
     * @param {Array of jQuery objects} elements
     * @return {object} filters
     */
    function filterInputs(elements) {
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

    return {
      initTable,
      renderTable,
      getUserByEmail,
      buildUserFullname,
      filterInputs
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

$("form#advanced-search").on("submit", function(e) {
  e.preventDefault();
  const filters = usersTable.filterInputs(
    $(this).find("div.collapse.show input")
  );
  usersTable.renderTable(filters);
});

$("#userModal").on("show.bs.modal", function(e) {
  const element = $(event.target);
  const modal = $(this);
  const user = usersTable.getUserByEmail(element.data("user"));

  const { picture, name, login } = user;

  const fullName = usersTable.buildUserFullname(name);

  modal.find(".modal-title").text(fullName + " ~ " + login.username);
  modal.find(".modal-body img").prop("src", picture["large"]);
});
