function Companies() {
    this.construct = function(container) {
        $.get("../../html/CompaniesTable.html", htmlSkeleton => {
            container.empty().append(htmlSkeleton);
            getCompanyFromAPI();
            this.renderCompaniesTable(this.companies);
        }).fail(function(err) {
            throw new Error(err);
        });
    }
    this.companies = [];
    this.addCompany = function(company) {
        this.companies.push(company);
    };
    this.removeAllCompanies = function() {
        this.companies = [];
    }
    this.renderCompaniesTable = function(filtredCompanies) {
        $("#card-container-company").hide();
        $("#company-table").show();
        let tableBody = "";
        let width = $(window).width();
        for (var i = 0; i < filtredCompanies.length; i++) {
            tableBody += `<tr scope="row"  data-id=${filtredCompanies[i].id}>
          <td class="company-logo text-center"><img class="img rounded-circle text-center  align-middle" src=${filtredCompanies[i].logo} style="width:50px;"/></td>
          <td class="company-name-table">
             <p>${filtredCompanies[i].name}</p>
          </td>
          <td class="company-email"> <a href="${filtredCompanies[i].email}" target="_blank" class=" btn-email btn-xs mr-2"><i class="fa fa-envelope"></i>
             </a>${filtredCompanies[i].email}
          </td>
          <td class="company-phone">${filtredCompanies[i].phone}</td>
          <td class="company-social"> ${filtredCompanies[i].website}</td>
          <td class="options text-center">
             <button  type="button" onclick="companies.showPreviewInfo('${filtredCompanies[i].id}');" data-toggle="modal" data-id=${filtredCompanies[i].id} data-target="#companyModal" title="View company"   class="btn  btn-sm  btn-outline-success preview-company" data-toggle="modal"><i class="far fa-eye"></i> </button>
             <button type="button" rel="tooltip" title="Edit company" id="editCompanyForm"    class="btn btn-sm btn-outline-primary  edit-company"  onclick="companies.editCompany('${filtredCompanies[i].id}');" data-original-title=""  )><i class="fas fa-user-edit"></i>
             </button>
             <button type="button" title="Delete company"  class="btn  btn-sm  btn-outline-danger deleteNow " data-id="${filtredCompanies[i].id}"  onclick="companies.modalDelete('${filtredCompanies[i].id}')"><i class="fas fa-trash-alt"></i></button>
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
          <div class="card card-company mt-3 shadow-lg p-3 ml-5 mr-2 mb-5 bg-white rounded"  data-id=${this.companies[i].id}>
           <div class="">
             <div class="d-flex rounded  card-header   p-3">
                <div class=""> <img class="card-img-top rounded-circle" src=${this.companies[i].logo} style="width:50px; alt="Card logo company"></div>
                <div  class="col-lg-6">
                   <h5 class="card-text  font-weight-bold text-dark">${this.companies[i].name}</h5>
                   <p  class="text-dark font-weight-bold ">${this.companies[i].docType}</p>
                   <p  class="text-dark font-weight-bold "> ${this.companies[i].docNumber}</p>
                </div>
             </div>
             <div class="">
                <div class="d-inline-flex col-12 .col-sm-6 .col-lg-8 mt-3">
                   <p class="card-title col d-inline-flex font-weight-bold">Email</ins></p>
                   <p class="card-text col-sm-6   text-right ldeep-purple"><ins>${this.companies[i].email}</ins></p>
                </div>
                <div class="d-inline-flex col-12 .col-sm-6 .col-lg-8  mt-3">
                   <p class="card-subtitle font-weight-bold d-inline-flex col  ">Employees</p>
                   <p class="card-text  text-right  col-sm-6 ldeep-purple"><ins>${this.companies[i].employees}</ins></p>
                </div>
                <div class="d-inline-flex  col  mt-3">
                   <p class="card-title col d-inline-flex  font-weight-bold ">Phone</p>
                   <p class="card-text text-right  col-sm-8  ldeep-purple"><ins>${this.companies[i].phone}</ins></p>
                </div>
                <div class="d-inline-flex  col  mt-3">
                   <p class="card-text col d-inline-flex font-weight-bold mb-1">Social Networks</p>
                   <div class="mt-2 text-right  col-sm-6 social-net">${this.companies[i].website}
                   </div>
                </div>
             </div>
    
          <div class="card-footer  header-card   col-sm-12 mt-2 border  text-right rounded">
             <button type="button" rel="tooltip" title="Edit company"    class="btn btn-sm btn-outline-primary  edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
             </button>
             <button type="button" title="Delete company"  class="btn  remove-company  btn-sm  btn-outline-danger "  data-toggle="modal"  data-id="${this.companies[i].id}"  onclick="companies.modalDelete('${this.companies[i].id}')"><i class="fas fa-trash-alt"></i></button></td>
          </div>
       </div>
       </div>
     
        `;
        }
        mainContainerCompanies.empty().html(companyCard);
    };
    this.showPreviewInfo = function(id) {
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
    this.editCompany = function(id) {
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


    this.removeCompanyFromDOM = function(id) {
        fetch(`https://cv-mobile-api.herokuapp.com/api/companies/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(response => {})
            .then(response => {
                // setTimeout(function() { window.location.reload(); }, 2000);
            });
    }
    this.modalDelete = function(id) {
        if (window.confirm("Are you sure to delete this company?")) {
            this.removeCompanyFromDOM(id);
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

    this.advancedSearchCompanies = function(event) {
        event.preventDefault();
        $("#alertNoCompanyFound").remove();
        var badgesContainer = $(".search-badges-company").empty();
        //   $("input[name=docType]").attr('checked', false);
        let inputCompanyName = $("#company-name").val().toLowerCase();
        // let inputdocNumber = $("#docNumber").val().toLowerCase();
        let docType = $("input[name=docType]:checked").val();
        let radioButtons = $("input[name=docType]");
        let docNumber = "";
        if (docType == "nif") {
            docNumber = $("input[name=docNumberNif]").val();
        } else if (docType == "cif") {
            docNumber = $("input[name=docNumberCif]").val();
        }
        let inputEmployees = $("#company-employees").val().toLowerCase();
        let inputBio = $("#company-bio").val().toLowerCase();
        let inputCity = $("#company-city").val().toLowerCase();
        let inputEmail = $("#company-email").val().toLowerCase();
        let inputCountry = $("#company-country").val().toLowerCase();
        let formCompanyes = $("#advanced-search-companies");
        let inputs = formCompanyes.find("input");
        var filteredCompanies = [];
        filteredCompanies = companies.companies.filter((company) => {
            return (company.name.toLowerCase().includes(inputCompanyName));
        });
        // filteredCompanies = filteredCompanies.filter((company) => {
        //     return (company.docType.toString().toLowerCase().includes(docType));
        // });
        filteredCompanies = filteredCompanies.filter((company) => {
            return (company.docNumber.toString().toLowerCase().includes(docNumber));
        });
        filteredCompanies = filteredCompanies.filter((company) => {
            return (company.employees.toString().includes(inputEmployees));
        });
        filteredCompanies = filteredCompanies.filter((company) => {
            return (company.bio.toString().includes(inputBio));
        });

        filteredCompanies = filteredCompanies.filter((company) => {
            return (company.address.city.toLowerCase().includes(inputCity));
        });
        filteredCompanies = filteredCompanies.filter((company) => {
            return (company.email.toLowerCase().includes(inputEmail));
        });
        filteredCompanies = filteredCompanies.filter((company) => {
            return (company.address.country.toLowerCase().includes(inputCountry));
        });
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "radio") {
                if (inputs[i].checked == true) {
                    const badgeCompany = $(`<span class="badge p-2 ml-3 badge-pill  text-white ldeep-purple badge-secondary filter mr-2">${inputs[i].name}: <span>${inputs[i].value}</span><button id="badgeButton" class="bg-transparent border-0"><i class="far text-danger ml-2 fa-times-circle"></i></button></span>`).hide();
                    badgeCompany.fadeIn("slow");
                    badgeCompany.off("click").on("click", function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        badgeCompany.remove();
                        $(inputs[i]).prop('checked', false);
                        $("#submit_search-companies").trigger("click");
                        $(".alertCompanyFound").remove();
                    });
                    badgesContainer.append(badgeCompany);
                }
            } else if ((inputs[i].type == "text" || inputs[i].type == "number") && inputs[i].value.toString().trim().length > 0) {
                const badgeCompany = $(`<span class="badge p-2 ml-3 badge-pill  text-white ldeep-purple badge-secondary filter mr-2">${inputs[i].name}: <span>${inputs[i].value}</span><button id="badgeButton" class="bg-transparent border-0"><i class="far text-danger ml-2 fa-times-circle"></i></button></span>`).hide();
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
            $("#company-table").append(`<div  class="alert alertCompanyFound m-3 alert-danger" role="alert">No companies found</div>`);
        } else {
            badgesContainer.append(`<div class="alert mt-3 alertCompanyFound m-3 alert-success" role="alert"> We have found ${filteredCompanies.length} results</div>`);
        }
        companies.renderCompaniesTable(filteredCompanies);
    }






}