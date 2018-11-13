var companies = new Companies();
fetch("https://cv-mobile-api.herokuapp.com/api/company")
  .then(response => response.json())
  .then(function(jsonResponse) {
    $.each(jsonResponse, function(i, item) {
      var company = new Company(
        jsonResponse[i]._id,
        jsonResponse[i].name,
        jsonResponse[i].CIF,
        jsonResponse[i].email,
        jsonResponse[i].__v,
        jsonResponse[i].logoURL,
        jsonResponse[i].bio,
        jsonResponse[i].employees,
        jsonResponse[i].phone,
        jsonResponse[i].address,
        jsonResponse[i].website,
        jsonResponse[i].registeredDate
      );
      companies.addCompany(company);

      // console.log("jsonResponse[i]._id :", jsonResponse[i]._id);
    });

    // console.log("companies.companies :", companies.companies);
    // companies.renderTable(companies.companies);
    // companies.renderCompanyCards();
    //companies.searchAdvanced();

    $(window).on("resize", function() {
      let width = $(this).width();

      const companyContainer = $(".main-container-companies");
      const tableBodyCompanies = companyContainer.find("#company-table tbody");
      let cardDiv = $("#card-container-company");

      if (width > 868) {
        companies.renderCompaniesTable(companies.companies);
        // console.log('table :', companies.companies);
      } else {
        companies.renderCompanyCards();
        console.log("cards? :");
      }
    });
  });

function showPreviewInfo(id) {
  console.log("entra? :");
  var company = companies.getCompanyById(id);

  $("#modal-company").html(
    `<div class="shadow-lg p-3 col-lg col-sm  col-md  rounded"   data-id=${
      company.id
    } >
        <div class="card-header rounded  text-dark d-flex header-card flex-row align-items-center">
           <img class="img-fluid mr-2 rounded-circle" src=${
             company.logoURL
           } width=120px height:50px  alt="test"/>
           <div class="  ml-4 ">
              <h5 class=" font-weight-bold modal-title">
                 <p>${company.name}</p>
                 <p> CIF ${company.CIF}</p>
              </h5>
           </div>
        </div>
        <div class="text-dark">
           <div class=" text-dark  mt-3 h5">
              <h5 class=" rounded text-dark font-weight-bold ">Email</h5>
              <h6><a class=" ldeep-purple " href="mailto${company.email}">${
      company.email
    }</a></h6>
           </div>
           <div class="text-dark  h5 ">
              <h5 class="  text-dark rounded font-weight-bold">Profile </h5>
              <h6 class=" ldeep-purple ">${company.bio}</h6>
           </div>
           <div class="text-dark  h5 ">
              <h5 class="  text-dark rounded font-weight-bold">Website</h5>
              <h6 class=" ldeep-purple ">${company.website}</h6>
           </div>
           <div  class="text-dark  h5 ">
              <h5 class="  header-card text-dark rounded font-weight-bold">Phone</h5>
              <h6 class=" ldeep-purple ">${company.phone}</h6>
           </div>
           <div class="text-dark  h5">
              <h5 class="  header-card text-dark rounded font-weight-bold ">Numbers of employees</h5>
              <h6 class=" ldeep-purple ">${company.employees}</h6>
           </div>
           <div class="text-dark  h5 ">
              <h5 class=" header-card text-dark rounded font-weight-bold " >Address</h5>
              <h6 class=" ldeep-purple ">${company.address.country} ~ ${
      company.address.city
    } ${company.address.street} / ${company.address.zipcode}
              </h6>
           </div>
           <div class=" modal-footer">
              <button type="button" class="btn  btn-ldeep-purple text-light" data-dismiss="modal">Close</button>
           </div>
        </div> `
  );
}

function removeCompanyFromDOM(id) {
  fetch(`https://cv-mobile-api.herokuapp.com/api/company/${id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      window.location.reload();
    });
}

// Advanced search for companies form
function advancedSearchCompanies(event) {
  event.preventDefault();
  $("#alertNoCompanyFound").remove();
  let inputCompanyName = $("#company-name")
    .val()
    .toLowerCase();
  let inputCif = $("#company-cif")
    .val()
    .toLowerCase();
  let inputEmployees = $("#company-employees")
    .val()
    .toLowerCase();
  let inputBio = $("#company-bio")
    .val()
    .toLowerCase();
  let inputCity = $("#company-city")
    .val()
    .toLowerCase();
  let inputEmail = $("#company-email")
    .val()
    .toLowerCase();
  let inputCountry = $("#company-country")
    .val()
    .toLowerCase();
  var badgesContainer = $(".search-badges-company").empty();
  let formCompanyes = $("#advanced-search");
  let inputs = formCompanyes.find("input");
  var filteredCompanies = [];

  filteredCompanies = companies.companies.filter(company => {
    return company.name.toLowerCase().includes(inputCompanyName);
  });
  filteredCompanies = filteredCompanies.filter(company => {
    return company.CIF.toString()
      .toLowerCase()
      .includes(inputCif);
  });
  filteredCompanies = filteredCompanies.filter(company => {
    return company.employees.toString().includes(inputEmployees);
  });
  filteredCompanies = filteredCompanies.filter(company => {
    return company.bio.toString().includes(inputBio);
  });

  filteredCompanies = filteredCompanies.filter(company => {
    return company.address.city.toLowerCase().includes(inputCity);
  });
  filteredCompanies = filteredCompanies.filter(company => {
    return company.email.toLowerCase().includes(inputEmail);
  });
  filteredCompanies = filteredCompanies.filter(company => {
    return company.address.country.toLowerCase().includes(inputCountry);
  });
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.toString().trim().length > 0) {
      console.log("inputs[i] :", inputs[i]);
      const badgeCompany = $(
        `<span class="badge ml-3 badge-pill badge-secondary filter mr-2">${
          inputs[i].name
        }: <span>${
          inputs[i].value
        }</span><button id="badgeButton" class="bg-transparent border-0"><i class="far text-danger ml-2 fa-times-circle"></i></button></span>`
      ).hide();
      badgesContainer.append(badgeCompany);
      badgeCompany.show("slow");
      badgeCompany.off("click").on("click", function(event) {
        event.preventDefault();
        badgeCompany.remove();
        inputs[i].value = "";
        $("#alertNoCompanyFound").remove();
        companies.renderCompaniesTable(companies.companies);
      });
    }
  }
  if (filteredCompanies.length == 0) {
    $("#company-table").append(
      `<div id="alertNoCompanyFound" class="alert alert-danger" role="alert">No companies found</div>`
    );
  }
  console.log("filteredCompanies :", filteredCompanies);
  companies.renderCompaniesTable(filteredCompanies);
}
