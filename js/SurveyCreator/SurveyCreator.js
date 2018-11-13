const SurveyCreator = (function() {
  let instance;

  function init() {
    let surveyContainer;

    const surveyApiData = {
      header: {
        title: "",
        subtitle: "",
        startDate: "",
        endDate: "",
        description: ""
      },
      elements: []
    };

    const AlphaNumericREGEXP = /^[\w\¿\?\!\¡ ]+$/i;

    /**
     * Render the HTML associate with this object in the central column
     * and setup all the event listeners attached on the elements.
     * @function construct
     * @public
     * @param {jQuery object} container - The central container which represents the central column
     */
    function construct(container) {
      $.get("../../html/SurveyCreator.html", function(htmlSkeleton) {
        surveyContainer = container.empty().append(htmlSkeleton);
        _setupInternalEventListeners(surveyContainer);
      }).fail(function(err) {
        throw new Error(err);
      });

      /**
       * Initialize all the object event listeners
       * @function _setupInternalEventListeners
       * @private
       * @param {jquery Object} form - HTML element that represents the survey form
       */
      function _setupInternalEventListeners(form) {
        $surveyTableContainer = form.find("#survey-table");
        const $tableBody = $surveyTableContainer.find("tbody");
        const $tableFooter = $surveyTableContainer.find("tfoot");

        form.off("submit").on("submit", _sendJSONData);

        form
          .find(".SurveyHeader-Data")
          .on("change", "input[type='date']", _validateSurveyDates);

        $surveyTableContainer
          .find(".Survey-TypeSelector")
          .children("select.SelectedType-Select")
          .off("change")
          .on("change", _typeSelect);

        $surveyTableContainer
          .find(".Survey-TypeSelector > button.addNewElement")
          .off("click")
          .on("click", _newSurveyBlock);

        $tableBody.on("change", "input[type=checkbox]", _selectedBlocks);

        $tableBody.on(
          "keyup",
          "input[type=text], p[contenteditable]",
          _validateTextInput
        );

        $tableFooter
          .find("button.deleteAll")
          .on("click", _deleteSelectedBlocks);

        $tableFooter.find("button.previewSurvey").on("click", _previewSurvey);
      }

      /**
       * Remove the parent row from the element passed as parameter
       * @function _removeRow
       * @private
       * @param {jQuery object} element - HTML element to remove from the DOM
       */
      function _removeRow(element) {
        if (window.confirm("Are you sure to delete this selector")) {
          element.closest("tr").remove();
        }
      }

      /**
       * This function choose the actions depends on the button that
       * fire the event
       * @function _optionButtonsEvent
       * @private
       * @param {object} event
       */
      function _parentActions(event) {
        const button = $(event.currentTarget);
        if (button.hasClass("delete")) {
          _removeRow(button);
        } else {
          const $input = button.parent().siblings("input[type=text]");
          _appendOptionToParent($input);
        }
      }

      /**
       * Before append a new option in survey element like select, checkbox, radio...
       * This function check if the new value already exist.
       * @function _checkIfValueExists
       * @private
       * @param {jQuery object} container - Container where to check if the value exists inside
       * @param {string} value - New value to append in string format
       * @return {boolean} valueIsCorrect - Return a boolean that represents if the value is correct
       */
      function _validateValueToAppend(container, value) {
        let valueIsCorrect = true;

        container.find("li > span").each((index, element) => {
          const $element = $(element);
          const $parentItem = $element.parent();
          const valueToCheck = $element
            .text()
            .trim()
            .toLowerCase();

          if (valueToCheck === value.toLowerCase()) {
            valueIsCorrect = false;
            $parentItem.addClass("invalid-value");
          } else if ($parentItem.hasClass("invalid-value")) {
            $parentItem.removeClass("invalid-value");
          }
        });

        return valueIsCorrect;
      }

      /**
       * Append a new option to the parent that triggered this function,
       * and setup the proper event listeners
       * The parent can be a selector, checkbox or radio block.
       * @function
       * @private
       * @param {jQuery object} input - HTML input that manage the new values
       **/
      function _appendOptionToParent(input) {
        const inputValue = input.val().trim();
        const previewList = input
          .parent()
          .siblings(".preview-group")
          .find(" ul.preview-list");

        let valueIsCorrect = _validateValueToAppend(previewList, inputValue);

        if (
          !input.hasClass("invalid-value") &&
          inputValue !== "" &&
          inputValue.length > 0 &&
          valueIsCorrect
        ) {
          previewList
            .append(
              `<li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center py-1 px-1">
                <span data-name="${inputValue}" class="FieldValue">${inputValue}</span>
                <div class="btn-group btn-group" role="group">
                  <button type="button" class="btn btn-outline-primary editOption" data-value="${inputValue}" title="Edit this option"><i class="far fa-edit"></i></button>
                  <button type="button" class="btn btn-outline-danger deleteOption" title="Delete this option" data-value=${inputValue}><i class="far fa-trash-alt"></i></button>
                </div>
               </li>`
            )
            .off("click")
            .on("click", "button", _childrenActions);

          input.val("");
        }
      }

      /**
       * Choose the properly behavior on the children elements based on the
       * button that fire this function
       * @function _childrenActions
       * @private
       * @param {object} event
       */
      function _childrenActions(event) {
        const button = $(event.currentTarget);
        if (button.hasClass("editOption")) {
          _editOption(button);
        } else {
          _deleteOption(button);
        }
      }

      /**
       * Modify a existing value for another one in the survey blocks
       * @function _editOption
       * @private
       * @param {jQuery object} editButton - Button that fires the editOption event
       */
      function _editOption(editButton) {
        const buttonIcon = editButton.find("i");
        const editableField = editButton.parent().siblings("span");

        if (buttonIcon.hasClass("fa-edit")) {
          buttonIcon.removeClass("far fa-edit").addClass("fas fa-check");

          editableField
            .prop("contenteditable", true)
            .focus()
            .css({ fontSize: "1.2em", width: "100%" });
        } else {
          buttonIcon.removeClass("fas fa-check").addClass("far fa-edit");
          const editableFieldText = editableField.text().trim();
          editableField.prop("contenteditable", false).css("font-size", "1em");
          editButton.data("value", editableFieldText);
        }
      }

      /**
       * Remove a children element on specific survey block
       * @function _deleteOption
       * @private
       * @param {jQuery object} deleteButton - Button that fires the deleteOption event
       */
      function _deleteOption(deleteButton) {
        if (window.confirm("Are you sure to delete this option?")) {
          deleteButton.closest("li").remove();
        }
      }

      /**
       * Iterate over the survey blocks and define which
       * blocks are checked by the user to change the delete button text and insert
       * the data-blocks attribute that defines the number of survey blocks to delete
       * @function _selectedBlocks
       * @private
       * @param {object} event
       */
      function _selectedBlocks(event) {
        const tableBody = event
          ? $(event.currentTarget).closest(".Survey-TableBody")
          : $surveyTableContainer.find(".Survey-TableBody");

        const deleteButton = tableBody.parent().find("tfoot button.deleteAll");

        let selectedBlocks = 0;
        tableBody.find(".ValueType-data").each((index, block) => {
          if (
            $(block)
              .find(".ValueType-header input[type=checkbox]")
              .prop("checked")
          ) {
            selectedBlocks++;
          }
        });

        deleteButton
          .prop("disabled", false)
          .html(
            selectedBlocks > 0
              ? `<i class="far fa-trash-alt"></i> Delete ${selectedBlocks} blocks`
              : "No blocks selected"
          )
          .data("blocks", selectedBlocks);
      }

      /**
       * Do the delete action on the blocks that have the checkbox checked
       * @function _deleteSelectedBlocks
       * @private
       * @param {object} event
       */
      function _deleteSelectedBlocks(event) {
        const selectedBlocks = $(event.currentTarget).data("blocks");
        if (
          selectedBlocks > 0 &&
          window.confirm(`Are you sure to delete ${selectedBlocks} blocks?`)
        ) {
          const tableBody = $(event.currentTarget)
            .closest("tfoot")
            .siblings(".Survey-TableBody");

          const activeCheckboxes = tableBody.find(
            "tr.ValueType-data input[type=checkbox]:checked"
          );

          activeCheckboxes.each((index, checkbox) => {
            $(checkbox)
              .closest("tr.ValueType-data")
              .remove();
          });
          _selectedBlocks(null);
        }
      }

      /**
       * Append a new survey block that define an HTML element like
       * selectors, text fields, dates, checkboxes, etc. Includes an
       * scroll to this new block when this is appended.
       * @function _newSurveyBlock
       * @private
       * @param {object} event
       */
      function _newSurveyBlock(event) {
        const typeSelectorValue = $(event.currentTarget).data("type");

        const tableBody = $("#survey-table > table").find(
          "tbody.Survey-TableBody"
        );

        switch (typeSelectorValue) {
          case "select":
          case "checkbox":
          case "radio":
            let buttonText =
              typeSelectorValue === "select" ? "option" : typeSelectorValue;
            let numberOfThisTypeElements =
              parseInt(
                tableBody.find(
                  `.ValueType-data[data-type="${typeSelectorValue}"]`
                ).length
              ) + 1;

            let fieldName =
              typeSelectorValue + "_field" + numberOfThisTypeElements;

            if (typeSelectorValue === "checkbox") {
              fieldName += "[]";
            }

            const dinamicBlock = $(`<tr style="display:none;" class="ValueType-data" data-type=${typeSelectorValue}>
            <td>
                <div class="form-group">
                 <div class="ValueType-header d-flex justify-content-between">
                    <p contenteditable="true">You can modify this text</p>
                    <div class="form-check align-self-start">
                        <input class="form-check-input" type="checkbox" name="elements_check[]">
                    </div>
                  </div>
                  <div class="input-group">
                    <input name="${fieldName}" class="form-control"
                        type="text" placeholder="New ${typeSelectorValue} value..."/>
                    <div class="input-group-append">
                      <button type="button" class="btn btn-outline-primary Actions add">Add ${buttonText}</button>
                    </div>
                  </div>
                <div class="container preview-group my-2">
                  <ul class="list-group preview-list my-1 px-1 py-1"></ul>
                </div>
              </div>
              <div class="button-actions text-right">
                 <button type="button" class="btn btn-outline-danger btn-block Actions delete" type="button">
                     Delete
                     <i class="far fa-trash-alt"></i>
                  </button>
              </div>
            </td>
            </tr>`);

            tableBody
              .append(dinamicBlock)
              .find("button.Actions")
              .off("click")
              .on("click", _parentActions);

            dinamicBlock.show("slow");

            $(".survey-container").animate(
              { scrollTop: tableBody.prop("scrollHeight") },
              500
            );
            break;
        }
      }

      /**
       * Change the params on the "add new element" button to properly
       * setup the block what will be added in the next click.
       * @function _typeSelect
       * @private
       * @param {object} event
       */
      function _typeSelect(event) {
        const typeSelector = $(event.currentTarget);
        const addButton = typeSelector.siblings("button.addNewElement");

        addButton
          .html(
            `Add new ${typeSelector.val()} on the survey
        <i class="fas fa-plus-square"></i>`
          )
          .data("type", typeSelector.val());
      }

      /**
       * Delete an specific input element from the survey blocks
       * @function _deleteInput
       * @private
       * @param {object} event - The input to delete
       */
      function _deleteInput(event) {
        if (window.confirm("Are you sure to delete this input element?")) {
          $(event.currentTarget)
            .closest("tr")
            .remove();
        }
      }

      /**
       * Update our surveyApiData object that contains the data which
       * will be sent to the API. This function only handle the data
       * contained in the header of the Survey Form.
       * @function _setHeaderSurveyData
       * @private
       */
      function _setHeaderSurveyData() {
        surveyContainer
          .find(".SurveyHeader-Data")
          .find("input, textarea")
          .each((index, element) => {
            const $element = $(element);
            if ($element.prop("type") === "date") {
              const date = new Date($element.val()).getTime();
              surveyApiData["header"][$element.prop("name")] = isNaN(date)
                ? ""
                : date;
            } else {
              surveyApiData["header"][$element.prop("name")] = $element.val();
            }
          });
      }

      /**
       * Update our surveyApiData object that contains the data which
       * will be sent to the API. This function only handle the survey blocks
       * that represents the body data.
       * @function _setBodySurveyData
       * @private
       */
      function _setBodySurveyData() {
        surveyApiData["elements"] = [];

        surveyContainer
          .find("table tbody")
          .children("tr.ValueType-data")
          .each((index, element) => {
            const $element = $(element);

            const data = {
              type: $element.data("type"),
              label: $element.find(".form-group p").text(),
              name: $element.find("input.form-control").prop("name"),
              values: []
            };

            data["values"] = _surveyElementsToJSON(
              Array.from($element.find("ul.preview-list > li"))
            );

            surveyApiData["elements"].push(data);
          });
      }

      function _surveyElementsToJSON(elements) {
        return elements.map(listElement => {
          const field = $(listElement).children(".FieldValue");

          return {
            value: field.text(),
            name: field.data("name"),
            label: field.text()
          };
        });
      }

      /**
       * Show a toast message when an action to the API is triggered
       * @function _activeToastMessage
       * @private
       * @param {String}  [error=false] - Error response from the API
       */
      function _activeToastMessage(error = false) {
        const $toast = $("#toast");
        const $toastIcon = $toast.find("i");

        if (error) {
          $toast
            .removeClass("success")
            .addClass("show error")
            .children("#desc")
            .text(error);

          $toastIcon.removeClass("fa-check").addClass("fa-exclamation");
        } else {
          $toast
            .removeClass("error")
            .addClass("show success")
            .children("#desc")
            .text("Saved with success!");
          $toastIcon.removeClass("fa-exclamation").addClass(" fa-check-square");
        }
        setTimeout(() => {
          $toast.removeClass("show");
        }, 5000);
      }

      /**
       * Build an HTML code from the survey blocks and use an iframe
       * to visualize the final result in the browser
       * @function _previewSurvey
       * @private
       * @param {object} event
       */
      function _previewSurvey(event) {
        _setHeaderSurveyData();
        _setBodySurveyData();

        const { header, elements } = surveyApiData;

        const iframeContent = surveyContainer
          .find(".SurveyPreview > iframe")
          .contents()
          .find("body");

        let finalHTML = `
         <div class="container my-2">
           <div class="row">
             <div class="col-sm-12 d-flex flex-column justify-content-center
              align-items-center align-content-center">
                  <header class="text-center my-2">
                     <h1>${header["title"]}</h1>
                     <h3>${header["subtitle"]}</h3>
                     <p class="text-justify">${header["description"]}</p>
                  </header>
                  <main>
                    <form>
                      ${_buildChildrenElements(elements)}
                    </form>
                  </main>
              </div>
           </div>
         </div>`;
        iframeContent.empty().html(finalHTML);
      }

      /**
       * Convert all the survey blocks into HTML elements that represents
       * form inputs
       * @function _buildChildrenElements
       * @private
       * @param {Array} Elements data that represents an HTML template
       * @return {Array} HTML templates already formatted
       */
      function _buildChildrenElements(elements) {
        return elements
          .map(element => {
            let encodedInputName = encodeURIComponent(element["title"]);
            if (element["type"] === "checkbox") {
              encodedInputName += "[]";
            }

            switch (element["type"]) {
              case "select":
                return `
                <div class="form-group my-1">
                   <h5>${element["title"]}</h5>
                    <select class="form-control" name="${encodedInputName}">
                    ${element["values"].map(value => {
                      return `<option>${value}</option>`;
                    })}
                    </select>
              </div>`;
                break;

              case "checkbox":
              case "radio":
                return `
              <h5>${element["title"]}</h5>
                ${element["values"]
                  .map(value => {
                    return `
                  <div class="form-check my-1">
                    <label>
                      <input class="form-check-input" type="${
                        element["type"]
                      }" value=${value.trim()} name="${encodedInputName}"/>
                      ${value.trim()}
                    </label>
                    </div>`;
                  })
                  .join("")}`;
                break;

              case "date":
                return `
                  <h5>${element["title"]}</h5>
                  <input class="form-control" type="${
                    element["type"]
                  }" value="${element["values"][0]}"/>
                `;
                break;
            }
          })
          .join("");
      }

      /**
       * Validate the date fields in thee form header container.
       * @function _validateSurveyData
       * @private
       * @param {object} event
       * @return {Number} errors - Number of errors
       */
      function _validateSurveyDates(event = null) {
        let errors = 0;
        const startDate = $(".SurveyHeader-Data input[name=startDate]");
        const endDate = $(".SurveyHeader-Data input[name=endDate]");

        const startDateTimestamp = new Date(startDate.val()).getTime();
        const endDateTimestamp = new Date(endDate.val()).getTime();

        if (startDateTimestamp > endDateTimestamp) {
          startDate
            .addClass("border-red")
            .parent()
            .siblings("span.form-error")
            .text("The start date cannot be after the final date");
          errors++;
        } else {
          startDate
            .removeClass("border-red")
            .parent()
            .siblings("span.form-error")
            .text("");
        }

        return errors;
      }

      /**
       * Validate if the text is correctly formatted
       * @function _validateTextInput
       * @private
       * @param {jQuery object} textInput - HTML input to get the value
       */
      function _validateTextInput(textInput) {
        const $textInput = $(event.target);
        const inputValue = $textInput.is("input")
          ? $textInput.val().trim()
          : $textInput.text();

        const targetContainer = $textInput
          .closest(".ValueType-data")
          .find("ul.preview-list");

        if (!AlphaNumericREGEXP.test(inputValue)) {
          $textInput.addClass("invalid-value");

          if (targetContainer.find("span.form-error").length === 0) {
            targetContainer.prepend(
              '<span class="form-error">The text contains special characters not allowed</span>'
            );
          }
        } else {
          $textInput.removeClass("invalid-value");
          targetContainer.find("span.form-error").remove();
        }
      }

      /**
       * Validate if the text from the headers is correctly formatted
       * @function _validateTextInput
       * @private
       * @param {jQuery object} textInput
       * @return {Number} errors - Number of errors
       */
      function _validateHeaderTextInputs() {
        let errors = 0;
        $(".SurveyHeader-Data")
          .find("input[type=text]")
          .each((index, element) => {
            const textInput = $(element);
            if (
              textInput.val().trim() === "" ||
              !AlphaNumericREGEXP.test(textInput.val().trim())
            ) {
              textInput
                .addClass("border-red")
                .siblings("span.form-error")
                .text(
                  "This text can only have characters, numbers and underscores"
                );
              errors++;
            } else {
              textInput
                .removeClass("border-red")
                .siblings("span.form-error")
                .text("");
            }
          });
        return errors;
      }

      /**
       * Group all the necessary functions to build the final
       * JSON data (surveyApiData object) and get ready to make the store request on the API.
       * @param {object} event
       */
      function _sendJSONData(event) {
        event.preventDefault();
        const submitButton = $(event.target).find("button[type=submit]");
        let errors = _validateSurveyDates() + _validateHeaderTextInputs();

        if (errors === 0) {
          _setHeaderSurveyData();
          _setBodySurveyData();
          submitButton
            .css({ position: "relative", height: "60px" })
            .html(
              `<div style="position:absolute;" class="loading white">Loading&#8230;</div>`
            );

          $.ajax({
            url: "https://cv-mobile-api.herokuapp.com/api/surveys",
            type: "POST",
            crossDomain: true,
            contentType: "application/json",
            dataType: "json",
            cache: true,
            data: JSON.stringify(surveyApiData),
            success: function(response) {
              _activeToastMessage();
            },
            error: function(jqXHR, textStatus) {
              _activeToastMessage(jqXHR.statusText);
            },
            complete: function(jqXHR, textStatus) {
              submitButton
                .css({ position: "static", height: "auto" })
                .html(`Create Survey`);
            }
          });
        } else {
          $(".survey-container").animate({ scrollTop: 0 }, "slow");
        }
      }
    }
    return {
      construct
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

const surveyCreator = SurveyCreator.getInstance();
