function Companies() {
    this.construct = function(container) {
        $.get("../../html/CompaniesTable.html", htmlSkeleton => {
            container.empty().append(htmlSkeleton);
            this.renderCompaniesTable(this.companies);
            // this.renderCompanyCards();
        }).fail(function(err) {
            throw new Error(err);
        });
    };
    this.companies = [];
    this.addCompany = function(company) {
        this.companies.push(company);
    };
    this.renderCompaniesTable = function(filtredCompanies) {
        // $("#tableBody").html(" ");
        $("#card-container-company").hide();
        $("#company-table").show();
        let mainContainer = $("#company-table");
        // mainContainer.html("");
        let tableBody = "";
        console.log('filtredCompanies :', filtredCompanies);
        let width = $(window).width();
        for (var i = 0; i < filtredCompanies.length; i++) {
            tableBody += `<tr scope="row""  data-id=${filtredCompanies[i].id}><td class="company-logo text-center"><img class="img rounded-circle text-center  align-middle" src=${filtredCompanies[i].logo} style="width:50px;"/></td>
                <td class="company-name-table"><p>${filtredCompanies[i].name}</p></td>
                    <td class="company-email"> <a href="${filtredCompanies[i].email}" target="_blank" class=" btn-email btn-xs mr-2"><i class="fa fa-envelope"></i>
                    </a>${filtredCompanies[i].email}</td>
                    <td class="company-phone">${filtredCompanies[i].phone}</td>
                    <td class="company-social text-center">
        <div class="container">
            <div class="row d-flex justify-content-around ">
                <div class=" social-net" id="networks${filtredCompanies[i].id}">
                ${filtredCompanies[i].renderSocialNetworks()}
                </div>
            </div>
        </div>
                </td>
                <td class="options text-center">
                    <button  type="button" onclick="showPreviewInfo(${filtredCompanies[i].id})" data-toggle="modal" data-id=${filtredCompanies[i].id} data-target="#companyModal" title="View company"   class="btn  btn-sm  btn-outline-success preview-company " data-toggle="modal"><i class="far fa-eye"></i> </button>
                    <button type="button" rel="tooltip" title="Edit company"    class="btn btn-sm btn-outline-primary  edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
                    </button>
                    <button type="button" title="Delete company"  class="btn  remove-company  btn-sm  btn-outline-danger "  data-toggle="modal" data-id="${filtredCompanies[i].id}" data-target="#confirm-delete" onclick="removeCompanyFromDOM(${filtredCompanies[i].id})"><i class="fas fa-trash-alt"></i></button></td>
                </tr>`;
        }
        console.log('tableBody :', tableBody);
        $("#tableBody").html("");
        $("#tableBody").append(tableBody);
        // mainContainer.empty().html($("#tableBody").html());


    };
    this.getCompanyById = function(id) {
        var company = this.companies.filter(function(company) {
            return company.id == id;
        });
        return company[0];
    };

    this.renderCompanyCards = function() {
        // $(".main-container-companies").html(" ");
        $("#card-container-company").show();
        $("#company-table").hide();
        let mainContainer = $("#card-container-company");
        let companyCard = "";
        for (var i = 0; i < this.companies.length; i++) {
            companyCard += `
            <div class="card mt-3 shadow-lg p-3 ml-5 mr-5 mb-5 bg-white rounded"  data-id=${this.companies[i].id}>
              <div class="">
                <h5 class="card-header text-dark header-card  shadow-sm  col-sm-12 border  rounded"> <img class="card-img-top" src=${this.companies[i].logo} style="width:50px; alt="Card image cap">
                <p class="card-text">${this.companies[i].name}</p>  <small  class="text-dark font-weight-bold ">CIF ${this.companies[i].CIF}</small></h5>
                <p class="card-title font-weight-bold  mt-3  "><ins>Email</ins></p>
                <h1 class="card-text  badge badge-secondary  ">${this.companies[i].email}</h1>
                <p class="card-subtitle font-weight-bold  mt-3  ">employees Number</p>
                <h3 class="card-text badge badge-secondary "><ins>${this.companies[i].employeesNumber}</ins></h3>
                <p class="card-title font-weight-bold ">Phone</p>
                <h3 class="card-text badge badge-secondary  "><ins>${this.companies[i].phone}</ins></h3>
              </div>
              <p class="card-text font-weight-bold  mt-3">Social Networks</p>
              <div class=" social-net" id="networks${this.companies[i].id}">
              ${this.companies[i].renderSocialNetworks()}
              </div>
              <div class="card-footer  header-card   col-sm-12 mt-2 border  text-center rounded">
           
              <button type="button" rel="tooltip" title="Edit company"    class="btn btn-sm btn-outline-primary  edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
              </button>
              <button type="button" title="Delete company"  class="btn  remove-company  btn-sm  btn-outline-danger "  data-toggle="modal" data-id="${this.companies[i].id}" data-target="#confirm-delete" onclick="removeCompanyCardFromDOM(${this.companies[i].id})"><i class="fas fa-trash-alt"></i></button></td>
              </div>
            </div>
            </div>
            </div>
          `;
        }

        mainContainer.empty().html(companyCard);
    };
}