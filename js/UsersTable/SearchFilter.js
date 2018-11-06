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
        _createSearchBadges(filters);
        let filteredUsers = users;

        if (filters["gender"]) {
            filteredUsers = filteredUsers.filter(
                user => user["gender"] === filters["gender"].toLowerCase()
            );
        }

        if (filters["firstname"] && filters["lastname"]) {
            const firstnameQuery = filters["firstname"].toLowerCase();
            const lastnameQuery = filters["lastname"].toLowerCase();

            filteredUsers = filteredUsers.filter(
                user =>
                user["name"]["first"].toLowerCase().includes(firstnameQuery) &&
                user["name"]["last"].toLowerCase().includes(lastnameQuery)
            );
        } else if (!filters["firstname"] && filters["lastname"]) {
            const lastnameQuery = filters["lastname"].toLowerCase();
            filteredUsers = filteredUsers.filter(user =>
                user["name"]["last"].toLowerCase().includes(lastnameQuery)
            );
        } else if (filters["firstname"] && !filters["lastname"]) {
            const firstnameQuery = filters["firstname"].toLowerCase();
            filteredUsers = filteredUsers.filter(user =>
                user["name"]["first"].toLowerCase().includes(firstnameQuery)
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
                    return $.trim($input.val()).length > 0;
                }
            })
            // .each((index, input) => {
            //     const $input = $(input);
            //     filters.push({ 
            //         value: $input.val(),
            //         name: $input.prop("name"),
            //         id: $input.prop("id")
            //     });
            // });
            .each((index, input) => {
                const $input = $(input);
                filters[$input.prop("name")] = { 
                            value: $input.val(),
                            id: $input.prop("id")
                        };
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
    $("#reset-btn").off("click").on("click", function(e) {
      badgesContainer.empty();
      $(this).remove();
      usersTable.initTable(null, window.innerWidth);
    });
  }

    function _appendFilterBadges(filters, badgesContainer) {
        badgesContainer.empty();

        for (key in filters) {
            const keyCapitalized = key.charAt(0).toUpperCase() + key.slice(1);
            console.log("FILTERS KEY: ", key, filters[key]);
            const badge = $(
                `<span data-name="${key}" class="badge badge-pill badge-secondary filter mr-2">${key}: <span>${
          filters[key].value
        }</span><button class="bg-transparent border-0 deletion"><i class="far text-light ml-2 fa-times-circle"></i></button></span>`
      ).hide();
      badgesContainer.append(badge);
      badge.show("slow");  

      badge.on("click",_deleteBagde); 
      
    }
    
  }

  function _deleteBagde(){
    $(this).remove();
    usersTable.initTable(null, window.innerWidth);
  }

    return {
        filterUsers
    };
})();