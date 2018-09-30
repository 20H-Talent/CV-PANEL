/*******************************************************************
 * Looping trought the errors of the inputs and inner them in to a list,if not valids ***
 *******************************************************************/
function formErrors() {
  //Cleaning the content of the div before calling the function again
  var renderize = document.getElementById("renderize");
  renderize.innerHTML = "";
  //getting the form by id
  var form = document.getElementById("alertform");
  //looping trought the elements of the form
  for (i = 0; i < form.elements.length; i++) {
    //if the elemnts of the form are not valids
    if (!form.elements[i].checkValidity()) {
      //creating the div main where the errors will be printed
      var divMain = document.createElement("div");
      //giving a class to the div of boostrap
      divMain.className = "col-lg-2";
      var ul = document.createElement("ul");
      ul.className = " badge badge-danger";
      var li = document.createElement("li");
      li.className = "badge-danger";
      ul.appendChild(li);
      //the li  will appear as messages of error if the input is invalid
      li.innerHTML =
        form.elements[i].name + " : " + form.elements[i].validationMessage;
      divMain.appendChild(ul);
      //inserting the div where the errors are in to the div rederize that already exists in html
      document.getElementById("renderize").appendChild(divMain);
    } // end if
  } // end for loop
  //finish off the list and print it out
} // end formErrors

/*******************************************************************
 *  Putting in a list the selected languages/multi-slect***
 *******************************************************************/
function showChoices() {
  //retrieve data
  var selLanguage = document.getElementById("selLanguage");
  //set up output string
  var result = "<h2>Your Languages</h2>";
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
        '<label class="input-group-text" for="inputGroupSelect01">Level</label>' +
        "</div>" +
        '<select name="Language level" class="custom-select" id="inputGroupSelect01"   required>' +
        "<option selected>Choose one</option>" +
        ' <option value="1">Basic</option>' +
        ' <option value="2">Medium</option>' +
        '<option value="3">Advanced</option>' +
        '<option value="3">Native</option>' +
        "</select>" +
        "</div>";
    } // end if
  } // end for loop
  //finish off the list and print it out
  result += "</ul>";
  output = document.getElementById("output");
  output.innerHTML = result;
} // end showChoices

/*******************************************************************
 * Cleaning the content of the div before calling the function again ***
 *******************************************************************/
function reset() {
  var output = document.getElementById("output");
  output.innerHTML = "";
  var select = document.getElementById("selLanguage");
  select.reset();
}

/*******************************************************************
 *  Showing the form when clicking the add user and showing the table user when clinking the list user***
 *******************************************************************/
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
