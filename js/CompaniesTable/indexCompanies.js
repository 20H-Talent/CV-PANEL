var companies = new Companies();
$.getJSON("../data/companies.json")
    .done(function(data) {
        $.each(data, function(i, item) {
            var company = new Company(
                data[i].id,
                data[i].name,
                data[i].CIF,
                data[i].email,
                data[i].socialnetworks,
                data[i].logo,
                data[i].descripcion,
                data[i].employeesNumber,
                data[i].phone,
                data[i].address,
                data[i].socialnetworks
            );
            companies.addCompany(company);
        });
        console.log('companies.companies :', companies.companies);
        // companies.renderTable(companies.companies);
        // companies.renderCompanyCards();
        //companies.searchAdvanced();

        $(window).on("resize", function() {
            let width = $(this).width();

            const mainContainer = $(".main-container-companies");
            const tableBody = mainContainer.find("#company-table tbody");
            let cardDiv = $("#card-container-company");

            if (width > 868) {
                companies.renderCompaniesTable(companies.companies);
                console.log('companies.companies :', companies.companies);
            } else {
                companies.renderCompanyCards();
                console.log('cards? :');
            }
        });
    })
    .fail(function(jqXHR) {
        if (jqXHR.statusText !== "OK") {
            console.log("[ERROR]: on loading json Companies.");
        }
    });

function showPreviewInfo(id) {
    var company = companies.getCompanyById(id);
    $("#modal").html(
        `<div class="shadow-lg p-3 col-lg col-sm  col-md  rounded"   data-id=${
      company.id
    } >
        <div class="card-header d-flex header-card flex-row align-items-center">
            <img class="img-fluid mr-2 rounded-circle" src=${
              company.logo
            } width=120px height:50px  alt="test"/>
            <div class=" ml-4">
                <h4 class="modal-title">
                <p>${company.name}</p>
                <p> CIF ${company.CIF}</p>
                </h4>
            </div>
        </div>
        <div class="text-dark">
            <div class=" text-dark text-center mt-3 h5"><h5 class="text-center rounded text-dark font-weight-bold ">Email</h5><h4><a class="text-white badge badge-secondary text-center" href="mailto${
              company.email
            }">${company.email}</a></h4>
        </div>
            <div class="text-dark text-center h5 "><h5 class="text-center  text-dark rounded font-weight-bold ">Profile </h5>
            <h4 class="text-white badge badge-secondary text-center">${company.descripcion}</h4>
        </div>
        <div class="text-dark text-center h5 "><h5 class="text-center  text-dark rounded font-weight-bold  ">Social Networks </h5>
        <div class="col-md-12 badge  text-center " id="networks${company.id}">
        ${company.renderSocialNetworks()}
    </div>
    </div>
            <div  class="text-dark text-center h5 "><h5 class="text-center  header-card text-dark rounded font-weight-bold ">Phone</h5>
            <h4 class="text-white badge badge-secondary text-center">${company.phone}</h4>
        </div>
            <div class="text-dark text-center h5"><h5 class=" text-center header-card text-dark rounded font-weight-bold ">Numbers of employees</h5>
            <h4 class="text-white badge badge-secondary text-center">${company.employeesNumber}</h4>
        </div>
            <div class="text-dark text-center h5 "><h5 class="text-center header-card text-dark rounded font-weight-bold " >Address</h5>
            <h4 class="text-white badge badge-secondary text-center">${company.address.country} ~ ${company.address.city} ${
      company.address.street
    } / ${company.address.zipcode}</h4>
        </div>
            <div class="card-footer   header-card text-right"></div>
    </div> `
    );
}

function removeCompanyFromDOM(id) {
    var company = companies.getCompanyById(id);
    const mainContainer = $(".main-container-companies");
    const tableBody = mainContainer.find("#company-table tbody");
    mainContainer.on("click", "button.delete-company", function(e) {
        if (tableBody.children("tr").length > 0) {
            var findTr = tableBody.find(`tr[data-id=${company.id}]`);
            findTr.remove();
        }
    });
}
// Advanced search for companies
function searchAdvancedComapanies(event) {
    event.preventDefault();
    // 
    let inputCompanyName = $("#company-name").val().toLowerCase();
    let inputCif = $("#company-cif").val().toLowerCase();
    let inputemployees = $("#company-employees").val().toLowerCase();
    let inputBio = $("#company-bio").val().toLowerCase();
    let inputCity = $("#company-city").val().toLowerCase();
    let inputEmail = $("#company-email").val().toLowerCase();
    let inputCountry = $("#company-country").val().toLowerCase();
    var mainContainer = $("#main");
    var filtersContainer = mainContainer.find("#search");
    var badgesContainer = $(".search-badges-company").empty();
    let formCompanyes = $("#advanced-search");
    let inputs = formCompanyes.find("input");
    var filteredCompanies = [];
    filteredCompanies = companies.companies.filter((company) => {
        return (company.name.toLowerCase().includes(inputCompanyName));
    });
    filteredCompanies = filteredCompanies.filter((company) => {
        return (company.CIF.toLowerCase().includes(inputCif));
    });
    filteredCompanies = filteredCompanies.filter((company) => {
        return (company.employeesNumber.toString().includes(inputemployees));
    });
    filteredCompanies = filteredCompanies.filter((company) => {
        return (company.email.toLowerCase().includes(inputEmail));
    });
    filteredCompanies = filteredCompanies.filter((company) => {
        return (company.address.city.toLowerCase().includes(inputCity));
    });
    filteredCompanies = filteredCompanies.filter((company) => {
        return (company.address.country.toLowerCase().includes(inputCountry));
    });
    // $("#submit_search").on("click", function(e)
    let divNavBar = document.querySelector("#div-navbar-companies");
    let pdivNavBar = document.querySelector("#div-navbar p");
    let alertClose = document.querySelector(".alert-close");
    badgesContainer.empty();
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.toString().trim().length > 0) {
            console.log('inputs[i] :', inputs[i]);
            const badgeCompany = $(`<span class="badge ml-3 badge-pill badge-secondary filter mr-2">${inputs[i].name}: <span>${inputs[i].value}</span><button id="badgeButton" class="bg-transparent border-0 deletion"><i class="far text-light ml-2 fa-times-circle"></i></button></span>`).hide();
            badgesContainer.append(badgeCompany);
            badgeCompany.show("slow");
            badgeCompany.off("click").on("click", function(event) {
                event.preventDefault();
                badgeCompany.remove();
                inputs[i].value = "";
                companies.renderCompaniesTable(companies.companies);
            });
        }
    }
    companies.renderCompaniesTable(filteredCompanies);
}