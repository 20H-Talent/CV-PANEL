/*********************
 * Inputs incorrect 
 *********************/

function locationTooltipsIncorrect(input) {
  $(function() {
    $(input).tooltip({
      title: "Error. Please enter a valid format.",
      placement: "right"
    });
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
      placement: "right"
    });
    $(input).tooltip("show");
  });
}

