/*********************
 * Inputs incorrect 
 *********************/

function locationTooltipsIncorrect(input) {
  $(function() {
    $(input).tooltip({
      title: "Error. Please enter a valid format.",
      placement: "right"
    });
    // console.log("Incorrect input:", input.id);
    $(input).tooltip("show");
  });
}

/*******************
 * Inputs correct 
 *******************/

function locationTooltipsCorrect(input) {
  $(function() {
    $(input).tooltip({
      title: "Correct!!", 
      placement: "left"
    });
    // console.log("correct input:", input.id);
    $(input).tooltip("show");
  });
}

// function clearTooltips(input){
//   $(function(input) {
//     $(input).tooltip({
//       title: " ",
//       placement: "top"
//     });
//     // console.log("correct input:", input);
//     $(input).tooltip("show");
//   });
// }