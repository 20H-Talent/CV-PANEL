const UserForm = (function() {
  let instance;

  function init() {
    function construct(container) {
      container.empty().append(_formSkeleton);

      _setupInternalListeners();
    }

    function _setupInternalListeners() {
      const userForm = $("#user-form");
      userForm.find("button#create-user").on("click", _formErrors);
      userForm.find("button.reset").on("click", _resetFormField);
    }

    function _formErrors() {
      //Cleaning the content of the div before calling the function again
      var renderize = document.getElementById("renderize");
      //Go back to initial value/display
      document.getElementById("renderize").style.display = "block";
      renderize.innerHTML = "";
      document.getElementById("renderize").style.opacity = "100";
      //getting the form by id
      var form = document.getElementById("alertform");
      var input = form.querySelectorAll(
        "input[type=text],input[type=email],input[type=number],input[type=zip],input[type=address],input[type=select],input[type=telephone]"
      );
      //looping trought the elements of the form
      for (i = 0; i < input.length; i++) {
        if (input[i].checkValidity()) {
          input[i].className = "form-control custom-control";
          // input[i].className = "form-control close";
        }
      }
      for (i = 0; i < input.length; i++) {
        //if the elemnts of the form are not valids
        if (!input[i].checkValidity()) {
          //creating the div main where the errors will be printed
          var divMain = document.createElement("div");
          //giving a class to the div of boostrap
          divMain.className = "col-lg-12";
          var ul = document.createElement("ul");
          ul.className = "alert alert-danger ";
          var li = document.createElement("li");
          li.className = "font-weight-light ";
          ul.appendChild(li);
          //the li  will appear as messages of error if the input is invalid
          li.innerHTML = input[i].name + " : " + input[i].validationMessage;
          input[i].className = "form-control borderafter";
          divMain.appendChild(ul);
          //inserting the div where the errors are in to the div rederize that already exists in html
          document.getElementById("renderize").appendChild(divMain);
        } // end if
      }
      setTimeout(function() {
        document.getElementById("renderize").style.opacity = "0";
        document.getElementById("renderize").style.display = "none";
      }, 5000); // end for loop
      //finish off the list and print it out
    }

    function _resetFormField() {
      var output = document.getElementById("output");
      output.innerHTML = "";
      var select = document.getElementById("selLanguage");
      select.reset();
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

           <div id="renderize" class="alert fade show" role="alert"></div>
           <hr class="mb-4">
           <hr class=" hr-2">
           <form id="alertform" method="POST" class="needs-validation col-md-12 ">
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
               <button class="btn reset btn-custom" type="button" onclick="showChoices()">
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

               <button id="button-create-user" class="btn checkout  btn-custom btn-lg btn-block"
                   onclick="formErrors()" type="submit">Save</button>
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
