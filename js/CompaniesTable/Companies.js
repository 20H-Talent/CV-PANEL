function Companies() {
  this.construct = function(container) {
    $.get("../../html/CompaniesTable.html", htmlSkeleton => {
      container.empty().append(htmlSkeleton);
      getCompanyFromAPI();
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
  this.removeAllCompanies = function() {
    this.companies = [];
  };
  this.renderCompaniesTable = function(filtredCompanies) {
    // $("#tableBody").html(" ");

    $("#card-container-company").hide();
    $("#company-table").show();
    let tableBody = "";
    let width = $(window).width();
    for (var i = 0; i < filtredCompanies.length; i++) {
      tableBody += `<tr scope="row"  data-id=${filtredCompanies[i].id}>
          <td class="company-logo text-center"><img class="img rounded-circle text-center  align-middle" src=${
            filtredCompanies[i].logo
          } style="width:50px;"/></td>
          <td class="company-name-table">
             <p>${filtredCompanies[i].name}</p>
          </td>
          <td class="company-email"> <a href="${
            filtredCompanies[i].email
          }" target="_blank" class=" btn-email btn-xs mr-2"><i class="fa fa-envelope"></i>
             </a>${filtredCompanies[i].email}
          </td>
          <td class="company-phone">${filtredCompanies[i].phone}</td>
          <td class="company-social"> ${filtredCompanies[i].website}</td>
          <td class="options text-center">
             <button  type="button" onclick="showPreviewInfo('${
               filtredCompanies[i].id
             }');" data-toggle="modal" data-id=${
        filtredCompanies[i].id
      } data-target="#companyModal" title="View company"   class="btn  btn-sm  btn-outline-success preview-company" data-toggle="modal"><i class="far fa-eye"></i> </button>
             <button type="button" rel="tooltip" title="Edit company" id="editCompanyForm"    class="btn btn-sm btn-outline-primary  edit-company"  onclick="editCompany('${
               filtredCompanies[i].id
             }');" data-original-title=""  )><i class="fas fa-user-edit"></i>
             </button>
             <button type="button" title="Delete company"  class="btn  btn-sm  btn-outline-danger deleteNow " data-id="${
               filtredCompanies[i].id
             }"  onclick="modalDelete('${
        filtredCompanies[i].id
      }')"><i class="fas fa-trash-alt"></i></button>
          </td>
       </tr>`;
    }
    $("#tableBody").html("");
    $("#tableBody").append(tableBody);
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
    let mainContainerCompanies = $("#card-container-company");
    let companyCard = "";
    for (var i = 0; i < this.companies.length; i++) {
      companyCard += `
          <div class="card card-company mt-3 shadow-lg p-3 ml-5 mr-2 mb-5 bg-white rounded"  data-id=${
            this.companies[i].id
          }>
           <div class="">
             <div class="d-flex rounded  card-header   p-3">
                <div class=""> <img class="card-img-top rounded-circle" src=${
                  this.companies[i].logo
                } style="width:50px; alt="Card logo company"></div>
                <div  class="col-lg-6">
                   <h5 class="card-text  font-weight-bold text-dark">${
                     this.companies[i].name
                   }</h5>
                   <p  class="text-dark font-weight-bold ">${
                     this.companies[i].docType
                   }</p>
                   <p  class="text-dark font-weight-bold "> ${
                     this.companies[i].docNumber
                   }</p>
                </div>
             </div>
             <div class="">
                <div class="d-inline-flex col-12 .col-sm-6 .col-lg-8 mt-3">
                   <p class="card-title col d-inline-flex font-weight-bold">Email</ins></p>
                   <p class="card-text col-sm-6   text-right ldeep-purple"><ins>${
                     this.companies[i].email
                   }</ins></p>
                </div>
                <div class="d-inline-flex col-12 .col-sm-6 .col-lg-8  mt-3">
                   <p class="card-subtitle font-weight-bold d-inline-flex col  ">Employees</p>
                   <p class="card-text  text-right  col-sm-6 ldeep-purple"><ins>${
                     this.companies[i].employees
                   }</ins></p>
                </div>
                <div class="d-inline-flex  col  mt-3">
                   <p class="card-title col d-inline-flex  font-weight-bold ">Phone</p>
                   <p class="card-text text-right  col-sm-8  ldeep-purple"><ins>${
                     this.companies[i].phone
                   }</ins></p>
                </div>
                <div class="d-inline-flex  col  mt-3">
                   <p class="card-text col d-inline-flex font-weight-bold mb-1">Social Networks</p>
                   <div class="mt-2 text-right  col-sm-6 social-net">${
                     this.companies[i].website
                   }
                   </div>
                </div>
             </div>
    
          <div class="card-footer  header-card   col-sm-12 mt-2 border  text-right rounded">
             <button type="button" rel="tooltip" title="Edit company"    class="btn btn-sm btn-outline-primary  edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
             </button>
             <button type="button" title="Delete company"  class="btn  remove-company  btn-sm  btn-outline-danger "  data-toggle="modal"  data-id="${
               this.companies[i].id
             }"  onclick="modalDelete('${
        this.companies[i].id
      }')"><i class="fas fa-trash-alt"></i></button></td>
          </div>
       </div>
       </div>
      
        `;
    }

    mainContainerCompanies.empty().html(companyCard);
  };
}
