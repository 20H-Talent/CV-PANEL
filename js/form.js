function myFunction() {
  var renderize = document.getElementById("renderize");
  renderize.innerHTML = "";
  var form = document.getElementById("alertform");
  for (i = 0; i < form.elements.length; i++) {
    if (!form.elements[i].checkValidity()) {
      var divMain = document.createElement("div");
      divMain.className = "col-lg-2";
      var ul = document.createElement("ul");
      ul.className = " badge badge-danger";
      var li = document.createElement("li");
      li.className = "badge-danger";
      ul.appendChild(li);

      li.innerHTML =
        form.elements[i].name + " : " + form.elements[i].validationMessage;
      divMain.appendChild(ul);
      document.getElementById("renderize").appendChild(divMain);
      console.log(myFunction);
    }
  }
}

//from multi-select
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
      result += " <li>" + currentOption.value + "</li>";
    } // end if
  } // end for loop
  //finish off the list and print it out
  result += "</ul>";
  output = document.getElementById("output");
  output.innerHTML = result;
} // end showChoices

function reset() {
  var output = document.getElementById("output");
  output.innerHTML = "";
  var select = document.getElementById("selLanguage");
  select.reset();
}
