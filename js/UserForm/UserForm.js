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
      // const inputs = form.find("input");
      const inputs = $("input");
      inputs.each((index, input) => {
        $(input).removeClass("is-valid is-invalid");
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

      let res = $("input[required]");
      let valids = [];
      for (re of res) {
        if ($(re).hasClass("is-valid")) {
          valids.push(re);
        }
      }
      if (res.length === valids.length) {
        setTimeout(function() {
          let dataToSendServer = _createNewUser();

          // call to API
          _sendNewUser(dataToSendServer);
        }, 1000);
      }
    }

    function _resetLanguagesSelector() {
      userForm.find("#output").empty();
      userForm.find("select#selLanguage").val("");
    }

    function _createNewUser() {
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
      let website = $("input[name=website]").val();
      let avatar = $("input[type=file]");

      function _getSelectedElements(toSelect1, toSelect2, toSelect3) {
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
      dataUserTxtPlain = {
        name: fullname,
        username: username,
        email: email,
        phone: tlfn,
        gender: selectedElements.selectedGender,
        address: location,
        languages: selectedElements.selectedLanguages,
        skills: selectedElements.selectedSkills,
        experience: exprienceYears,
        birthDate: birthdate,
        website: website
      };
      return { dataUserTxtPlain, avatar };
    }
    function _sendNewUser(dataToSendServer) {
      $.ajax({
        type: "POST",
        url: "https://cv-mobile-api.herokuapp.com/api/users",
        data: JSON.stringify(dataToSendServer.dataUserTxtPlain),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .done(function(res) {
          let formData = new FormData();
          formData.append("img", dataToSendServer.avatar[0].files[0]);
          $.ajax({
            type: "POST",
            url: `https://cv-mobile-api.herokuapp.com/api/files/upload/user/${
              res._id
            }`,
            data: formData,
            mimeType: "multipart/form-data",
            processData: false,
            contentType: false
          });
        })
        .done(function() {
          sessionStorage.setItem("users-list", "");
          $("#list-users").trigger("click");
        })
        .fail(res => console.log("Unable to create user: ", res));
    }

    function editForm(user) {
      console.log(user);
      generalConstructor.construct("user-form");
      setTimeout(() => {
        $("div#data-column")
          .find("form")
          .prepend(`<input type=hidden value="${user._id}" />`);

        var skillUser = document.getElementById("skill");

        $("input[name=name]").val(user.name);

        $("input[name=username]").val(user.username);
        $("input[name=email]").val(user.email);
        $("input[name=birthdate]").val(user.birthDate);
        $("input[name=telephone]").val(user.phone);
        $("input[name=country]").val(user.address.state);
        $("input[name=city]").val(user.address.city);
        $("input[name=zip]").val(user.address.zipcode);
        $("input[name=address]").val(user.address.street);

        $(`input[value=${user.gender}]`).prop("checked", true);

        user["skills"].forEach(skill => {
          $(`input[name='skills[]'][value=${skill}]`).prop("checked", true);
        });

        $("select#selLanguage")
          .children("options")
          .each((index, option) => {
            if (user["languages"].indexOf($(option).val()) > -1) {
              $(option).prop("selected", true);
            }
          });
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
