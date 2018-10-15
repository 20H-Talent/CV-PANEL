function UserForm(formBuildData) {
  this.formBuildData = formBuildData;
  this.formElement = $(`<form></form>`).hide();

  this.createForm = function() {
    const container = $(this.formBuildData["container"]) || $(document.body);
    if (container.find("form").length === 0) {
      let form = _setupFormTag(
        this.formElement,
        this.formBuildData["attributes"]
      );

      _createElementsDinamically(form, this.formBuildData["htmlElements"]);

      form.hide();
      container.prepend(form);
      form.show("slow");
    }
  };

  this.removeForm = function() {
    this.formElement.remove();
  };

  function _setupFormTag(formElement, attributes) {
    let $formElement =
      formElement instanceof jQuery ? formElement : $(formElement);
    for (key in attributes) {
      $formElement.prop(key, attributes[key]);
    }

    return $formElement;
  }

  function _createElementsDinamically(parent, htmlElements) {
    for (htmlElement of htmlElements) {
      const htmlTag = $(`<${htmlElement["tag"]}></${htmlElement["tag"]}>`);

      Object.keys(htmlElement).forEach(key => {
        if (key !== "childrens" && key !== "text_element" && key !== "tag") {
          htmlTag.prop(key, htmlElement[key]);
        }
        if (key === "childrens" && htmlElement[key].constructor === Array) {
          _createElementsDinamically(htmlTag, htmlElement[key]);
        } else if (
          key === "childrens" &&
          htmlElement[key].constructor !== Array
        ) {
          _getChildrensByRequest(
            htmlTag,
            htmlElement[key],
            _createElementsDinamically
          );
        }
        if (key === "text_element") {
          htmlTag.text(htmlElement[key]);
        }
      });
      parent.append(htmlTag);
    }
    return parent;
  }

  function _getChildrensByRequest(htmlTag, url, callback) {
    $.getJSON(url, function(response) {
      if (!response["error"]) {
        callback(htmlTag, response);
      }
    }).fail(function(err) {
      throw new Error(err);
    });
  }
}

const form = new UserForm({
  container: "div.main-container",
  attributes: {
    method: "POST",
    class: "",
    id: "advanced-search",
    action: ""
  },
  htmlElements: [
    {
      tag: "div",
      class: "form-group row has-success",
      childrens: [
        {
          tag: "label",
          for: "firstname",
          class: "col-sm-2 col-form-label"
        },
        {
          tag: "div",
          class: "col-sm-10",
          childrens: [
            {
              tag: "div",
              class: "input-group-prepend",
              childrens: [
                {
                  tag: "span",
                  class: "input-group-text",
                  id: "inputGroup-sizing",
                  childrens: [
                    {
                      tag: "i",
                      class: "fas awesome fa-user-tie"
                    }
                  ]
                },
                {
                  tag: "input",
                  name: "firstname",
                  class: "form-control",
                  placeholder: "insert your name here",
                  type: "text"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      tag: "div",
      class: "form-group row has-success",
      childrens: [
        {
          tag: "label",
          for: "firstname",
          class: "col-sm-2 col-form-label"
        },
        {
          tag: "div",
          class: "col-sm-10",
          childrens: [
            {
              tag: "div",
              class: "input-group-prepend",
              childrens: [
                {
                  tag: "span",
                  class: "input-group-text",
                  id: "inputGroup-sizing",
                  childrens: [
                    {
                      tag: "i",
                      class: "fas awesome fa-user-tie"
                    }
                  ]
                },
                {
                  tag: "input",
                  name: "firstname",
                  class: "form-control",
                  placeholder: "insert your name here",
                  type: "text"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      tag: "div",
      class: "custom-control custom-checkbox",
      id: "skill",
      childrens: "../data/addUserForm.json"
    },
    {
      tag: "button",
      class: "btn btn-secondary",
      type: "submit",
      text_element: "submit"
    }
  ]
});
