/******************************************************************
 *  Putting in a list the selected languages/multi-slect***
 *******************************************************************/

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
