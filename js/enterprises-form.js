/**
 * 
 * https://developer.mozilla.org/es/docs/HTML/HTML5/Forms_in_HTML5
 * https://getbootstrap.com/docs/4.0/components/forms/?
 * 
 */

function verifyFormEnterprises() {
    var form = document.getElementById("alert-form-enterprises");
    var inputsForm = form.querySelectorAll(
        "input[type=text],input[type=number],input[type=email],input[type=tel]"
      );

      for (i = 0; i < inputsForm.length; i++) {
        if (inputsForm[i].checkValidity() == true) {
            inputsForm[i].className = "form-control is-valid";
        }else{ 
            inputsForm[i].className = "form-control is-invalid";
        }
      }
    var logoFile = document.getElementById("inputLogo");
    if (logoFile.checkValidity() == true) {
        logoFile.classList.add("is-valid");
    }else{ 
        logoFile.classList.add("is-invalid");
    }

}

$("#btn-enterprises").on("click", function() {
    verifyFormEnterprises();
}); 
