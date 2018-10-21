const UserForm = (function() {
  let instance;

  function init() {
    let userForm;
    function construct(container) {
      container.empty().append(_formSkeleton);
      userForm = container.find("#user-form");

      _setupInternalListeners();
    }

    function _setupInternalListeners() {
      userForm.find("button#create-user").on("click", _formErrors);
      userForm.find("button.reset").on("click", _resetFormField);
      userForm.find("button#languages").on("click", _showChoices);
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

      alertErrors.empty().append(
        `
             <div class="col-lg-12">
                <ul class="alert alert-danger alert-dismissible"></ul>
            </div>`
      );

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

    function _resetFormField() {
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

    function _formSkeleton() {
      return `<div class="col p-0 mr-3" id="user-form">
     <div class="container col-md-8 h-100">
       <div class="col ">
           <div class="mb-3 adduser text-center">
               <h4 class="mb-3 text-center"><i class="fas fa-user-plus"></i>Add User /<i class="fas fa-user-edit"></i>
                   Edit User</h4>
           </div>

           <div id="alertErrors" class="alert fade show" role="alert"></div>
           <hr class="mb-4">
           <hr class=" hr-2">
           <form id="alertform" method="POST" class="needs-validation col-md-12">
               <div class="form-group row has-success">
                   <label for="firstname" class="col-sm-2 col-form-label">First Name</label>
                   <div class="col-sm-10">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="inputGroup-sizing"><i class="fas asweome fa-user-tie"></i></span>
                           <input type="text" name="firstname" class="form-control " minlength="3"
                               maxlength="25" pattern="[a-zA-Z\s]+" value="" required>
                       </div>
                   </div>
               </div>

               <div class="form-group row has-success">
                   <label for="lastname" class="col-sm-2 col-form-label">Last Name</label>
                   <div class="col-sm-10">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="inputdefault"><i class="fas asweome fa-user-tie"></i></span>
                           <input lang="es-ES" type="text" name="lastname" class="form-control" minlength="3"
                            maxlength="25" pattern="[a-zA-Z\s]+" title="Last name must have 3-15 characters long"
                              value="" required>
                       </div>
                   </div>
               </div>

               <div class="form-group row has-success">
                   <label for="username" class="col-sm-2 col-form-label">Username</label>
                   <div class="col-sm-10">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="inputfault"><i class="fas asweome fa-users"></i></span>
                           <input lang="es-ES" name="username" pattern="[a-zA-Z0-9\s]+" minlength="3"
                               maxlength="25" type="text" class="form-control" required>
                       </div>


                   </div>
               </div>
               <div class="form-group row has-success">
                   <label for="email" class="col-sm-2 col-form-label">Email</label>
                   <div class="col-sm-10">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="in-sizing-default"><i class="fas asweome fa-at"></i></span>
                           <input lang="es-ES" type="email" name="email" class="form-control form-control-success"
                               minlength="3" maxlength="25" placeholder="name@example.com" required>
                       </div>
                   </div>
               </div>

               <div class="form-group row has-success">
                   <label for="telephone" class="col-sm-2 col-form-label">Telephone</label>
                   <div class="col-sm-10">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="inputizing-default"><i class="fas asweome fa-phone-square"></i></span>
                           <input name="telephone" type="tel" class="form-control" minlength="3" maxlength="25"  required>
                       </div>
                   </div>
               </div>

               <div class="form-group row has-success">
                   <label for="address" class="col-sm-2 col-form-label">Address</label>
                   <div class="col-sm-10">
                       <div class="input-group-prepend">
                           <span class="input-group-text"><i class="fas asweome asweome-address fa-map-marker-alt"></i></span>
                           <input lang="es-ES" name="adress" type="text" class="form-control"
                               minlength="3" maxlength="25" placeholder="1234 Main St" required>
                       </div>
                   </div>
               </div>

               <div class="form-group row has-success">
                   <label for="country" class="col-sm-2 col-form-label">Country</label>
                   <div class="col-sm-10">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="inputGroupdefault"><i class="fas asweome fa-globe-americas"></i></span>
                           <input lang="es-ES" name="country" class="custom-select d-block w-100" minlength="3" maxlength="25" pattern="[a-zA-Z0-9\s]+"
                           type="text" placeholder="residence country" required>
                       </div>
                   </div>
               </div>

               <div class="form-group row has-success">
                   <label for="city" class="col-sm-2 col-form-label">City</label>
                   <div class="col-sm-10">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="inputefault"><i class="fas asweome fa-city"></i></span>
                           <input lang="es-ES" name="city" class="custom-select d-block w-100"
                               minlength="3" maxlength="25" type="text" required>
                       </div>
                   </div>
               </div>

               <div class="form-group row has-success">
                   <label for="zip" class="col-sm-2 col-form-label">Zip</label>
                   <div class="col-sm-6">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="input-group"><i class="fas asweome fa-envelope-open-text"></i></span>
                           <input name="zip" type="text" class="form-control" pattern="[a-zA-Z0-9\s]+" minlength="3" maxlength="15" placeholder="90425"
                           required>
                       </div>
                   </div>
               </div>

               <div class="form-group row has-success" id="age-required">
                   <label for="birthdate" class="col-sm-2 col-form-label">Age</label>
                   <div class="col-sm-6">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="Group-s"><i class="fas asweome fa-user-tie"></i></span>
                           <input name="birthdate" class="form-control" type="date"required>
                       </div>
                   </div>
               </div>

               <div class="form-group row has-success">
                   <label class="col-sm-2 control-label gender">Gender</label>
                   <div class="col-sm-10">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="inpGroup-sizing-default"> <i class="fas asweome fa-venus-mars fa "></i></span>
                           <div class="custom-control gen custom-radio">
                               <input name="gender" type="radio" class="custom-control-input"required>
                               <label class="custom-control-label" for="male">Male</label>
                           </div>
                           <div class="custom-control gen custom-radio">
                               <input name="gender" type="radio" class="custom-control-input"required>
                               <label class="custom-control-label" for="female">Female</label>
                           </div>
                       </div>
                   </div>
               </div>

               <hr>

               <div class="custom-control custom-checkbox " id="skill">
                   <h4 class="mb-3 langsel">Skills</h4>
               </div>

               <h4 class="mb-3 langsel">Languages</h4> <small> (press ctrl to choose more languages)</small>
               <div class="form-group">
                   <select id="selLanguage" multiple="multiple" size="10" class="chosen-select custom-select col-sm-12"
                       name="selLanguage" required>
                   </select>
                   <div class="invalid-feedback">Example invalid custom select feedback</div>
               </div>
               <button id="languages" class="btn btn-custom" type="button">
                   Select languages
               </button>
               <button type="button" class="btn-custom btn reset" value="Reset">Reset</button>
               <div id="output"></div>
               <div class="d-block my-3 d-block custom-controls-stacked langsel">
                   <h4 class="mb-3">Are you available for an interview in the near future?</h4>
                   <div class=" custom-radio ">

                       <input id="available" name="Radiobutton" type="radio" class="custom-control-input"
                           required>
                       <label class="custom-control-label" for="available">Yes</label>
                   </div>
                   <div class=" custom-radio ">

                       <input id="Radiobutton1" name="Radiobutton" type="radio" class="custom-control-input"
                           required>
                       <label class="custom-control-label" for="Radiobutton1">No</label>
                   </div>
               </div>
               <div class="form-group">
                   <h4></h4>
                   <label for="exampleFormControlTextarea1"><strong>Additional informacion about you?</strong></label>
                   <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
               </div>
               <div id="upload-curriculum" class="form-row langsel">
                   <div class="col">
                       <label for="exampleFormControlFile1"> <strong>Upload Curriculum</strong>
                       </label>
                       <input type="file" class="form-control-file fileupload" id="exampleFormControlFile1">
                   </div>


                   <div class="col" id="upload-carta">
                       <label for="exampleFormControlFile2"><strong>Upload your application letter</strong></label>
                       <input type="file" class="form-control-file  fileupload" id="exampleFormControlFile2">
                   </div>

               </div>

               <button id="create-user"class="btn checkout  btn-custom btn-lg btn-block" type="submit">Save</button>
           </form>
           <footer class="my-5 pt-5 text-muted text-center text-small">
               <p class="mb-1">&copy;2018-2019 Curriculum Connections</p>
           </footer>

       </div>
   </div>
</div>`;
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
