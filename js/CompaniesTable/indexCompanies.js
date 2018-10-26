var companies = new Companies();
$.getJSON("../data/companies.json")
    .done(function(data) {
        console.log('data :', data);
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

        companies.renderTable();
        companies.renderCompanyCards();

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
        `<div class="shadow-lg p-3 border col-lg col-sm  col-md  rounded"   data-id=${
      company.id
    } >
        <div class="card-header d-flex header-card flex-row align-items-center">
            <img class="img-fluid mr-2 rounded-circle" src=${
              company.logo
            } width=120px height:60px  alt="test"/>
            <div class=" ml-4 text-light">
                <h4 class="modal-title">
                <p>${company.name}</p>
                <p> CIF ${company.CIF}</p>
                </h4>
            </div>
        </div>
        <div class="text-light">
            <div class=" text-dark text-center mt-3 h6"><h6 class="  text-center rounded  header-card text-white">Email</h6><p><a class="text-dark text-center" href="mailto${
              company.email
            }">${company.email}</a></p>
        </div>
            <div class="text-dark text-center h6 "><h6 class="  text-center header-card text-white rounded ">Profile </h6>
            <p>${company.descripcion}</p>
        </div>
        <div class="text-dark text-center h6 "><h6 class="  text-center header-card text-white rounded ">Social Networks </h6>
        <div class="col-md-12 text-center " id="networks${company.id}">
        ${company.renderSocialNetworks()}
    </div>
    </div>
            <div  class="text-dark text-center h6 "><h6 class="text-center header-card text-white rounded">Phone</h6>
            <p>${company.phone}</p>
        </div>
            <div class="text-dark text-center h6"><h6 class=" text-center header-card text-white rounded">Numbers of workers</h6>
            <p>${company.workersNumber}</p>
        </div>
            <div class="text-dark text-center h6 "><h6 class="  text-center header-card text-white rounded" >Address</h6>
            <p>${company.address.country} ~ ${company.address.city} ${
      company.address.street
    } / ${company.address.zipcode}</p>
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