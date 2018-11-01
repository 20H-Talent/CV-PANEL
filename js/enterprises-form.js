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
// console.log("inputform:", inputsForm[i]);
// console.log("Status:", inputsForm[i].checkValidity());

        if (inputsForm[i].checkValidity() === true) { 
            inputsForm[i].className = "form-control form-control-width is-valid";
            locationTooltipsCorrect( inputsForm[i] );   
            // console.log(" Test validity ok:",inputsForm[i].checkValidity());
            // console.log(" Test location ok:",locationTooltipsCorrect(inputsForm[i]));
        }else{ 
            inputsForm[i].className = "form-control form-control-width is-invalid";
            locationTooltipsIncorrect( inputsForm[i].id );
            // console.log(" Test validity error:",inputsForm[i].checkValidity());
            console.log(" Test location error:",locationTooltipsIncorrect(inputsForm[i].id));

        }  
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
