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
<<<<<<< HEAD
    const getUsersURL = `${window.location.origin}/CV-PANEL/data/users.json`;
=======
    const getUsersURL = `https://rawgit.com/20H-Talent/CV-Panel/develop/data/users.json`;
>>>>>>> develop

    _setupLocalStorage(initTable);

    /** Prepare localStorage that allow us save the data in client side to work with it
     * @function _setupLocalStorage
     * @private
     * @param {function} callback - Callback that triggers when the localStorage is ready
     */
    function _setupLocalStorage(callback) {
      console.log(callback);
      if (!localStorage.getItem("users-list")) {
        $.getJSON(getUsersURL, function(usersData) {
          localStorage.setItem("users-list", JSON.stringify(usersData));
          return callback(usersData);
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
      const { id, name, username, email, phone } = user;
      tableBody.append(`
        <tr scope="row" data-id="${id}">
          <td>${id}</td>
          <td>${name}</td>
          <td>${username}</td>
          <td><a href="mailto:${email}">${email}</a></td>
          <td>${phone}</td>
         </tr>`);
    }

    return {
      initTable,
      renderTable
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
