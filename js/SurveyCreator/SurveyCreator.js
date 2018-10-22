const SurveyCreator = (function() {
  let instance;

  function init() {
    let surveyForm;
    function construct(container) {
      if (container.find("form#survey-form").length === 0) {
        $.get("../../html/SurveyCreator.html", function(htmlSkeleton) {
          surveyForm = container.empty().append(htmlSkeleton);
          _setupInternalEventListeners(surveyForm);
        }).fail(function(err) {
          throw new Error(err);
        });
      }

      function _setupInternalEventListeners(form) {
        $surveyContainer = form.find("#survey-element");

        form.off("submit").on("submit", _buildJSON);

        $surveyContainer
          .find(".SelectedType-Cell")
          .children(".SelectedType-Select")
          .off("click")
          .on("click", _typeSelect);

        $surveyContainer
          .find(".FieldValues")
          .off("click")
          .on("click", " i.fa-plus-square", function(event) {
            _newFieldValue(event, form);
          });
      }

      function _appendOption(event) {
        const $input = $(event.currentTarget)
          .parent()
          .siblings("input[type=text]");

        const inputValue = $input.val().trim();
        const $selector = $input
          .closest("div.col-md-7")
          .siblings("div.border-right")
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
          $input.val("");
          const newOption = $("<option>", {
            value: inputValue.toLowerCase(),
            text: inputValue
          });

          $input
            .parent()
            .siblings(".preview-group")
            .find(" ul.preview-list")
            .append(
              `<li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center py-1 px-1">
                  <span data-position=${lastPosition}>${inputValue}</span>
                  <div class="btn-group btn-group" role="group">
                    <button class="btn btn-outline-primary editOption" data-value="${inputValue}" title="Edit this option"><i class="far fa-edit"></i></button>
                    <button class="btn btn-outline-danger deleteOption" title="Delete this option" data-value=${inputValue}><i class="far fa-trash-alt"></i></button>
                  </div>
              </li>`
            );
          $selector
            .hide()
            .append(newOption)
            .fadeIn("slow");

          const previewList = $("form#survey-form").find(
            ".ValueType-Cell ul.preview-list"
          );

          previewList
            .off("click")
            .on("click", "button.deleteOption", _deleteOption);

          previewList.on("click", "button.editOption", _editOption);
        }
      }

      function _editOption(event) {
        const editButton = $(event.currentTarget);
        const buttonIcon = editButton.find("i");
        const editableField = editButton.parent().siblings("span");
        const $selector = editableField
          .closest(".preview-group")
          .parent()
          .siblings(".border-right")
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

      function _deleteOption(event) {
        if (window.confirm("Are you sure to delete this option?")) {
          const deleteButton = $(event.currentTarget);
          const optionValue = deleteButton.data("value").toLowerCase();

          deleteButton
            .closest(".preview-group")
            .parent()
            .siblings(".border-right")
            .find("select")
            .children(`option[value="${optionValue}"]`)
            .remove();

          deleteButton.closest("li").remove();
        }
      }

      function _newFieldValue(event, container) {
        const valueTypeCell = container.find(".ValueType-Cell");
        valueTypeCell
          .find("div.ValueType-data")
          .clone()
          .appendTo(valueTypeCell);
      }

      function _typeSelect(event) {
        const $select = $(event.target);
        const $typesCell = $select.parent().siblings("td.ValueType-Cell");
        const $typesCellHead = $select
          .closest("table")
          .find("thead th.FieldValues");

        if ($typesCellHead.find("i.fa-plus-square").length === 0) {
          $typesCellHead.append(
            `<i class="far fa-plus-square" title="New value inside this field"></i>`
          );
        }

        switch ($select.val()) {
          case "text":
            $typesCell.empty().append(`
            <div class="form-group ValueType-data">
              <label>
                <p contenteditable="true">Modify this text</p>
                 <input type="text" name="text_input[]" class="form-control" placeholder="Insert default value on this field" />
              </label>
            </div>`);
            break;
          case "select":
            $typesCell
              .empty()
              .append(
                `
             <div class="form-group ValueType-data">
               <div class="form-row d-flex">
                 <div class="col-md-5 border-right">
                  <label>
                    <p contenteditable="true">Title of your selector</p>
                    <select class="form-control" name="select_input[]"></select>
                  </label>
                </div>
                <div class="col-md-7 align-self-start">
                  <div class="input-group">
                    <input class="form-control" type="text" placeholder="New option here..."/>
                    <div class="input-group-append">
                      <button class="btn btn-outline-primary AppendOption" type="button">Add option</button>
                      <button class="btn btn-outline-danger" type="button">Delete</button>
                    </div>
                  </div>
                  <div class="container preview-group my-2">
                    <ul class="list-group preview-list my-1 px-1 py-1"></ul>
                  </div>
                </div>
               </div>
             </div>`
              )
              .off("click")
              .on("click", "button.AppendOption", _appendOption);
            break;
          case "telephone":
            $typesCell.empty().append(`
            <div class="form-group ValueType-data">
                <label>
                <p contenteditable="true">Modify this text</p>
                <input type="tel" name="phone_input[]" class="form-control" placeholder="Insert default value on this field" />
                </label>
            </div>`);
            break;
        }
      }

      function _buildJSON(event) {
        event.preventDefault();
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
