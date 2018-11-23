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
      let street = $("input[name=street").val();
      let country = $("input[name=country").val();
      let city = $("input[name=city").val();
      let zipcode = $("input[name=zipcode").val();
      let birthdate = $("input[name=birthdate").val();
      let experience = $("select[id='experience']").val();
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
        country,
        city,
        street,
        zipcode
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
        experience: experience,
        birthDate: birthdate,
        website: website
      };
      return { dataUserTxtPlain, avatar };
    }
    function _sendNewUser(dataToSendServer) {
      console.log("datasent", dataToSendServer);
      /**
       * Render modal for updated or created user.
       * @param stringForId - the posible values are created or updated.
       */
      function _renderModalEditOrCreateUser(stringForId) {
        $("main")
          .append(`<div class="modal d-block welcome-modal" style="z-index:
      10000" id="user_${stringForId}" tabindex="-1" role="dialog"
aria-labelledby="user_${stringForId}" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content align-items-center">
      <div class="modal-header justify-content-center w-100 text-white" style="background-color: #4caf50;">
          <h5 class="modal-title font-weight-bold">User ${stringForId} Successfully</h5>
      </div>
      <div class="modal-body text-center">
          <p>Name: ${dataToSendServer.dataUserTxtPlain.name} and Username: ${
          dataToSendServer.dataUserTxtPlain.username
        }.
          </p>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary">Go to Users</button>
          <button type="button" class="btn btn-primary">Continue editing user</button>
          <button type="button" class="btn btn-warning">Add another user</button>
      </div>
  </div>
</div>
</div> `);

        // $("#list-users").trigger("click");
        $(`#user_${stringForId} button.btn-secondary`).on("click", function() {
          $(`#user_${stringForId}`).remove();
          sessionStorage.removeItem("users-list");
          location.reload(true);
          location.reload(true);
          // $("#list-users").trigger("click");
        });
        $(`#user_${stringForId} button.btn-primary`).on("click", function() {
          $(`#user_${stringForId}`).remove();
        });
        $(`#user_${stringForId} button.btn-warning`).on("click", function() {
          sessionStorage.removeItem("users-list");
          location.reload(true);
          location.reload(true);
          //$("#list-users").trigger("click");
          $("#new-user").trigger("click");
        });
      }
      const userID = $("form#user-form")
        .find("input[type=hidden]")
        .val();

      $.ajax({
        method: userID ? "PUT" : "POST",
        url: `https://cv-mobile-api.herokuapp.com/api/users/${
          userID ? userID : ""
        }`,
        data: JSON.stringify(dataToSendServer.dataUserTxtPlain),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .done(function(res) {
          if (!userID) {
            let formData = new FormData();
            formData.append("img", dataToSendServer.avatar[0].files[0]);
            $.ajax({
              method: "POST",
              url: `https://cv-mobile-api.herokuapp.com/api/files/upload/user/${
                res._id
              }`,
              data: formData,
              mimeType: "multipart/form-data",
              processData: false,
              contentType: false
            }).done(function(res) {
              console.log("res: ", res);
              _renderModalEditOrCreateUser("created");
            });
          } else {
            _renderModalEditOrCreateUser("updated");
          }
        })
        .fail(res => console.log("Unable to create user: ", res));
    }

    function editForm(user) {
      generalConstructor.construct("user-form");
      setTimeout(() => {
        $("div#data-column")
          .find("form")
          .prepend(`<input type=hidden value="${user._id}" />`);

        $("input[name=name]").val(user.name);
        $("input[name=username]").val(user.username);
        $("input[name=email]").val(user.email);
        $("input[name=telephone]").val(user.phone);
        $("input[name=country]").val(user.address.country);
        $("input[name=city]").val(user.address.city);
        $("input[name=zipcode]").val(user.address.zipcode);
        $("input[name=street]").val(user.address.street);
        $("input[name=website]").val(user.website);
        $("select[id=experience]").val(user.experience);

        //set user.birthDate (obtained of database, e.g.: 1990-12-12T00:00:00.000Z) to timeStamp.
        getbirthDate = new Date(user.birthDate).getTime();
        //set timestamp user.birthDate to Date (e.g.: Wed Dec 12 1990 00:00:00 GMT+0000 (WET) to get Date input
        //of the FormUser, format: yyyy/MM/dd)
        getbirthDate = new Date(getbirthDate);

        birthMonth = `${getbirthDate.getMonth() + 1}`; //January is 0.
        birthDay = `${getbirthDate.getDate()}`;
        birthYear = `${getbirthDate.getFullYear()}`;
        //if month, or date hasn't 2 digits, or year hasn't 4 digits, the format is invalid.
        if (getbirthDate.getMonth() < 10) {
          birthMonth = `0${getbirthDate.getMonth() + 1}`;
        }
        if (getbirthDate.getDate() < 10) {
          birthDay = `0${getbirthDate.getDate()}`;
        }
        if (getbirthDate.getFullYear() < 1000) {
          birthYear = `0${getbirthDate.getFullYear()}`;
        }
        getbirthDate = `${birthYear}-${birthMonth}-${birthDay}`;

        $("input[name=birthdate]").val(getbirthDate);
        $(`input[value=${user.gender}]`).prop("checked", true);

        user["skills"].forEach(skill => {
          $(`input[name='skills[]'][value=${skill}]`).prop("checked", true);
        });

        $("select#selLanguage")
          .children("option")
          .each((index, option) => {
            if (user["languages"].includes($(option).val())) {
              $(option).prop("selected", true);
            }
          });
      }, 400);
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
