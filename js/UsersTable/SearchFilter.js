const SearchFilter = (function() {
  const mainContainer = $(".main-container");
  /**
   * Filter the users array based on specific object that define the conditions
   * @function filterUsers
   * @public
   * @param {Object} filters
   * @param {Array} users
   * @return {Array} filteredUsers
   */
  function filterUsers(inputsData, users) {
    const filters = _buildFilters(inputsData);
    _createSearchBadges(filters, users);
    let filteredUsers = _buildFilteredUsersArray(filters, users);

    return filteredUsers;
  }

  /**
   * Filter the inputs when the advanced search is used,
   * only inputs that aren't empty or checked are allowed
   * @function buildFilters
   * @public
   * @param {Array of jQuery objects} elements
   * @return {object} filters
   */
  function _buildFilters(elements) {
    const filters = { languages: [], skills: [] };
    const filtered = elements
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
        if ($(input).data("type")) {
          filters[$(input).data("type")].push($input.val());
        } else {
          filters[$input.prop("name")] = $input.val();
        }
      });
    if (filters["languages"].length === 0) {
      delete filters["languages"];
    }

    if (filters["skills"].length === 0) {
      delete filters["skills"];
    }
    return filters;
  }

  /**
   * Return the users already filtered by filters object
   * @function buildFilteredUsersArray
   * @private
   * @param {Array of objects} elements
   * @return {Array} filteredUsers
   */
  function _buildFilteredUsersArray(filters, users) {
    //Gender
    let filteredUsers = users;
    if (filters["gender"]) {
      filteredUsers = filteredUsers.filter(
        user => user["gender"] === filters["gender"]
      );
    }

    //FullName
    if (filters["name"]) {
      const firstnameQuery = filters["name"].toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user["name"].toLowerCase().includes(firstnameQuery)
      );
    }

    //Age
    if (filters["age"]) {
      filteredUsers = filteredUsers.filter(
        user =>
          new Date(user["birthDate"]).getFullYear() <=
          new Date().getFullYear() - parseInt(filters["age"])
      );
    }

    //Experience

    if (filters["experience"]) {
      console.log("filters experience: ", filters["experience"]);
      const experienceQuery = filters["experience"];
      filteredUsers = filteredUsers.filter(user =>
        user["experience"].includes(experienceQuery)
      );
    }

    // Languages (idiomas)
    if (filters["languages"] && filters["languages"].length > 0) {
      const languagesSelected = filters["languages"];
      filteredUsers = filteredUsers.filter(user => {
        let languagesChecked = true;
        for (let language of user["languages"]) {
          if (!languagesSelected.includes(language)) {
            languagesChecked = false;
            break;
          }
        }
        return languagesChecked;
      });
    }

    // skills are Frameworks, Languages.
    if (filters["skills"] && filters["skills"].length > 0) {
      const skillsSelected = filters["skills"];
      filteredUsers = filteredUsers.filter(user => {
        let skillsChecked = true;
        for (let skill of user["skills"]) {
          if (!skillsSelected.includes(skill)) {
            skillsChecked = false;
            break;
          }
        }
        return skillsChecked;
      });
    }
    return filteredUsers;
  }

  /**
   * Create badge-pills to show the user input search values
   * @function _createSearchBadges
   * @private
   * @param {Object} filters
   */
  function _createSearchBadges(filters, users) {
    const filtersContainer = mainContainer.find(".filters");
    const badgesContainer = filtersContainer.children(".search-badges");
    badgesContainer.empty();
    filtersContainer.find("button#reset-btn").remove();

    _appendFilterBadges(filters, badgesContainer);
    _createResetButton(filtersContainer, badgesContainer, users);
  }

  function _createResetButton(filtersContainer, badgesContainer, users) {
    const resetButton = filtersContainer.append(
      `<button id="reset-btn" class="btn btn-sm btn-info">Cancel search</button>`
    );
    $("#reset-btn")
      .off("click")
      .on("click", function(e) {
        badgesContainer.empty();
        $(this).remove();
        usersTable.initUsers(users);
      });
  }

  function _appendFilterBadges(filters, badgesContainer) {
    badgesContainer.empty();

    const specialFilters = ["skills", "languages"];

    for (let key in filters) {
      let badge = "";
      let valueInsideBadge = `${key.charAt(0).toUpperCase() + key.slice(1)}: `;

      if (!specialFilters.includes(key)) {
        valueInsideBadge += filters[key];
      } else {
        const sourceData = JSON.parse(sessionStorage.getItem(key));
        valueInsideBadge += filters[key]
          .map(value => sourceData[value].label)
          .join(",");
      }
      badge = $(
        `<span data-name=${key} data-values=${
          filters[key]
        } class="badge badge-pill badge-secondary filter mr-2">${valueInsideBadge}
             <button class="bg-transparent border-0 badge-delete"><i class="far text-light ml-2 fa-times-circle"></i></button>
          </span>`
      ).hide();

      badgesContainer.append(badge);
      badge.show("slow");
      badge.on("click", _deleteBadge);
    }
  }

  function _deleteBadge() {
    const badge = $(this);
    const dataName = badge.data("name");
    const form = $("form#advanced-search");

    switch (dataName) {
      case "name":
      case "age":
        form.find(`input[name=${dataName}]`).val("");
        break;
      case "experience":
        form.find(`select[name=${dataName}]`).val("");
        break;
      case "gender":
        form.find(`input[name=${dataName}]`).prop("checked", false);
        break;
      case "languages":
      case "skills":
        form
          .find(`div#${dataName} input[type=checkbox]`)
          .each((index, input) => {
            $(input).prop("checked", false);
          });
        break;
    }

    $(this).remove();

    const filtersContainer = mainContainer.find(".filters");
    const badgesContainer = filtersContainer.children(".search-badges");
    if (badgesContainer.find("span").length === 0) {
      $("#reset-btn").trigger("click");
    } else {
      form.trigger("submit");
    }
  }

  return {
    filterUsers
  };
})();

/**
 * Calculate Age.
 */

// function dataBirthdateToAge(date) {
//   var today = new Date();
//   var borned = new Date(date);
//   var age = today.getFullYear() - borned.getFullYear();
//   var month = today.getMonth() - borned.getMonth();
//   if (month < 0 || (month === 0 && today.getDate() < borned.getDate())) {
//     age --;
//   }
//   return age;
// }
