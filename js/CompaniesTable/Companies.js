function Companies() {
    this.construct = function(container) {
        $.get("../../html/CompaniesTable.html", htmlSkeleton => {
            container.empty().append(htmlSkeleton);
            this.renderTable();
            this.renderCompanyCards();
        }).fail(function(err) {
            throw new Error(err);
        });
    };
    this.companies = [];
    this.addCompany = function(company) {
        this.companies.push(company);
    };
    this.renderTable = function() {
        let width = $(window).width();
        for (var i = 0; i < this.companies.length; i++) {
            // mainContainer.empty();
            $("#tableBody").append(`<tr scope="row""  data-id=${this.companies[i].id}>
            <td class="company-logo text-center"><img class="img rounded-circle text-center  align-middle" src=${
              this.companies[i].logo
            } style="width:50px;"/></td>
                <td class="fullname"><p>${this.companies[i].name}</p></td>
                    <td class="company-email"> <a href="${
                      this.companies[i].email
                    }" target="_blank" class=" btn-email btn-xs mr-2"><i class="fa fa-envelope"></i></a>${
        this.companies[i].email
      }</td>
                    <td class="company-phone">${this.companies[i].phone}</td>
                    <td class="company-social text-center">
        <div class="container">
            <div class="row d-flex justify-content-around ">
                <div class=" social-net" id="networks${this.companies[i].id}">
                ${this.companies[i].renderSocialNetworks()}
                </div>
            </div>
        </div>
                </td>
                <td class="options text-center">
                    <button  type="button" onclick="showPreviewInfo(${
                      this.companies[i].id
                    })" data-toggle="modal" data-id=${
        this.companies[i].id
      } data-target="#companyModal" title="View company"   class="btn  btn-sm  btn-outline-info preview-company " data-toggle="modal"><i class="far fa-eye"></i> </button>
                    <button type="button" rel="tooltip" title="Edit company"    class="btn btn-sm btn-outline-primary  edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
                    </button>

                    <button type="button" title="Delete company"  class="btn  remove-company  btn-sm  btn-outline-danger "  data-toggle="modal" data-id=${
                      this.companies[i].id
                    } data-target="#confirm-delete" onclick="removeCompanyFromDOM(${
        this.companies[i].id
      })"><i class="fas fa-trash-alt"></i></button></td>
                </tr>`);
        }
    };
    this.getCompanyById = function(id) {
        var company = this.companies.filter(function(company) {
            return company.id == id;
        });
        return company[0];
    };

    this.renderCompanyCards = function() {
        let mainContainer = $(".main-container-companies");
        let cardCompanyContainer = $("#card-container-company");
        let innerCard = "";
        for (var i = 0; i < this.companies.length; i++) {
            let width = $(window).width();
            innerCard += `
            <div class="card mt-3 shadow-lg p-3 mb-5 bg-white rounded  ml-5 mr-5 text-center"  data-id=${
              this.companies[i].id
            }>
              <div class="">
                <h5 class="card-header text-light header-card   col-sm-12 border border-dark rounded"> <img class="card-img-top" src=${
                  this.companies[i].logo
                }   style="width:50px; alt="Card image cap">
                <p class="card-text">${
                  this.companies[i].name
                }</p>  <small class="text-light"> CIF  ${
        this.companies[i].CIF
      }</small></h5>
                <h5 class="card-title mt-3  ">Email</h5>
                <p class="card-text  "><ins>${this.companies[i].email}</ins></p>
                <h5 class="card-title">Profile</h5>
                <p class="card-text"><ins>${
                  this.companies[i].descripcion
                }</ins></p>
                <h5 class="card-title">Phone</h5>
                <p class="card-text"><ins>${this.companies[i].phone}</ins></p>
              </div>
              <h5 class="card-text mt-3">Social Networks</h5>
              <div class=" social-net" id="networks${this.companies[i].id}">
              ${this.companies[i].renderSocialNetworks()}
              </div>
              <div class="card-footer text-light header-card   col-sm-12 mt-2 border border-dark rounded">

                    <button type="button" rel="tooltip" title="Edit company"    class="btn btn-sm btn-outline-light text-white edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
                    </button>
                    <button type="button" title="Delete company"  class="btn  remove-company  btn-sm  btn-outline-light"  data-toggle="modal" data-id=${
                      this.companies[i].id
                    } data-target="#confirm-delete" onclick="removeCompanyFromDOM(${
        this.companies[i].id
      })"><i class="fas fa-trash-alt"></i></button></td>
              </div>
            </div>
            </div>
            </div>
          `;
        }

        cardCompanyContainer.html(innerCard);
    };
}