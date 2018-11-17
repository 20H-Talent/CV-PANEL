/**
 *
 * @param form form to add enterprises.
 * @param inputsForm data enterprises. We use this letiable to select all inputs form.
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
            sendNewCompanyToAPI()
        }, 1000);

        // setTimeout(() => {
        //     editCompanyPUT()
        // }, 1000);

    }

}
/***********************************
 * Adding a new company to API
 ***********************************/
function sendNewCompanyToAPI() {
    let method = 'POST';
    let url = "https://cv-mobile-api.herokuapp.com/api/companies";
    let id = $("input[name=company-id]").val();
    if (id.length > 0) {
        method = 'PUT';
        url = "https://cv-mobile-api.herokuapp.com/api/companies/" + id;
    }
    let name = $("input[name=name]").val();
    let docType = $("input[name=docType]:checked").val();
    let docNumber = "";
    if (docType == "nif") {
        docNumber = $("input[name=docNumberNif]").val();
    } else {
        docNumber = $("input[name=docNumberCif]").val();
    }
    let country = $("input[name=country]").val();
    let zipcode = $("input[name=zipcode]").val();
    let city = $("input[name=city]").val();
    let street = $("input[name=street]").val();
    let address = { "country": country, "street": street, "city": city, "zipcode": zipcode }
    let phone = $("input[name=phone]").val();
    let email = $("input[name=email]").val();
    let employees = $("input[name=employees]").val();
    let website = $("input[name=website]").val();
    let bio = $("textarea[name=bio]").val();
    //   let logo = document.getElementById('logo').files[0];
    let socialUrls = $("input[name=socialUrls]").val();
    // let newCompany = sendNewCompanyToAPI();
    let newCompany = {
        'name': `${name}`,
        "docType": docType,
        'docNumber': docNumber,
        'email': email,
        'address': address,
        'bio': bio,
        'employees': employees,
        'phone': phone,
        'website': website,
        "socialUrls": [],
        "jobOffers": []
    }
    fetch(url, {
            method: method,
            body: JSON.stringify(newCompany),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(response => {
            if (response) {
                if (window.confirm("You have an answer")) {
                    window.location.replace("/index.html")
                }
            }
        });
    // function sendNewCompanyToAPI() {
    //     let json = {
    //         'name': name,
    //         "docType": docType,
    //         'docNumber': docNumber,
    //         'email': email,
    //         'address': address,
    //         'bio': bio,
    //         'employees': employees,
    //         'phone': phone,
    //         'website': website,
    //         'socialUrls': socialUrls,
    //         "logo": "",
    //         "socialUrls": [],
    //         "jobOffers": []
    //     }
    //     return json;
    // }
}
// function sendEditCompany() {
//     let formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('country', country);
//     formData.append('zipcode', zipcode);
//     formData.append('street', street);
//     formData.append('bio', bio);
//     formData.append('employees', employees);
//     formData.append('phone', phone);
//     formData.append('city', city);
//     formData.append('logo', logo);
//     formData.append('website', website);
//     formData.append('socialUrls', socialUrls);
//     return formData;
// }


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

function EnterprisesForm() {

    this.construct = function(container) {
        $.get("../../html/EnterprisesForm.html", function(htmlSkeleton) {
            container.empty().append(htmlSkeleton);
            //hinding the CIF input and showing the NIF input
            $("#rdoNif").on("click", function() {
                $("#nif").show();
                $("#cif").hide();
            });
            $("#rdoCif").on("click", function() {
                $("#cif").show();
                $("#nif").hide();
            });
            $("#enterprises-form-ajax").load("../html/EnterprisesForm.html", function() {
                //Listener Button, form enterprises.
                $("#btn-enterprises").on("click", function(event) {
                    event.preventDefault();
                    verifyFormEnterprises();
                });
            });
        }).fail(function(err) {
            throw new Error(err);
        });
    }

}





/***********************************
 * Load by ajax into index.html.
 ***********************************/

// $("#enterprises-form-ajax").load("../html/EnterprisesForm.html", function() {
//     //Listener Button, form enterprises.
//     $("#btn-enterprises").on("click", function() {
//         sendNewCompanyToAPI();
//         verifyFormEnterprises();
//     });
// });