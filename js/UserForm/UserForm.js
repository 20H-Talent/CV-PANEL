const UserForm = (function() {
  let instance;

  function init() {
    let userForm;
    function construct(container) {
      $.get("../../html/UserForm.html", function(htmlSkeleton) {
        userForm = container
          .empty()
          .append(htmlSkeleton)
          .find("#user-form-container");

        _setupInternalEventListeners(userForm);
        _appendSkills();
        _appendLanguages();
      }).fail(function(err) {
        throw new Error(err);
      });
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

    function _appendSkills() {
      const skillsContainer = userForm.find("#skill");
      skillsContainer
        .find("*")
        .not("h4")
        .empty();

      $.getJSON("../../data/skills.json", function(skills) {
        skills.forEach(skill => {
          skillsContainer.append(`
          <div class="custom-control custom-checkbox custom-control-inline">
               <input name="${
                 skill["name"]
               }" type="checkbox" class="custom-control-input" id="${
            skill["label"]
          }" value=${skill["defaultValue"]}>
               <label class="custom-control-label" for="${skill["label"]}">${
            skill["label"]
          }</label>
             </div`);
        });
      }).fail(function(err) {
        throw new Error(err);
      });
    }

    function _appendLanguages() {
      $.getJSON("../../data/languages.json", function(languages) {
        const languagesSelector = userForm.find("select#selLanguage");
        languagesSelector.empty();

        languages.forEach(language => {
          const label = language["label"];

          languagesSelector.append(
            `<option value="${label}">${label}</option>`
          );
        });
      }).fail(function(err) {
        throw new Error(err);
      });
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
      const form = userForm.find("form#user-form");

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

    function editForm(user) {
      generalConstructor.construct("user-form");
      setTimeout(() => {
        // empting the checkboxes when editing another user
        var skillUser = document.getElementById("skill");
        var inpskill = skillUser.querySelectorAll("input");
        for (var i = 0; i < inpskill.length; i++) {
          inpskill[i].checked = false;
        }
        // empting the checkboxes when editing another user
        var lang = document.getElementById("selLanguage");
        //var inpLang = lang.querySelectorAll("option");
        for (var i = 0; i < lang.options.length; i++) {
          lang.options[i].selected = false;
        }
        $("#Username").val(user.login.username);
        $("#FirstName").val(
          user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)
        );
        $("#LastName").val(
          user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)
        );
        $("#email").val(user.email);
        $("#age1").val(user.dob.age + " years old ");
        $("#tel").val(user.phone);
        $("#country").val(user.location.state);
        $("#city").val(user.location.city);
        $("#zip").val(user.location.postcode);
        $("#address").val(user.location.street);

        document.querySelector(`input[value=${user.gender}]`).checked = true;
        for (var i = 0; i < user.skills.length; i++) {
          document.getElementById(user.skills[i]).checked = true;
        }
        var lang = document.getElementById("selLanguage");
        for (var i = 0; i < lang.options.length; i++) {
          // user.languages es un array con "languages" like ["Spanish","English"]
          // indexOf está buscando dentro del array user.languages la posición del "lang.options[i].value" por ejemplo "English"
          // ["Spanish","English"].indexOf("Spanish")
          // entonces el resultado sería 1
          if (user.languages.indexOf(lang.options[i].value) > -1) {
            lang.options[i].selected = true;
          }
        }
      }, 300);
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
