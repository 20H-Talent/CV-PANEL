/***************************************************************************************
 * Looping trought the errors of the inputs and inner them in to a list,if not valids ***
 ***************************************************************************************/
function formErrors() {
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
} // end formErrors

/*******************************************************************
 *  Putting in a list the selected languages/multi-slect***
 *******************************************************************/
function showChoices() {
  //retrieve data
  var selLanguage = document.getElementById("selLanguage");
  //set up output string
  var result = "<h4>Your Languages</h4>";
  result += "<ul>";
  //step through options
  for (i = 0; i < selLanguage.length; i++) {
    //examine current option
    var currentOption = selLanguage[i];
    //print it if it has been selected
    if (currentOption.selected == true) {
      result +=
        " <li>" +
        currentOption.value +
        "</li>" +
        "</ul>" +
        '<div class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<label class="input-group-text  text-light bg-primary" for="inputGroupSelect01">Level</label>' +
        "</div>" +
        '<select name="inputGroupSelect01" class="custom-select" id="inputGroupSelect01"   required>' +
        "<option selected>Choose one</option>" +
        ' <option value="Basic">Basic</option>' +
        ' <option value="Medium">Medium</option>' +
        '<option value="Advanced">Advanced</option>' +
        '<option value="Native">Native</option>' +
        "</select>" +
        "</div>";
    } // end if
  } // end for loop
  //finish off the list and print it out
  result += "</ul>";
  output = document.getElementById("output");
  output.innerHTML = result;
} // end showChoices

/***********************************************************************
 * Cleaning the content of the div before calling the function again ***
 ***********************************************************************/
function reset() {
  var output = document.getElementById("output");
  output.innerHTML = "";
  var select = document.getElementById("selLanguage");
  select.reset();
}

/*********************************************************************************************************
 *  Showing the form when clicking the add user and showing the table user when clinking the list user***
 *********************************************************************************************************/
function switchVisible(visible) {
  // console.log("div1", document.getElementById("Div1").style.display);
  // console.log("div2", document.getElementById("Div2").style.display);
  switch (visible) {
    case "Div1": //== table users
      //showing the table
      document.getElementById("Div1").style.display = "block";
      //hidding the form
      document.getElementById("Div2").style.display = "none";
      break;
    case "Div2": //== form
      //hidding the table
      document.getElementById("Div1").style.display = "none";
      //showing the form
      document.getElementById("Div2").style.display = "block";
      break;
    default:
      break;
  }
}
/**************************************************************************
 * Getting the values of the table and adding them in the inputs of the form on click***
 **************************************************************************/
function editForm(event) {
  const element = $(event.currentTarget);
  const property = element.data("id");

  const data = usersTable.getUserByEmailOrID(property);
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
/**************************************************************************
 * Selecting the day birth and putting the years of the user in a span***
 **************************************************************************/
// $("#datebirth").on("mouseenter mouseleave", function(event) {
//   event.stopPropagation();
//   var valor = $(this).val();
//   var years = moment().diff(valor, "years");
//   var testing = $("#test").html(years + " years old");
// });
