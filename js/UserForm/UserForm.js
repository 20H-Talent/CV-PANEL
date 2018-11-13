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
        userForm.trigger("reset");
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

      $.get("https://cv-mobile-api.herokuapp.com/api/skills", function(skills) {
        skills.forEach(skill => {
          skillsContainer.append(`
                <div class="custom-control custom-checkbox custom-control-inline">
                    <input name="skills[]" type="checkbox" class="custom-control-input" id="${
                      skill["label"]
                    }" value=${skill["_id"]}>
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
      $.get("https://cv-mobile-api.herokuapp.com/api/langs", function(
        languages
      ) {
        const languagesSelector = userForm.find("select#selLanguage");
        languagesSelector.empty();
        languages.forEach(language => {
          const label = language["label"];
          languagesSelector.append(
            `<option value="${
              language["_id"]
            }" name="languages[]">${label}</option>`
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
          $(input).addClass("is-valid");
        } else {
          $(input).addClass("is-invalid");
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

      //llamar al createUser.
      setTimeout(function() {
        let jsongenerated = createUser();
        console.log("JSON GENERADO ... : ", jsongenerated);

        // llamada a api
        sendNewUser(jsongenerated);
      }, 3000);
    }

    function _resetLanguagesSelector() {
      userForm.find("#output").empty();
      userForm.find("select#selLanguage").val("");
    }
    // -------------------- TESTEO ---------------
    function createUser() {
      // comprobar que todos los inputs sean valids.
      let fullname = $("input[name=name]").val();
      let username = $("input[name=username").val();
      let email = $("input[name=email").val();
      let tlfn = $("input[name=telephone").val();
      let address = $("input[name=adress").val();
      let country = $("input[name=country").val();
      let city = $("input[name=city").val();
      let zip = $("input[name=zip").val();
      let birthdate = $("input[name=birthdate").val();
      let exprienceYears = $("input[name=experience_years").val();

      function _getSelectedElements(toSelect1, toSelect2, toSelect3) {
        // console.log("to select1: ", toSelect1, " and to select2: ", toSelect2);
        let selectedLanguages = [];
        let selectedSkills = [];
        let selectedGender;
        for (select of toSelect1) {
          if (select.selected) {
            selectedLanguages.push(select.value);
          }
        }
        for (select of toSelect2) {
          if (select.checked) {
            selectedSkills.push(select.value);
          }
        }
        for (select of toSelect3) {
          if (select.checked) {
            selectedGender = select.value;
          }
        }
        // console.log("Genero cogido: ", selectedGender);
        // console.log("LANGS seleccionados: ", selectedLanguages);
        // console.log("SKILLS seleccionados: ", selectedSkills);

        //return { selectedLanguages, selectedSkills };
        // console.log("langs: ", selectedLanguages);

        return { selectedLanguages, selectedSkills, selectedGender };
      }
      let selectedElements = _getSelectedElements(
        $("#selLanguage option[name='languages[]']"),
        $("input[name='skills[]']"),
        $("input[name='gender']")
      );
      // to get the object location.
      let location = {
        country: `${country}`,
        city: `${city}`,
        street: `${address}`,
        zipcode: `${zip}`
      };

      //   console.log("Elementos seleccionados: ", selectedElements);
      return {
        name: fullname,
        username: username,
        email: email,
        phone: tlfn,
        gender: selectedElements.selectedGender,
        address: location,
        languages: selectedElements.selectedLanguages,
        skills: selectedElements.selectedSkills,
        experience: exprienceYears,
        birthDate: birthdate
      };
    }
    function sendNewUser(jsonObj) {
      $.ajax({
        type: "POST",
        url: "https://cv-mobile-api.herokuapp.com/api/users",
        data: JSON.stringify(jsonObj),
        headers: {
          "Content-Type": "application/json"
        }
      }).done(response => console.log(response));
    }

    //falta coger la foto.

    // ------------------- FIN TESTEO ----------------
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
        $("input[name=username]").val(user.login.username);
        $("input[name=firstname]").val(
          user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)
        );
        $("input[name=lastname]").val(
          user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)
        );
        $("input[name=email]").val(user.email);
        $("input[name=birthdate]").val(user.dob.age + " years old ");
        $("input[name=telephone]").val(user.phone);
        $("input[name=country]").val(user.location.state);
        $("input[name=city]").val(user.location.city);
        $("input[name=zip]").val(user.location.postcode);
        $("input[name=adress]").val(user.location.street);
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
