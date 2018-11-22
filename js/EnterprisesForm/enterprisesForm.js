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
        "input[type=text],input[type=email],input[type=tel]"
    );
    var isValid = true;
    for (let i = 0; i < inputsForm.length; i++) {
        if (inputsForm[i].checkValidity() === true) {
            inputsForm[i].className = "form-control form-control-width is-valid";
            locationTooltipsCorrect(inputsForm[i]);
        } else {
            inputsForm[i].className = "form-control form-control-width is-invalid";
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
        //   $(input).tooltip("show");
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
        // $(input).tooltip("show");
    });
}

function EnterprisesForm() {
    this.construct = function(container) {
        $.get("../../html/EnterprisesForm.html", function(htmlSkeleton) {
            container.empty().append(htmlSkeleton);
            enterpriseForm.socialUrls();
            //hinding the CIF input and showing the NIF input
            $("#rdoNif").on("click", function() {
                $("#nif").show();
                $("#cif").hide();
            });
            $("#rdoCif").on("click", function() {
                $("#cif").show();
                $("#nif").hide();
            });
            $("#enterprises-form-ajax").load(
                "../html/EnterprisesForm.html",
                function() {
                    //Listener Button, form enterprises.
                    $("#btn-enterprises").on("click", function(event) {
                        event.preventDefault();
                        verifyFormEnterprises();
                    });
                }
            );
        }).fail(function(err) {
            throw new Error(err);
        });
    };
}

EnterprisesForm.prototype.socialUrls = function() {
    $("input[name=socialUrls]").on("keypress", function(event) {
        if (event.which === 13) {
            var socialLIst = $(this).val();
            // $(this).val("");
            $("ul").append("<li  ><span><i class='fa fa-users mr-3'></i></span> " + socialLIst + "</li>")
        }
    });
}