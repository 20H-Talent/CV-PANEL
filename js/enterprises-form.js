/**
 * 
 * https://developer.mozilla.org/es/docs/HTML/HTML5/Forms_in_HTML5
 * https://getbootstrap.com/docs/4.0/components/forms/?
 * https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail --> Documentation to control email input.
 */

function verifyFormEnterprises() {
    var form = document.getElementById("alert-form-enterprises");
    var inputsForm = form.querySelectorAll(
        "input[type=text],input[type=email],input[type=tel]"
      ); 
  
    for (var i = 0; i < inputsForm.length; i++) {

        if (inputsForm[i].checkValidity() === true) { 
            inputsForm[i].className = "form-control form-control-width is-valid";
            locationTooltipsCorrect( inputsForm[i] );   
        }else{
            inputsForm[i].className = "form-control form-control-width is-invalid";
            locationTooltipsIncorrect( inputsForm[i] );
        }  
      
        // Hides and destroys an element’s tooltip
        $(inputsForm[i]).tooltip('dispose');
    }
}

/***********************************
 * Inputs incorrect 
 ***********************************/

function locationTooltipsIncorrect(input) {
    $(function() {
      $(input).tooltip({
        title: "Error. Please enter a valid format."
      });
      $(input).tooltip("show");
    });
  }
  
  /*********************************
   * Inputs correct 
   *********************************/
  
  function locationTooltipsCorrect(input) {
    $(function() {
      $(input).tooltip({
        title: "Correct!!"
      });
      $(input).tooltip("show");
    });
  }

  /***********************************
 * Listener Button form enterprises
 ***********************************/

$("#btn-enterprises").on("click", function() {
    verifyFormEnterprises();
}); 