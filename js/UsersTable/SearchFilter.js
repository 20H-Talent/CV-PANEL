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
    const filtersBadgets = _buildFiltersForBadgets(inputsData);
    _createSearchBadges(filtersBadgets);
    let filteredUsers = users; //recoge la lista de usuarios (todos los usuarios de la tabla) para filtrar.

    //FullName
    if (filters["name"]) {
      const firstnameQuery = filters["name"].toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user["name"].toLowerCase().includes(firstnameQuery)
      );
    }
    //Gender
    if (filters["genre_male"]) {
      filteredUsers = filteredUsers.filter(
        user => user["genre_male"] === filters["genre_male"]
      );
    }
    if (filters["genre_female"]) {
      filteredUsers = filteredUsers.filter(
        user => user["genre_female"] === filters["genre_female"]
      );
    }

    // Age (ya no está en la API, ahora es una fecha de cumpleaños, hay que calcularla).
    // if(filters["age"]){
    //   const ageQuery = filters["age"];
    //   filteredUsers = filteredUsers.filter(
    //     user =>
    //       user["age"].includes(firstnameQuery)
    //   );
    // }

    //Experience

    if (filters["experience"]) {
      const experienceQuery = filters["experience"];
      filteredUsers = filteredUsers.filter(user =>
        user["experience"].includes(experienceQuery)
      );
    }
    // Languages (idiomas)
    if (filters["languages"]) {
      const skillsQuery = filters["languages"];
      filteredUsers = filteredUsers.filter(user =>
        user["languages"].includes(skillsQuery)
      );
    }

    // skills are Frameworks, Languages.
    if (filters["skills"]) {
      const skillsQuery = filters["skills"];
      filteredUsers = filteredUsers.filter(user =>
        user["skills"].includes(skillsQuery)
      );
    }

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
    const filters = {};
    const filtered = elements
      .filter((index, input) => {
        const $input = $(input);
        if (
          $input.prop("type") === "radio" ||
          $input.prop("type") === "checkbox"
        ) {
          return $input.prop("checked");
        } else {
          return $.trim($input.val()).length > 0; // elimina los espacios en blanco.
        }
      })
      .each((index, input) => {
        const $input = $(input);
        filters[$input.prop("name")] = $input.val(); //establece la (propiedad : valor), lo hace utilizando el (name : id).
      });
      console.log("filtered: ",filtered);
      console.log("filters:: ",filters);
    return filters;
  }

  function _buildFiltersForBadgets(elements) {
    const filters = [];
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
        filters.push(input);
      });
    return filters;
  }
  /**
   * Create badge-pills to show the user input search values
   * @function _createSearchBadges
   * @private
   * @param {Object} filters
   */
  function _createSearchBadges(filters) {
    const filtersContainer = mainContainer.find(".filters");
    const badgesContainer = filtersContainer.children(".search-badges");
    filtersContainer.find("button").remove();
    _appendFilterBadges(filters, badgesContainer);
    _createResetButton(filtersContainer, badgesContainer);
  }

  function _createResetButton(filtersContainer, badgesContainer) {
    const resetButton = filtersContainer.append(
      `<button id="reset-btn" class="btn btn-sm btn-info">Cancel search</button>`
    );
    $("#reset-btn")
      .off("click")
      .on("click", function(e) {
        badgesContainer.empty();
        $(this).remove();
        usersTable.initTable(null, window.innerWidth);
      });
  }

  function _appendFilterBadges(filters, badgesContainer) {
    badgesContainer.empty();
    filters.forEach(function(element) {
      let badge = "";
      if ($(element).attr("fieldName") != undefined) {
        badge = $(
          `<span class="badge badge-pill badge-secondary filter mr-2" idFieldName="${$(element).attr("id")}" fieldValue="${$(element).val()}"> 
          ${$(element).attr("fieldName")} : <span>${$(element).attr("valueName")}</span>
          <button class="bg-transparent border-0 deletion"><i class="far text-light ml-2 fa-times-circle"></i></button>
          </span>`
        ).hide();
      } else {
        badge = $(
          `<span class="badge badge-pill badge-secondary filter mr-2" idFieldName="${$(element).attr("id")}" fieldValue="${$(element).val()}"> 
          ${$(element).attr("name")} : <span>${$(element).val()}</span>
          <button class="bg-transparent border-0 deletion"><i class="far text-light ml-2 fa-times-circle"></i></button>
          </span>`
        ).hide();
      }

      badgesContainer.append(badge);
      badge.show("slow");
      badge.on("click", _deleteBagde);
    });
  }

  function _deleteBagde(badge) {
    var idFieldName = $(this).attr("idFieldName");
    var typeField = $("#" + idFieldName).attr("type");
    // var fieldValue = $(this).attr("fieldValue");

    switch (typeField) {
      case "text":
        $("#" + idFieldName).val("");
        break;

      case "checkbox":
        $("#" + idFieldName).prop("checked", false);
        break;

      case "radio":
        $("#" + idFieldName).prop("checked", false);
        break;

      case "range":
        $("#" + idFieldName).val("");

        if ($("#age-range").val("") != "") {
          document.getElementById("age").innerHTML = "";
        }
        if ($("#exp-years").val("") != "") {
          document.getElementById("range").innerHTML = "";
        }
        break;
    }

    $(this).remove();

    $("#submit_search").trigger("click");
    //usersTable.initTable(null, window.innerWidth);
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
