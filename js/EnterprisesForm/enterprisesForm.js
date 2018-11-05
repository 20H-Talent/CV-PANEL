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
    $("#alert-form-enterprises").on("submit", function(e) {
            e.preventDefault();

            console.log($(this).serialize());
            sendNewCompany();

        })
        //Listener Button, form enterprises.
    $("#btn-enterprises").on("click", function() {
        verifyFormEnterprises();
    });
});

function createRequestBody(company) {
    console.log('company :', company);
    let formData = new FormData();
    var fileField = document.querySelector("input[type='file']");
    // Sent as a string
    formData.append('name', company.name);
    // Sent as a string
    formData.append('CIF', company.CIF);

    // Sent as a string with email validation
    formData.append('email', company.email);

    // Sent as a string
    //  formData.append('city', company.address.city);

    // Sent as a string
    formData.append('country', company.country);
    formData.append('zipcode', company.zipcode);

    // Sent as a string
    formData.append('street', company.street);

    // Sent as a string
    formData.append('bio', company.bio);

    // Sent as a string
    formData.append('employees', company.employees);

    // Sent as a string. Choose a value from below.
    formData.append('phone', company.phone);
    formData.append('logoURL', fileField.files[0]);

    //  formData.append('logo', company.logoURL.files[0]);

    // Pick the value from an input(type="date")
    console.log('formData :', formData);
    return formData;
}




function sendNewCompany() {

    let company = new Company(
        $("input[name=name]").val(),
        $("input[name=CIF]").val(),
        $("input[name=country]").val(),
        $("input[name=city]").val(),
        $("input[name=street]").val(),
        $("input[name=phone]").val(),
        $("input[name=email]").val(),
        $("input[name=employees]").val(),
        $("input[name=website]").val(),
        $("input[name=bio]").val(),
        $("input[name=logoURL]").val()
    );
    console.log(' $("input[name=name]").val() :', $("input[name=name]").val());
    let formBody = createRequestBody(company);

    fetch("https://cv-mobile-api.herokuapp.com/api/company", {
            method: 'POST',
            mode: "no-cors",
            body: formBody,
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then(function(res) {
            console.log('res :', res);
            res.json()
        })
        .then(response => console.log(response));
}