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
        /**
         * Hides and destroys an element’s tooltip
         */
        $(inputsForm[i]).tooltip('dispose');
    }
}

$("#btn-enterprises").on("click", function() {
    verifyFormEnterprises();
}); 

/**
 * 
 * ¿ Porque no funciona con un .on("submit", function() ?
 * 
 * Al intentar enviar un formulario que no pasa la validación, 
 * se activa un evento no válido. La validación impide enviar el formulario, 
 * por lo que no hay ningún evento de envío.
 * 
 */

// $( "#btn-enterprises" ).on("click", function( event ) {
//     event.preventDefault();
//     verifyFormEnterprises();
// }); 
