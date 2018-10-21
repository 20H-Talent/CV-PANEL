/******************************************************************
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

/**************************************************************************
 * Selecting the day birth and putting the years of the user in a span***
 **************************************************************************/
// $("#datebirth").on("mouseenter mouseleave", function(event) {
//   event.stopPropagation();
//   var valor = $(this).val();
//   var years = moment().diff(valor, "years");
//   var testing = $("#test").html(years + " years old");
// });
