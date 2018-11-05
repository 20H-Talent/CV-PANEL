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

 //  function createRequestBody(company) {
 //      let formData = new FormData();

 //      // Sent as a string
 //      formData.append('name', company.name);
 //      // Sent as a string
 //      formData.append('CIF', company.CIF);

 //      // Sent as a string with email validation
 //      formData.append('email', company.email);

 //      // Sent as a string
 //      //  formData.append('city', company.address.city);

 //      // Sent as a string
 //      formData.append('country', company.address.country);
 //      formData.append('zipcode', company.address.zipcode);

 //      // Sent as a string
 //      formData.append('street', company.address.street);

 //      // Sent as a string
 //      formData.append('bio', company.bio);

 //      // Sent as a string
 //      formData.append('employees', company.employees);

 //      // Sent as a string. Choose a value from below.
 //      formData.append('phone', company.phone);

 //      //  formData.append('logo', company.logoURL.files[0]);

 //      // Pick the value from an input(type="date")
 //      console.log('formData :', formData);
 //      return formData;
 //  }




 //  function sendNewCompany(e) {

 //      let company = new Company(
 //          $("input[name=name]").val(),
 //          $("input[name=CIF]").val(),
 //          $("input[name=country]").val(),
 //          $("input[name=city]").val(),
 //          $("input[name=street]").val(),
 //          $("input[name=phone]").val(),
 //          $("input[name=email]").val(),
 //          $("input[name=employees]").val(),
 //          $("input[name=website]").val(),
 //          $("input[name=bio]").val(),
 //          $("input[name=logoURL]").val()
 //      );
 //      let formBody = createRequestBody(company);

 //      fetch("https://cv-mobile-api.herokuapp.com/api/company", {
 //              method: 'POST',
 //              body: formBody
 //          })
 //          .then(res => res.json())
 //          .then(response => console.log(response));
 //  }
 //  $("#alert-form-enterprises").on("submit", function(e) {
 //      e.preventDefault();

 //      console.log($(this).serialize());
 //      sendNewCompany();

 //  })