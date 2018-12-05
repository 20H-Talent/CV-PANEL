/**
 *
 * @param form form to add enterprises.
 * @param inputsForm data enterprises. We use this variable to select all inputs form.

 *
 * https://developer.mozilla.org/es/docs/HTML/HTML5/Forms_in_HTML5 --> Documentation to control inputs form
 * https://getbootstrap.com/docs/4.0/components/forms/? --> Documentation to control inputs form
 * https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail --> Documentation to control email input.
 * https://www.w3schools.com/howto/howto_css_tooltip.asp --> Documentation tooltip styles.css
 *
 */
let enterpriseForm = new EnterprisesForm();

function verifyFormEnterprises() {
  //Edit User
  let form = document.getElementById("alert-form-enterprises");
  let inputsForm = form.querySelectorAll(
    "input[type=text],input[type=email],input[type=tel],input[type=url]"
  );
  var isValid = true;
  for (let i = 0; i < inputsForm.length; i++) {
    if (inputsForm[i].checkValidity() === true) {
      inputsForm[i].className = "form-control is-valid";
      if (inputsForm[i].name === "url") {
        inputsForm[i].className = "form-control col-md-4 is-valid";
      }
      locationTooltipsCorrect(inputsForm[i]);
    } else {
      inputsForm[i].className = "form-control is-invalid";
      if (inputsForm[i].name === "url") {
        inputsForm[i].className = "form-control col-md-4 is-invalid";
      }
      locationTooltipsIncorrect(inputsForm[i]);
      isValid = false;
    }
    // Hides and destroys an element’s tooltip
    $(inputsForm[i]).tooltip("dispose");
  }
  if (isValid) {
    setTimeout(() => {
      companies.sendNewCompanyToAPI();
    }, 1000);
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
    // $(input).tooltip("show");
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
    //  $(input).tooltip("show");
  });
}

function EnterprisesForm() {
  this.construct = function(container) {
    $.get("html/EnterprisesForm.html", function(htmlSkeleton) {
      container.empty().append(htmlSkeleton);
      //  enterpriseForm.socialUrls();
      //hinding the CIF input and showing the NIF input
      $("#rdoNif").on("click", function() {
        $("#nif")
          .show()
          .prop("required", true);
        $("#cif")
          .hide()
          .removeAttr("required");
      });
      $("#rdoCif").on("click", function() {
        $("#cif")
          .show()
          .prop("required", true);
        $("#nif")
          .hide()
          .removeAttr("required");
      });
      $("#btn-url").on("click", addSocialNetworkURL);
      $("#enterprises-form-ajax").load(
        "../html/EnterprisesForm.html",
        function() {
          //Listener Button, form enterprises.
          $("#btn-enterprises").on("click", function(event) {
            event.preventDefault();
            verifyFormEnterprises();
            // addSocialNetworkURL();
          });
        }
      );
    }).fail(function(err) {
      throw new Error(err);
    });
  };
}

function addSocialNetworkURL() {
  var urlAdded = document.getElementById("btn-url"); //listener del botón.
  var socialNetAdded = document.getElementById("platform").value;
  var socialList = document.getElementById("socialUL"); // La lista donde voy a añadir los links seleccionados.

  $("#socialUL").append(
    `<li><a href= "https://www.${socialNetAdded}.com/">${socialNetAdded}</a></li>`
  );
}
