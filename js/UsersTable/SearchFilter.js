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
    let filteredUsers = users;

    //Gender
    if (filters["gender"]) {
      filteredUsers = filteredUsers.filter(
        user => user["gender"] === filters["gender"].toLowerCase()
      );
    }

    //New filters field's added
    //Full Name
    if (filters["name"] ) {
      const firstnameQuery = filters["name"].toLowerCase();

      filteredUsers = filteredUsers.filter(
        user =>
          user["name"].toLowerCase().includes(firstnameQuery) 
      );
    } 
    //Age (ya no está en la API, ahora es una fecha de cumpleaños, hay que calcularla).
    //Experience 
    //languages (idiomas)

    //framework
    console.log("filters:",filters);
    if (filters["skills"] ) {
      const skillsQuery = filters["skills"];
      console.log("skills",skillsQuery);
      filteredUsers = filteredUsers.filter(
        user =>
          user["skills"].includes(skillsQuery) 
      );
    } 

    //languages(software)




    // //Skills
    // if (filters["skills"]) {
    //     console.log("skills", filters);
    //     filteredUsers = filteredUsers.filter(
    //       user => user["skills"] === filters["skills"].toLowerCase()
    //     );
    // console.log("filteredUsers", filteredUsers);
    // }

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
          return $.trim($input.val()).length > 0;
        }
      })
      .each((index, input) => {
        const $input = $(input);
        filters[$input.prop("name")] = $input.val();
      });
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
// console.log("filters:", filters);
    filters.forEach(function(element) {
      let badge = "";
        if( $(element).attr("fieldName") != undefined ){
           badge = $(
            `<span class="badge badge-pill badge-secondary filter mr-2">${$(element).attr("fieldName")}: <span>${
              $(element).attr("valueName")
            }</span><button class="bg-transparent border-0 deletion"><i class="far text-light ml-2 fa-times-circle"></i></button></span>`
          ).hide();
          }else{
             badge = $(
              `<span class="badge badge-pill badge-secondary filter mr-2" idFieldName="${$(element).attr("id")}" fieldValue="${$(element).val()}" >${$(element).attr("name")}: <span>${
                $(element).val()
              }</span><button class="bg-transparent border-0 deletion"><i class="far text-light ml-2 fa-times-circle"></i></button></span>`
            ).hide();
          }

          badgesContainer.append(badge);
          badge.show("slow");
          badge.on("click", _deleteBagde);
    });
  }

  function _deleteBagde() {
    var idFieldName = $(this).attr('idFieldName');
    var fieldValue = $(this).attr('fieldValue');
    var typeField = $('#'+idFieldName).attr( 'type' );

    switch( typeField ){
      case 'text':
        $('#'+idFieldName).val('');
      break;s  
    }
    

    $(this).remove();

    $("#submit_search").trigger("click");
    //usersTable.initTable(null, window.innerWidth);
  }

  return {
    filterUsers
  };
})();
