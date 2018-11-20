var companies = new Companies();

function getCompanyFromAPI() {
  generalConstructor.construct("companies-table");
  $.getJSON("https://cv-mobile-api.herokuapp.com/api/companies").done(function(
    data
  ) {
    $.each(data, function(i, item) {
      var company = new Company(
        data[i]._id,
        data[i].name,
        data[i].docType,
        data[i].docNumber,
        data[i].email,
        data[i].website,
        data[i].address,
        data[i].socialUrls,
        data[i].logo,
        data[i].bio,
        data[i].employees,
        data[i].phone,
        data[i].registeredDate,
        data[i].jobOffers
      );
      companies.addCompany(company);
    });
    companies.renderCompaniesTable(companies.companies);
    $(window).on("resize", function() {
      let width = $(this).width();
      const companyContainer = $(".main-container-companies");
      const tableBodyCompanies = companyContainer.find("#company-table tbody");
      let cardDiv = $("#card-container-company");
      if (width > 868) {
        companies.renderCompaniesTable(companies.companies);
        console.log("companies.companies :", companies.companies);
      } else {
        companies.renderCompanyCards();
      }
    });
  });
}
/*********************************************************************
 * Showing short info about company when clicking the preview
 * button on the table company
 *********************************************************************/
function showPreviewInfo(id) {
  var company = companies.getCompanyById(id);

  $("#modal-company").html(
    `<div class="shadow-lg p-3 col-lg col-sm  col-md  rounded"   data-id=${
      company.id
    } >
        <div class="card-header rounded  text-dark d-flex header-card flex-row align-items-center">
           <img class="img-fluid mr-2 rounded-circle" src=${
             company.logo
           } width=120px height:50px  alt="test"/>
           <div class="  ml-4 ">
              <h5 class=" font-weight-bold modal-title">
                 <p>${company.name}</p>
                 <p  class="text-dark font-weight-bold ">${company.docType}</p>
                 <p> ${company.docNumber}</p>
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
              <h5 class="  text-dark rounded font-weight-bold">Bio</h5>
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
  fetch(`https://cv-mobile-api.herokuapp.com/api/companies/${id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(response => {})
    .then(response => {
      // setTimeout(function() { window.location.reload(); }, 2000);
    });
}
/***********************************
 * Confirm the delete of a company
 * in desktop and mobile
 ***********************************/
function modalDelete(id) {
  if (window.confirm("Are you sure to delete this company?")) {
    removeCompanyFromDOM(id);
    const mainContainer = $("#companyTable");
    const tableBody = mainContainer.find("#company-table #tableBody");
    const cardCompany = mainContainer.find("#card-container-company");
    if (tableBody.children("tr").length > 0) {
      tableBody.find(`tr[data-id=${id}]`).remove();
    }
    if (cardCompany.children(".card").length > 0) {
      cardCompany.find(`.card-company[data-id=${id}]`).remove();
    }
  }
  if (cardCompany.children(".card").length > 0) {
    cardCompany.find(`.card-company[data-id=${id}]`).remove();
  }
}

function editCompany(id) {
  generalConstructor.construct("enterprises-form");
  setTimeout(() => {
    var company = companies.getCompanyById(id);
    $("input[name=company-id]").val(id);
    $("input[name=country]").val(company.address.country);
    document.querySelector(`input[value=${company.docType}]`).checked = true;
    if (company.docType == "nif") {
      $("input[name=docNumberNif]").val(company.docNumber);
      $("#nif").show();
      $("#cif").hide();
    } else {
      $("input[name=docNumberCif]").val(company.docNumber);
      $("#cif").show();
      $("#nif").hide();
    }
    // $("input[name=docNumber]").val(company.docNumber);
    $("input[name=street]").val(company.address.street);
    $("input[name=city]").val(company.address.city);
    $("input[name=zipcode]").val(company.address.zipcode);
    //  let address = { "country": country, "street": street, "city": city, "zipcode": zipcode }
    $("input[name=name]").val(company.name);
    $("input[name=employees]").val(company.employees);
    $("input[name=email]").val(company.email);
    $("input[name=website]").val(company.website);
    $("textarea[name=bio]").val(company.bio);
    $("input[name=socialUrls]").val(company.socialUrls.socialUrls);
    $("input[name=phone]").val(company.phone);
    //  var img = "<img src='" + company.logo + "'>";
    // let logo = document.getElementById('logo').files[0];
    //  $("#logo").html(img);
  }, 200);
}
// Advanced search for companies form
function advancedSearchCompanies(event) {
  event.preventDefault();
  $("#alertNoCompanyFound").remove();
  var badgesContainer = $(".search-badges-company").empty();
  //   $("input[name=docType]").attr('checked', false);
  let inputCompanyName = $("#company-name")
    .val()
    .toLowerCase();
  // let inputdocNumber = $("#docNumber").val().toLowerCase();
  let docType = $("input[name=docType]:checked").val();
  let radioButtons = $("input[name=docType]");
  let docNumber = "";
  if (docType == "nif") {
    docNumber = $("input[name=docNumberNif]").val();
  } else if (docType == "cif") {
    docNumber = $("input[name=docNumberCif]").val();
  }
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
  let formCompanyes = $("#advanced-search-companies");
  let inputs = formCompanyes.find("input");
  var filteredCompanies = [];
  filteredCompanies = companies.companies.filter(company => {
    return company.name.toLowerCase().includes(inputCompanyName);
  });
  // filteredCompanies = filteredCompanies.filter((company) => {
  //     return (company.docType.toString().toLowerCase().includes(docType));
  // });
  filteredCompanies = filteredCompanies.filter(company => {
    return company.docNumber
      .toString()
      .toLowerCase()
      .includes(docNumber);
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
    if (inputs[i].type == "radio") {
      if (inputs[i].checked == true) {
        const badgeCompany = $(
          `<span class="badge p-2 ml-3 badge-pill  text-white ldeep-purple badge-secondary filter mr-2">${
            inputs[i].name
          }: <span>${
            inputs[i].value
          }</span><button id="badgeButton" class="bg-transparent border-0"><i class="far text-danger ml-2 fa-times-circle"></i></button></span>`
        ).hide();
        badgeCompany.fadeIn("slow");
        badgeCompany.off("click").on("click", function(event) {
          event.preventDefault();
          event.stopPropagation();
          badgeCompany.remove();
          $(inputs[i]).prop("checked", false);
          $("#submit_search-companies").trigger("click");
          $(".alertCompanyFound").remove();
        });
        badgesContainer.append(badgeCompany);
      }
    } else if (
      (inputs[i].type == "text" || inputs[i].type == "number") &&
      inputs[i].value.toString().trim().length > 0
    ) {
      const badgeCompany = $(
        `<span class="badge p-2 ml-3 badge-pill  text-white ldeep-purple badge-secondary filter mr-2">${
          inputs[i].name
        }: <span>${
          inputs[i].value
        }</span><button id="badgeButton" class="bg-transparent border-0"><i class="far text-danger ml-2 fa-times-circle"></i></button></span>`
      ).hide();
      badgeCompany.fadeIn("slow");
      badgeCompany.off("click").on("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        badgeCompany.remove();
        inputs[i].value = "";
        $("#submit_search-companies").trigger("click");
        $(".alertCompanyFound").remove();
      });
      badgesContainer.append(badgeCompany);
    }
  }
  if (filteredCompanies.length == 0) {
    $("#company-table").append(
      `<div  class="alert alertCompanyFound m-3 alert-danger" role="alert">No companies found</div>`
    );
  } else {
    badgesContainer.append(
      `<div class="alert mt-3 alertCompanyFound m-3 alert-success" role="alert"> We have found ${
        filteredCompanies.length
      } results</div>`
    );
  }
  companies.renderCompaniesTable(filteredCompanies);
}
