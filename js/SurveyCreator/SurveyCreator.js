const SurveyCreator = (function() {
  let instance;

  function init() {
    let surveyForm;

    const surveyApiData = {
      title: "",
      subtitle: "",
      startDate: "",
      endDate: "",
      description: ""
    };

    function construct(container) {
      $.get("../../html/SurveyCreator.html", function(htmlSkeleton) {
        surveyForm = container.empty().append(htmlSkeleton);
        _setupInternalEventListeners(surveyForm);
      }).fail(function(err) {
        throw new Error(err);
      });

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
          .on("click", _newFieldValue);
      }

      function _setHeaderSurveyData() {
        surveyForm
          .find(".SurveyHeader-Data")
          .find("input, textarea")
          .each((index, element) => {
            const $element = $(element);
            if ($element.prop("type") === "date") {
              const date = new Date($element.val()).getTime();
              surveyApiData[$element.prop("name")] = isNaN(date) ? "" : date;
            } else {
              surveyApiData[$element.prop("name")] = $element.val();
            }
          });
      }

      function _selectActions(event) {
        const button = $(event.currentTarget);
        if (button.hasClass("delete")) {
          if (window.confirm("Are you sure to delete this selector")) {
            button.closest("tr").remove();
          }
        } else {
          const $input = button.parent().siblings("input[type=text]");
          _appendOptionToSelector($input);
        }
      }

      function _appendOptionToSelector(input) {
        const inputValue = input.val().trim();
        const $selector = input
          .closest("td")
          .siblings("td.Selector-Cell")
          .find("select");

        let optionExists = false;
        const $selectOptions = $selector.children("option");

        const lastPosition = $selectOptions.length;

        $selectOptions.each(function(index, option) {
          if (
            $(option)
              .text()
              .toLowerCase() === inputValue.toLowerCase()
          ) {
            optionExists = true;
          }
        });

        if (!optionExists && inputValue.length > 0) {
          input.val("");
          const newOption = $("<option>", {
            value: inputValue.toLowerCase(),
            text: inputValue
          });

          const previewList = input
            .parent()
            .siblings(".preview-group")
            .find(" ul.preview-list");

          previewList
            .append(
              `<li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center py-1 px-1">
                <span data-position=${lastPosition}>${inputValue}</span>
                <div class="btn-group btn-group" role="group">
                  <button class="btn btn-outline-primary editOption" data-value="${inputValue}" title="Edit this option"><i class="far fa-edit"></i></button>
                  <button class="btn btn-outline-danger deleteOption" title="Delete this option" data-value=${inputValue}><i class="far fa-trash-alt"></i></button>
                </div>
               </li>`
            )
            .off("click")
            .on("click", "button", _optionActions);

          $selector
            .hide()
            .append(newOption)
            .fadeIn("slow");
        }
      }

      function _optionActions(event) {
        const button = $(event.currentTarget);
        if (button.hasClass("editOption")) {
          _editOption(button);
        } else {
          _deleteOption(button);
        }
      }

      function _editOption(editButton) {
        const buttonIcon = editButton.find("i");
        const editableField = editButton.parent().siblings("span");
        const $selector = editableField
          .closest("td")
          .siblings("td.Selector-Cell")
          .find("select");

        const optionValue = editButton.data("value");

        if (buttonIcon.hasClass("fa-edit")) {
          buttonIcon.removeClass("far fa-edit").addClass("fas fa-check");

          $selector.val(optionValue);

          editableField
            .prop("contenteditable", true)
            .focus()
            .css({ fontSize: "1.2em", width: "100%" })
            .off("input")
            .on("input", function(e) {
              $selector
                .children(`option[value="${optionValue.toLowerCase()}"]`)
                .text(
                  $(this)
                    .text()
                    .trim()
                );
            });
        } else {
          buttonIcon.removeClass("fas fa-check").addClass("far fa-edit");
          const editableFieldText = editableField.text().trim();

          editableField
            .prop("contenteditable", false)
            .css("font-size", "1em")
            .off("input");

          $selector
            .children(`option[value="${optionValue.toLowerCase()}"]`)
            .prop("value", editableFieldText);

          editButton.data("value", editableFieldText);
        }
      }

      function _deleteOption(deleteButton) {
        if (window.confirm("Are you sure to delete this option?")) {
          const optionValue = deleteButton
            .siblings("button.editOption")
            .data("value")
            .toLowerCase();

          deleteButton
            .closest("td")
            .siblings("td.Selector-Cell")
            .find("select")
            .children(`option[value="${optionValue}"]`)
            .remove();

          deleteButton.closest("li").remove();
        }
      }

      function _newFieldValue(event) {
        const typeSelectorValue = $(event.currentTarget)
          .siblings("select.SelectedType-Select")
          .val();

        const tableBody = $("#survey-element > table").find(
          "tbody.Survey-TableBody"
        );

        switch (typeSelectorValue) {
          case "date":
          case "text":
          case "color":
          case "telephone":
          case "file":
            tableBody
              .append(
                `<tr>
           <td class="ValueType-data">
            <div class="form-group w-100">
              <label class="w-100">
                <p contenteditable="true">You can modify this text</p>
                  <div class="input-group">
                    <input type="${typeSelectorValue}" name="${typeSelectorValue}_input[]" class="form-control" placeholder="Insert default value on this field" />
                    <div class="input-group-append">
                      <button class="btn btn-outline-danger delete" type="button"><i class="far fa-trash-alt"></i></button>
                    </div>
              </label>
             </div>
            </td>
          </tr>`
              )
              .off("click")
              .on("click", "button.delete", _deleteInput);
            break;
          case "select":
            tableBody
              .append(
                `<tr class="ValueType-data">
                <td>
                    <div class="form-group">
                      <div class="input-group">
                        <input class="form-control" type="text" placeholder="New option here..."/>
                        <div class="input-group-append">
                          <button class="btn btn-outline-primary selectActions add" type="button">Add option</button>
                        </div>
                      </div>
                    <div class="container preview-group my-2">
                      <ul class="list-group preview-list my-1 px-1 py-1"></ul>
                    </div>
                  </div>
                  <div class="button-actions text-right">
                     <button class="btn btn-outline-danger btn-block selectActions delete" type="button">
                         Delete
                         <i class="far fa-trash-alt"></i>
                      </button>
                  </div>
                </td>
                </tr>`
              )
              .off("click")
              .on("click", "button.selectActions", _selectActions);
            break;
        }
      }

      function _typeSelect(event) {
        const typeSelector = $(event.currentTarget);
        const addButton = typeSelector.siblings("button.addNewElement");

        addButton.html(`Add new ${typeSelector.val()} on the survey
        <i class="fas fa-plus-square"></i>`);
      }
      function _deleteInput(event) {
        if (window.confirm("Are you sure to delete this input element?")) {
          $(event.currentTarget)
            .closest("tr")
            .remove();
        }
      }

      function _buildJSON(event) {
        event.preventDefault();
        _setHeaderSurveyData();
        console.log(surveyApiData);
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
