const UsersTable = (function() {
  let instance;

  function init() {
    getUserData(initTable);

    function getUserData(callback) {
      const usersDataURL = `${window.location.origin}/data/users.json`;
      if (!localStorage.getItem("users-list")) {
        $.getJSON(usersDataURL, function(usersData) {
          localStorage.setItem("users-list", JSON.stringify(usersData));
          callback();
        }).fail(function(err) {
          console.log(err);
        });
      } else {
        callback();
      }
    }

    function initTable() {
      const usersData = JSON.parse(localStorage.getItem("users-list"));
      const tableBody = $("table#users-table").find("tbody");
      usersData.forEach(user => {
        const { id, name, username, email, phone } = user;
        tableBody.append(`
          <tr scope="row">
            <td>${id}</td>
            <td>${name}</td>
            <td>${username}</td>
            <td>${email}</td>
            <td>${phone}</td>
           </tr>`);
      });
    }

    return {
      initTable
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
