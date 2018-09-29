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
      if (!localStorage.getItem("users-list")) {
        $.getJSON(getUsersURL, function(usersData) {
          localStorage.setItem(
            "users-list",
            JSON.stringify(usersData["results"])
          );
          return callback(usersData["results"]);
        }).fail(function(err) {
          throw new Error(err);
        });
      }
      return callback();
    }

    /** Render again the table with specific conditions
     * @function renderTable
     * @public
     * @param {Object} filters - Conditions to render again the table with filtered data
     * @param {Array} data
     */
    function renderTable(filters = {}, data = null) {
      let users = data || JSON.parse(localStorage.getItem("users-list"));
      if (Object.keys(filters).length > 0) {
        tableBody.empty();
        let usersFiltered = users
          .filter(user => {
            //TODO - THIS CONDITION IS FOR TESTING PURPOSES
            return user["name"].toLowerCase().includes("er");
          })
          .map(user => _appendBodyData(user));
      }
    }

    /** Display table with the users data when the instance is initialized
     * @function initTable
     * @public
     * @param {array} data - Array of JSON data
     */
    function initTable(usersData) {
      let users = usersData || JSON.parse(localStorage.getItem("users-list"));
      users.forEach(user => _appendBodyData(user));
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

    function getUserByEmail(email) {
      return JSON.parse(localStorage.getItem("users-list")).find(
        user => user.email === email
      );
    }

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

$("#userModal").on("show.bs.modal", function(e) {
  const element = $(event.target);
  const modal = $(this);
  const user = usersTable.getUserByEmail(element.data("user"));

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

  const fullName = usersTable.buildUserFullname(name);

  modal.find(".modal-title").text(fullName + " ~ " + login.username);
  modal.find(".modal-body img").prop("src", picture["large"]);
});
