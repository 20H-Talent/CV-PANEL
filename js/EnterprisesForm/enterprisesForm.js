/**
 *
 * @param form form to add enterprises.
 * @param inputsForm data enterprises. We use this variable to select all inputs form.
 *
 * ## checkValidity()
 *      return true if inputs is valid.
 * ## locationTooltipsCorrect
 *      we use this function to handler tooltip function of bootstrap.
 *
 * https://developer.mozilla.org/es/docs/HTML/HTML5/Forms_in_HTML5 --> Documentation to control inputs form
 * https://getbootstrap.com/docs/4.0/components/forms/? --> Documentation to control inputs form
 * https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail --> Documentation to control email input.
 * https://www.w3schools.com/howto/howto_css_tooltip.asp --> Documentation tooltip styles.css
 *
 */

function verifyFormEnterprises() {
  var form = document.getElementById("alert-form-enterprises");
  var inputsForm = form.querySelectorAll(
    "input[type=text],input[type=email],input[type=tel]"
  );

  for (var i = 0; i < inputsForm.length; i++) {
    if (inputsForm[i].checkValidity() === true) {
      inputsForm[i].className = "form-control form-control-width is-valid";
      locationTooltipsCorrect(inputsForm[i]);
    } else {
      inputsForm[i].className = "form-control form-control-width is-invalid";
      locationTooltipsIncorrect(inputsForm[i]);
    }

    // Hides and destroys an element’s tooltip
    $(inputsForm[i]).tooltip("dispose");
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
 * Load by ajax into index.html.
 ***********************************/

$("#enterprises-form-ajax").load("../html/EnterprisesForm.html", function() {
  //Listener Button, form enterprises.
  $("#btn-enterprises").on("click", function() {
    verifyFormEnterprises();
  });
});

function EnterprisesForm(){

  this.construct=function(container) {
    $.get("../../html/EnterprisesForm.html", function(htmlSkeleton) {
        container.empty().append(htmlSkeleton);
        $("#enterprises-form-ajax").load("../html/EnterprisesForm.html", function() {
          //Listener Button, form enterprises.
          $("#btn-enterprises").on("click", function() {
            verifyFormEnterprises();
          });
        });

    }).fail(function(err) {
        throw new Error(err);
    });
  }

}

let enterpriseForm = new EnterprisesForm();