const UserForm = (function() {
  let instance;

  function init() {
    let userForm;
    function construct(container) {
      if (container.find("#user-form").length === 0) {
        $.get("../../html/UserForm.html", function(htmlSkeleton) {
          userForm = container
            .empty()
            .append(htmlSkeleton)
            .find("#user-form");

          _setupInternalEventListeners(userForm);
        }).fail(function(err) {
          throw new Error(err);
        });
      }
    }

    function _setupInternalEventListeners(form) {
      form
        .find("button#create-user")
        .off("click")
        .on("click", _formErrors);
      form
        .find("button.reset")
        .off("click")
        .on("click", _resetLanguagesSelector);
      form
        .find("button#languages")
        .off("click")
        .on("click", _showChoices);
    }

    function _showChoices() {
      //retrieve data
      const chosenLanguages = userForm.find(
        "select#selLanguage option:selected"
      );
      //set up output string
      if (chosenLanguages.length > 0) {
        const displayList = userForm
          .find("#output")
          .empty()
          .append(`<h4>Your Languages</h4><ul class="languages-list"></ul>`)
          .children("ul.languages-list");

        chosenLanguages.each((index, element) => {
          const language = $(element);
          displayList.append(`
             <li>
                ${language.text()}
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text text-light bg-primary" for="inputGroupSelect01">Level</label>
                    </div>
                    <select name="inputGroupSelect01" class="custom-select" id="inputGroupSelect01" required>
                        <option selected>Choose one</option>
                        <option value="Basic">Basic</option>
                        <option value="Medium">Medium</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Native">Native</option>
                    </select>
                </div>
             </li>`);
        });
      }
    }

    function _formErrors() {
      const alertErrors = userForm.find("#alertErrors");
      const form = userForm.find("form#alertform");

      alertErrors.empty().append(`
             <div class="col-lg-12">
                <ul class="alert alert-danger alert-dismissible"></ul>
            </div>`);

      const inputs = form.find("input");

      inputs.each((index, input) => {
        if (input.checkValidity()) {
          $(input).addClass("custom-control");
        } else {
          $(input).addClass("borderafter");
          alertErrors
            .find(`ul.alert-danger`)
            .append(
              ` <li class="font-weight-light">${input.name +
                " : " +
                input.validationMessage}</li>`
            );
        }
      });
      alertErrors.fadeIn("slow");
      setTimeout(function() {
        alertErrors.fadeOut("slow");
      }, 5000);
    }

    function _resetLanguagesSelector() {
      userForm.find("#output").empty();
      userForm.find("select#selLanguage").val("");
    }

    function editForm(event) {
      const element = $(event.currentTarget);
      const property = element.data("id");

      const data = usersTable.getUserByEmailOrID(property);
      // empting the checkboxes when editing another user
      var skillUser = document.getElementById("skill");
      var inpskill = skillUser.querySelectorAll("input");
      for (var i = 0; i < inpskill.length; i++) {
        inpskill[i].checked = false;
        console.log("test: ", inpskill[i]);
      }
      // empting the checkboxes when editing another user
      var lang = document.getElementById("selLanguage");
      //var inpLang = lang.querySelectorAll("option");
      for (var i = 0; i < lang.options.length; i++) {
        lang.options[i].selected = false;
      }
      $("#Username").val(data.login.username);
      $("#FirstName").val(
        data.name.first.charAt(0).toUpperCase() + data.name.first.slice(1)
      );
      $("#LastName").val(
        data.name.last.charAt(0).toUpperCase() + data.name.last.slice(1)
      );
      $("#email").val(data.email);
      console.log("dara", data);
      $("#age1").val(data.dob.age + " years old ");
      $("#tel").val(data.phone);
      $("#country").val(data.location.state);
      $("#city").val(data.location.city);
      $("#zip").val(data.location.postcode);
      $("#address").val(data.location.street);
      document.getElementById(data.gender).checked = true;
      for (var i = 0; i < data.skills.length; i++) {
        document.getElementById(data.skills[i]).checked = true;
      }
      var lang = document.getElementById("selLanguage");
      for (var i = 0; i < lang.options.length; i++) {
        // data.languages es un array con "languages" like ["Spanish","English"]
        // indexOf está buscando dentro del array data.languages la posición del "lang.options[i].value" por ejemplo "English"
        // ["Spanish","English"].indexOf("Spanish")
        // entonces el resultado sería 1
        if (data.languages.indexOf(lang.options[i].value) > -1) {
          lang.options[i].selected = true;
        }
      }
      switchVisible("Div2");
    }

    return {
      construct,
      editForm
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

const userForm = UserForm.getInstance();
