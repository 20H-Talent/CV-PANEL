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
                data[i].workersNumber,
                data[i].phone,
                data[i].address,
                data[i].socialnetworks
            );
            companies.addCompany(company);
        });
        console.log('companies.companies :', companies.companies);
        companies.renderTable(companies.companies);

        companies.renderCompanyCards();
        //companies.searchAdvanced();

        $(window).on("resize", function() {
            let width = $(this).width();

            const mainContainer = $(".main-container-companies");
            const tableBody = mainContainer.find("#company-table tbody");
            let cardDiv = $("#card-container-company");

            if (width > 868) {
                mainContainer.show();
                cardDiv.hide();
            } else {
                mainContainer.hide();
                cardDiv.show();
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
            <div class="text-dark text-center h5"><h5 class=" text-center header-card text-dark rounded font-weight-bold ">Numbers of workers</h5>
            <h4 class="text-white badge badge-secondary text-center">${company.workersNumber}</h4>
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

function searchAdvanced(event) {

    //   $("#submit_search").on("click", function(e) {
    // event.stopPropagation();
    event.preventDefault();
    $("input[name=company-name]").val();
    $("input[name=company-cif]").val();
    $("input[name=company-employees]").val();
    $("input[name=company-bio]").val();
    $("input[name=company-city]").val();
    $("input[name=company-email]").val();
    $("input[name=company-country]").val();
    let inputComapany = $("#company-name").val().toLowerCase();
    console.log('inputComapany :', inputComapany);
    let inputCif = $("#company-cif").val().toLowerCase();
    let inputWorkers = $("#company-employees").val().toLowerCase();
    console.log('inputWorkers :', inputWorkers);
    let inputBio = $("#company-bio").val().toLowerCase();
    console.log('inputBio :', inputBio);
    let inputCity = $("#company-city").val().toLowerCase();
    let inputEmail = $("#company-email").val().toLowerCase();
    let inputCountry = $("#company-country").val().toLowerCase();
    counter = counter + 1;
    var mainContainer = $("#main");
    var filtersContainer = mainContainer.find(".filters");
    console.log('filtersContainer :', filtersContainer.get());
    var badgesContainer = $(".search-badges").empty();
    let formCompanyes = $("advanced-search");
    let inputs = formCompanyes.find("input");
    inputsval = inputs.val();
    //$("input[name=email]")
    //var spans = `<span class="badge badge-info mr-2 badge-font">${inputs.name}<button class="bg-transparent border-0 deletion"><i class="fas fa-times-circle"></i></button></span>`;
    console.log('${inputs.name} :', inputs.name);

    var filtredComapanies = companies.companies.filter((company) => {
        console.log(' companies.companies :', companies.companies);
        console.log('company.name.toLowerCase().includes(inputComapany):', company.name.toLowerCase().includes(inputComapany));

        if ((company.name.toLowerCase().includes(inputComapany)) &&
            (company.CIF.toLowerCase().includes(inputCif)) &&
            (company.email.toLowerCase().includes(inputEmail)) &&
            (company.address.city.toLowerCase().includes(inputCity)) &&
            (company.address.country.toLowerCase().includes(inputCountry))) {

            const resetButton = badgesContainer.append(`<span class="badge badge-info mr-2 badge-font">${company.name}<button onclick="closeNavbar()" class="bg-transparent border-0 deletion" id="badgeButton"><i class="fas fa-times-circle"></i></button></span>`);
            resetButton.off("click").on("click", function() {
                // inputComapany.trigger("click");
                badgesContainer.empty();
                badgesContainer.map(badge => badge.remove());
                //  $(this).remove();
            });

        }




        return filtredComapanies;

    });

    // $("badgeButton").on("click", function() {

    // })
    // const filtersContainer = $(".filters");
    // const badgeContainer = filtersContainer.children(".search-badges");

    // filtersContainer.find("button").remove();
    // badgeContainer.empty();
    // companies.renderTable(filtredComapanies);


    console.log('filtredComapanies :', filtredComapanies);
    // })
}





// (company.CIF.toLowerCase().includes(inputCif)) &&
// (company.email.toLowerCase().includes(inputEmail)) &&
// (company.address.city.toLowerCase().includes(inputCity)) &&
// (company.address.country.toLowerCase().includes(inputCountry));



// (company.name.toLowerCase().includes(inputComapany))
// (company.CIF.toLowerCase().includes(inputCif)) &&
// (company.email.toLowerCase().includes(inputEmail)) &&
// (company.address.city.toLowerCase().includes(inputCity)) &&
// (company.address.country.toLowerCase().includes(inputCountry))