 //function loads with ajax the html section of search advanced company and puts it in the menu right on click, (replacing) empting the section of users search advanced
 $(document).ready(function() {
     $("#list-companies").click(function() {
         $.get("../html/searchCompaniesForm.html")
             .done(function(data) {
                 $("#right-menu-ajax").empty().append(data);
             }).fail(function(jqXHR) {
                 if (jqXHR.statusText !== "OK") {
                     console.log("[ERROR]: on loading json.");
                 }
             });;
     });
 });

 function createRequestBody(company) {
     let formData = new FormData();

     // Sent as a string
     formData.append('name', company.name);
     º
     // Sent as a string
     formData.append('CIF', company.CIF);

     // Sent as a string with email validation
     formData.append('email', company.email);

     // Sent as a string
     formData.append('city', company.address.city);

     // Sent as a string
     formData.append('country', company.address.country);

     // Sent as a string
     formData.append('jobTitle', company.address.street);

     // Sent as a string
     formData.append('bio', company.bio);

     // Sent as a string
     formData.append('employees', company.employees);

     // Sent as a string. Choose a value from below.
     formData.append('phone', company.phone);

     // Pick the value from an input(type="date")

     return formData;
 }




 function sendNewUser(e) {
     e.preventDefault();
     let company = new Company(
         $("input[name=inputName]").val(), $("input[name=inputCif]").val(), $("input[name=imputAdress]").val(), $("input[name=imputCity]").val(), $("input[name=inputCountry]").val(), $("input[name=inputZip]").val(), $("input[name=inputEmail]").val(), $("input[name=inputWorkersNumber]").val(), $("input[name=inputSocialNetworks]").val(), $("input[name=inputLogo]").val(), $("input[name=inputDescription]").val()
     );
     let formBody = createRequestBody(company);

     fetch("https://cv-mobile-api.herokuapp.com/api/company", {
             method: 'POST',
             body: formBody
         })
         .then(res => res.json())
         .then(response => console.log(response));
 }