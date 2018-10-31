function Companies() {
    this.construct = function(container) {
        $.get("../../html/CompaniesTable.html", htmlSkeleton => {
            container.empty().append(htmlSkeleton);
            this.renderTable(this.companies);
            this.renderCompanyCards();
        }).fail(function(err) {
            throw new Error(err);
        });
    };
    this.companies = [];
    this.addCompany = function(company) {
        this.companies.push(company);
    };
    this.renderTable = function(filtredComapanies) {
        $("#tableBody").html(" ");
        console.log('filtredComapanies :', filtredComapanies);
        let width = $(window).width();
        for (var i = 0; i < filtredComapanies.length; i++) {
            // mainContainer.empty();
            $("#tableBody").append(`<tr scope="row""  data-id=${filtredComapanies[i].id}>
            <td class="company-logo text-center"><img class="img rounded-circle text-center  align-middle" src=${
              filtredComapanies[i].logo
            } style="width:50px;"/></td>
                <td class="company-name-table"><p>${filtredComapanies[i].name}</p></td>
                    <td class="company-email"> <a href="${
                      filtredComapanies[i].email
                    }" target="_blank" class=" btn-email btn-xs mr-2"><i class="fa fa-envelope"></i></a>${
                      filtredComapanies[i].email
      }</td>
                    <td class="company-phone">${filtredComapanies[i].phone}</td>
                    <td class="company-social text-center">
        <div class="container">
            <div class="row d-flex justify-content-around ">
                <div class=" social-net" id="networks${filtredComapanies[i].id}">
                ${filtredComapanies[i].renderSocialNetworks()}
                </div>
            </div>
        </div>
                </td>
                <td class="options text-center">
                    <button  type="button" onclick="showPreviewInfo(${
                      filtredComapanies[i].id
                    })" data-toggle="modal" data-id=${
                      filtredComapanies[i].id
      } data-target="#companyModal" title="View company"   class="btn  btn-sm  btn-outline-success preview-company " data-toggle="modal"><i class="far fa-eye"></i> </button>
                    <button type="button" rel="tooltip" title="Edit company"    class="btn btn-sm btn-outline-primary  edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
                    </button>

                    <button type="button" title="Delete company"  class="btn  remove-company  btn-sm  btn-outline-danger "  data-toggle="modal" data-id=${
                      filtredComapanies[i].id
                    } data-target="#confirm-delete" onclick="removeCompanyFromDOM(${
                      filtredComapanies[i].id
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
            <div class="card mt-3 shadow-lg p-3 mb-5 bg-white rounded  text-center"  data-id=${
              this.companies[i].id
            }>
              <div class="">
                <h5 class="card-header text-dark header-card shadow-sm  col-sm-12 border  rounded"> <img class="card-img-top" src=${
                  this.companies[i].logo
                }   style="width:50px; alt="Card image cap">
                <p class="card-text">${
                  this.companies[i].name
                }</p>  <small  class="text-dark font-weight-bold "> CIF  ${
        this.companies[i].CIF
      }</small></h5>
                <h5 class="card-title mt-3  ">Email</h5>
                <h1 class="card-text  badge badge-secondary  "><ins>${this.companies[i].email}</ins></h1>
                <h5 class="card-title">Profile</h5>
                <h3 class=" badge badge-secondary card-text">${
                  this.companies[i].descripcion
                }</h3>
                <h5 class="card-title mt-3  ">Workers Number</h5>
                <h3 class="card-text badge badge-secondary "><ins>${this.companies[i].workersNumber}</ins></h3>
                <h5 class="card-title">Phone</h5>
                <h3 class="card-text badge badge-secondary  "><ins>${this.companies[i].phone}</ins></h3>
              </div>
              <h5 class="card-text mt-3">Social Networks</h5>
              <div class=" social-net" id="networks${this.companies[i].id}">
              ${this.companies[i].renderSocialNetworks()}
              </div>
              <div class="card-footer  header-card   col-sm-12 mt-2 border  rounded">

                    <button type="button" rel="tooltip" title="Edit company"    class="btn btn-sm btn-outline-primary  edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
                    </button>
                    <button type="button" title="Delete company"  class="btn  remove-company  btn-sm  btn-outline-danger"  data-toggle="modal" data-id=${
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