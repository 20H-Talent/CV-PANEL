const SurveyCreator = (function() {
  let instance;

  function init() {
    let surveyForm;

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

    /**
     * Render the HTML associate with this object in the central column
     * and setup all the event listeners attached on the elements.
     * @function construct
     * @public
     * @param {jQuery object} container
     */
    function construct(container) {
      $.get("../../html/SurveyCreator.html", function(htmlSkeleton) {
        surveyForm = container.empty().append(htmlSkeleton);
        _setupInternalEventListeners(surveyForm);
      }).fail(function(err) {
        throw new Error(err);
      });

      /**
       * Initialize all the object event listeners
       * @function _setupInternalEventListeners
       * @private
       */
      function _setupInternalEventListeners(form) {
        $surveyContainer = form.find("#survey-element");
        form.off("submit").on("submit", _buildJSON);

        $surveyContainer
          .find(".Survey-TypeSelector")
          .children("select.SelectedType-Select")
          .off("change")
          .on("change", _typeSelect);

        $surveyContainer
          .find(".Survey-TypeSelector > button.addNewElement")
          .off("click")
          .on("click", _newSurveyBlock);

        $surveyContainer
          .find(".Survey-TableBody")
          .on("change", "input[type=checkbox]", _selectedBlocks);

        $surveyContainer
          .find("tfoot button.deleteAll")
          .on("click", _deleteSelectedBlocks);
      }

      /**
       * Remove the parent row from the element passed as parameter
       * @function _removeRow
       * @private
       * @param {jQuery object} element
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
       * Before append a new option in survey element like select, checkbox, radio
       * this function check if the new value already exist.
       * @function _checkIfValueExists
       * @private
       * @param {jQuery object} container
       * @param {string} value
       * @return {boolean} the value exists
       */
      function _checkIfValueExists(container, value) {
        let valueExists = false;

        container.find("li > span").each((index, element) => {
          const $element = $(element);
          const $parentItem = $element.parent();
          if (
            $element
              .text()
              .trim()
              .toLowerCase() === value.toLowerCase()
          ) {
            valueExists = true;
            $element.parent().addClass("invalid-value");
          } else if ($parentItem.hasClass("invalid-value")) {
            $parentItem.removeClass("invalid-value");
          }
        });

        return valueExists;
      }

      /**
       * Append a new option to the parent that triggered this function,
       * The parent can be a selector, checkbox or radio block.
       * @function
       * @private
       * @param {jQuery object} input
       **/
      function _appendOptionToParent(input) {
        const inputValue = input.val().trim();
        const previewList = input
          .parent()
          .siblings(".preview-group")
          .find(" ul.preview-list");

        let valueExists = _checkIfValueExists(previewList, inputValue);

        if (inputValue !== "" && inputValue.length > 0 && !valueExists) {
          previewList;
          previewList
            .append(
              `<li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center py-1 px-1">
                <span class="FieldValue">${inputValue}</span>
                <div class="btn-group btn-group" role="group">
                  <button type="button" class="btn btn-outline-primary editOption" data-value="${inputValue}" title="Edit this option"><i class="far fa-edit"></i></button>
                  <button type="button" class="btn btn-outline-danger deleteOption" title="Delete this option" data-value=${inputValue}><i class="far fa-trash-alt"></i></button>
                </div>
               </li>`
            )
            .off("click")
            .on("click", "button", _childrenActions);
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
       * Modify a existing value for another one
       * @function _editOption
       * @private
       * @param {jQuery object} editButton
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
       * Remove a children element on specific block
       * @function _deleteOption
       * @private
       * @param {jQuery object} deleteButton
       */
      function _deleteOption(deleteButton) {
        if (window.confirm("Are you sure to delete this option?")) {
          deleteButton.closest("li").remove();
        }
      }

      /**
       * Iterate over the survey blocks and define which
       * blocks are checked by the user to change the delete button text and insert
       * the data-blocks attribute with the number of blocks to delete
       * @function _selectedBlocks
       * @private
       * @param {object} event
       */
      function _selectedBlocks(event) {
        const tableBody = event
          ? $(event.currentTarget).closest(".Survey-TableBody")
          : $surveyContainer.find(".Survey-TableBody");

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
          .text(
            selectedBlocks > 0
              ? `Delete ${selectedBlocks} blocks`
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
       * scroll to this new block.
       * @function _newSurveyBlock
       * @private
       * @param {object} event
       */
      function _newSurveyBlock(event) {
        const typeSelectorValue = $(event.currentTarget).data("type");

        const tableBody = $("#survey-element > table").find(
          "tbody.Survey-TableBody"
        );

        switch (typeSelectorValue) {
          case "date":
          case "text":
          case "number":
          case "color":
          case "telephone":
          case "file":
            const inputBlock = $(`<tr style="display:none;" class="ValueType-data" data-type=${typeSelectorValue}>
            <td>
             <div class="form-group w-100">
            <div class="ValueType-header d-flex justify-content-between">
                <p contenteditable="true">You can modify this text</p>
                <div class="form-check align-self-start">
                    <input class="form-check-input" type="checkbox" name="elements_check[]">
                </div>
              </div>
              <div class="input-group">
                <input type="${typeSelectorValue}" name="input_${typeSelectorValue}[]"
                  class="form-control" placeholder="Insert default value" />
                <div class="input-group-append">
                  <button type="button" class="btn btn-outline-danger delete">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>
             </td>
           </tr>`);

            tableBody
              .append(inputBlock)
              .find("button.delete")
              .off("click")
              .on("click", _deleteInput);

            inputBlock.show("slow");

            $(".survey-container").animate(
              { scrollTop: tableBody.prop("scrollHeight") },
              500
            );

            break;
          case "select":
          case "checkbox":
          case "radio":
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
                    <input name="${typeSelectorValue}[]" class="form-control"
                     type="text" placeholder="New ${typeSelectorValue} value..."/>
                    <div class="input-group-append">
                      <button type="button" class="btn btn-outline-primary Actions add">Add option</button>
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
       * Change the params on the add new element button to properly
       * setup the block to add in the next click.
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
       * @param {object} event
       */
      function _deleteInput(event) {
        if (window.confirm("Are you sure to delete this input element?")) {
          $(event.currentTarget)
            .closest("tr")
            .remove();
        }
      }

      /**
       * Append new data in our object that contains the data which
       * will be sent to the API. This function only handle the header data
       * @function _setHeaderSurveyData
       * @private
       */
      function _setHeaderSurveyData() {
        surveyForm
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
       * Append new data in our object that contains the data which
       * will be sent to the API. This function only handle the survey blocks
       * that represents the body data
       * @function _setBodySurveyData
       * @private
       */
      function _setBodySurveyData() {
        const dinamicElements = ["select", "radio", "checkbox"];

        surveyForm
          .find("table tbody")
          .children("tr.ValueType-data")
          .each((index, element) => {
            const $element = $(element);
            const data = {
              type: $element.data("type"),
              title: $element.find(".form-group p").text(),
              values: []
            };
            if (dinamicElements.includes(data["type"])) {
              data["values"] = Array.from(
                $element.find("ul.preview-list > li")
              ).map(value =>
                $(value)
                  .children(".FieldValue")
                  .text()
              );
            } else {
              data["values"].push($element.find("input").val());
            }

            surveyApiData["elements"].push(data);
          });
      }

      /**
       * Show a toast message when an action to the API is triggered
       * @function _activeToastMessage
       * @private
       */
      function _activeToastMessage(error = false) {
        const $toast = $("#toast");
        const $toastIcon = $toast.find("i");

        if (error) {
          $toast
            .removeClass("success")
            .addClass("show error")
            .children("#desc")
            .text("Saved with success!");

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
       * Group all the necessary functions to build the final
       * JSON data and get ready to store on the API.
       * @param {object} event
       */
      function _buildJSON(event) {
        event.preventDefault();
        _setHeaderSurveyData();
        _setBodySurveyData();

        $.ajax({
          url: "http://localhost:3000/api/surveys",
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
          }
        });
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
