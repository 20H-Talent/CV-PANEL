var companies = new Companies();

function Companies() {
  this.construct = function(container) {
    $.get("../../html/CompaniesTable.html", htmlSkeleton => {
      container.empty().append(htmlSkeleton);
      companies.removeAllCompanies();
      companies.getCompanyFromAPI();
      this.renderCompaniesTable(this.companies);
      $("#confirm-delete-card").on("show.bs.modal", function(event) {
        let button = $(event.relatedTarget);
        let companyId = button.data("id");
        let modal = $(this);
        modal
          .find(" button.delete-company")
          .off("click")
          .on("click", function() {
            //   $("#confirm-delete ").on("click", modalDelete(id));
            companies.removeCompanyFromDOM(companyId);
            const mainContainer = $("#companyTable");
            const tableBody = mainContainer.find("#company-table #tableBody");
            const cardCompany = mainContainer.find("#card-container-company");
            if (tableBody.children("tr").length > 0) {
              tableBody.find(`tr[data-id=${companyId}]`).remove();
            }
            if (cardCompany.children(".card").length > 0) {
              cardCompany.find(`.card-company[data-id=${companyId}]`).remove();
              //   window.location.replace("/index.html");
            }
          });
      });
    }).fail(function(err) {
      throw new Error(err);
    });
  };
  this.getCompanyFromAPI = function() {
    generalConstructor.construct("companies-table");
    $.getJSON("https://cv-mobile-api.herokuapp.com/api/companies").done(
      function(data) {
        $.each(data, function(i, comp) {
          var company = new Company(
            comp._id,
            comp.name,
            comp.docType,
            comp.docNumber,
            comp.email,
            comp.website,
            comp.address,
            comp.socialUrls,
            comp.logo,
            comp.bio,
            comp.employees,
            comp.phone,
            comp.registeredDate,
            comp.jobOffers
          );
          companies.addCompany(company);
        });
        companies.renderCompaniesTable(companies.companies);
        $(window)
          .off("resize")
          .on("resize", function() {
            let width = $(this).width();
            const companyContainer = $(".main-container-companies");
            const tableBodyCompanies = companyContainer.find(
              "#company-table tbody"
            );
            let cardDiv = $("#card-container-company");
            if (width > 868 && $("#company-table").css("display") === "none") {
              companies.renderCompaniesTable(companies.companies);
            } else if (
              width < 868 &&
              $("#card-container-company").css("display") === "none"
            ) {
              companies.renderCompanyCards();
            }
          });
      }
    );
  };
  this.companies = [];
  this.addCompany = function(company) {
    this.companies.push(company);
  };
  this.removeAllCompanies = function() {
    this.companies = [];
  };
  this.renderCompaniesTable = function(filtredCompanies) {
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
          <td class="company-country">${
            filtredCompanies[i].address.country
          }</td>
          <td class="company-social text-center">
          <div class="container">
              <div class="row d-flex justify-content-around ">
                  <div class=" social-net" id="networks${
                    filtredCompanies[i].id
                  }">
                  ${companies.renderSocialNetworks(
                    filtredCompanies[i].socialUrls
                  )}
                  </div>
              </div>
          </div>
                  </td>
          <td class="options text-center">
             <button  type="button" onclick="companies.showPreviewInfo('${
               filtredCompanies[i].id
             }');" data-toggle="modal" data-id=${
        filtredCompanies[i].id
      } data-target="#companyModal" title="View company"   class="btn  btn-sm  btn-outline-success preview-company" data-toggle="modal"><i class="far fa-eye"></i> </button>
             <button type="button" rel="tooltip" title="Edit company" id="editCompanyForm"    class="btn btn-sm btn-outline-primary  edit-company"  onclick="companies.editCompany('${
               filtredCompanies[i].id
             }');" data-original-title=""  )><i class="fas fa-user-edit"></i>
             </button>
             <button type="button" title="Delete company"   class="btn  remove-company  btn-sm  btn-outline-danger "  data-toggle="modal" data-id=${
               filtredCompanies[i].id
             } data-target="#confirm-delete-card"><i class="fas fa-trash-alt"></i></button>
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
  this.renderSocialNetworks = function(socialUrls) {
    var divCol = document.createElement("div");
    divCol.classList.add("text-center");
    let innerNetwork = "";
    for (let social in socialUrls) {
      //innerNetwork += `<div>${socialUrls[social].url}/ ${socialUrls[social].platform}</div>`;
      innerNetwork += `<a href="${socialUrls[social].url}" title="${
        socialUrls[social].platform
      }"><i style="z-index: 10;" class="fab ml-1 btn-${
        socialUrls[social].platform
      }   fa-lg fa-${socialUrls[social].platform}"></i></a>`;
    }
    divCol.innerHTML = innerNetwork;
    return divCol.innerHTML;
  };
  this.renderCompanyCards = function() {
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
                   <p class="card-text col d-inline-flex font-weight-bold mb-1">Website</p>
                   <div class="mt-2 text-right  col-sm-6 social-net">${
                     this.companies[i].website
                   }
                   </div>
                </div>
             </div>

          <div class="card-footer  header-card   col-sm-12 mt-2 border  text-right rounded">
             <button type="button" rel="tooltip" title="Edit company"    class="btn btn-sm btn-outline-primary  edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
             </button>
             <button type="button" title="Delete company" onclick="companies.modalDelete('${
               this.companies[i].id
             }')"  class="btn  remove-company  btn-sm  btn-outline-danger "  data-toggle="modal" data-id=${
        this.companies[i].id
      } data-target="#confirm-delete-card"><i class="fas fa-trash-alt"></i></button>
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
                   <p  class="text-dark font-weight-bold ">${
                     company.docType
                   }</p>
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
  };
  this.editCompany = function(id) {
    generalConstructor.construct("enterprises-form");
    setTimeout(() => {
      var company = companies.getCompanyById(id);
      if ($("form#alert-form-enterprises").find("input[type=hidden]").length) {
        $("#alert-form-enterprises")
          .find(`h1[class='format-1']`)
          .html(
            `<i class="fas fa-user-edit"></i> Editing company <span class='text-success'>${
              company.name
            }</span>`
          );
      }
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

      $("input[name=platform]").val(company.socialUrls.platform);
      $("input[name=url]").val(company.socialUrls.url);
      $("input[name=street]").val(company.address.street);
      $("input[name=city]").val(company.address.city);
      $("input[name=zipcode]").val(company.address.zipcode);
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
  };
  this.removeCompanyFromDOM = function(id) {
    fetch(`https://cv-mobile-api.herokuapp.com/api/companies/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(response => {})
      .then(response => {
        // setTimeout(function() { window.location.reload(); }, 2000);
      });
  };
  this.inputsBadgesSearch = function() {
    let formCompanyes = $("#advanced-search-companies");
    let inputs = formCompanyes.find("input");
    var badgesContainer = $(".search-badges-company").empty();
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
  };

  this.advancedSearchCompanies = function(event) {
    event.preventDefault();
    $(".alertCompanyFound").remove();
    var badgesContainer = $(".search-badges-company").empty();
    let inputCompanyName = $("#company-name")
      .val()
      .toLowerCase();
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
    var filteredCompanies = [];
    filteredCompanies = companies.companies.filter(company => {
      return company.name.toLowerCase().includes(inputCompanyName);
    });
    if (docType) {
      filteredCompanies = filteredCompanies.filter(company => {
        return company.docType
          .toString()
          .toLowerCase()
          .includes(docType);
      });
    }

    filteredCompanies = filteredCompanies.filter(company => {
      return company.docNumber
        .toString()
        .toLowerCase()
        .includes(docNumber);
    });
    filteredCompanies = filteredCompanies.filter(company => {
      if (company.employees) {
        return company.employees.toString().includes(inputEmployees);
      } else {
        return true;
      }
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
    if (filteredCompanies.length == 0) {
      $("#company-table").append(
        `<div  class="alert alertCompanyFound m-3 alert-danger" role="alert">No companies found</div>`
      );
    } else {
      $("#company-table").append(
        `<div class="alert mt-3 alertCompanyFound m-3 alert-success" role="alert"> We have found ${
          filteredCompanies.length
        } results</div>`
      );
    }
    this.inputsBadgesSearch();
    companies.renderCompaniesTable(filteredCompanies);
  };

  /***********************************
   * Adding a new company to API
   ***********************************/
  this.sendNewCompanyToAPI = function() {
    let method = "POST";
    let urlApi = "https://cv-mobile-api.herokuapp.com/api/companies";
    let companyID = $("input[name=company-id]").val();
    if (companyID.length > 0) {
      method = "PUT";
      urlApi = "https://cv-mobile-api.herokuapp.com/api/companies/" + companyID;
    }
    let name = $("input[name=name]").val();
    let docType = $("input[name=docType]:checked").val();
    let docNumber = "";
    if (docType == "nif") {
      docNumber = $("input[name=docNumberNif]").val();
    } else {
      docNumber = $("input[name=docNumberCif]").val();
    }
    let country = $("input[name=country]").val();
    let zipcode = $("input[name=zipcode]").val();
    let city = $("input[name=city]").val();
    let street = $("input[name=street]").val();
    let platform = $("input[name=platform]").val();
    let url = $("input[name=url]").val();
    let address = {
      country: country,
      street: street,
      city: city,
      zipcode: zipcode
    };
    let socialUrls = [
      {
        platform: platform,
        url: url
      }
    ];
    let phone = $("input[name=phone]").val();
    let email = $("input[name=email]").val();
    let employees = $("input[name=employees]").val();
    let website = $("input[name=website]").val();
    let bio = $("textarea[name=bio]").val();

    let logo = $("input[type=file]")[0].files[0];
    //  socialUrls = $("input[name=socialUrls]").val();
    let newCompany = {
      name: `${name}`,
      docType: docType,
      docNumber: docNumber,
      email: email,
      address: address,
      bio: bio,
      employees: employees,
      phone: phone,
      website: website,
      socialUrls: socialUrls,
      jobOffers: []
    };
    fetch(urlApi, {
      method: method,
      body: JSON.stringify(newCompany),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.logo === null && logo !== undefined) {
          logoCompany = false;
        } else if (res.logo !== null && logo !== undefined) {
          logoCompany = false;
        } else if (res.logo !== null && logo === undefined) {
          logoCompany = true;
        } else if (res.logo !== null) {
          logoCompany = true;
        }

        if (!companyID) {
          sendCompanyID = res._id;
        } else {
          sendCompanyID = companyID;
        }

        if (logoCompany === false) {
          let formData = new FormData();
          formData.append("img", logo);
          fetch(
            `https://cv-mobile-api.herokuapp.com/api/files/upload/company/${sendCompanyID}`,
            {
              method: "POST",
              body: formData
            }
          )
            .then(response => {
              if (response) {
                if (window.confirm("Well done")) {
                  window.location.replace("/index.html");
                }
              }
            })
            .catch(res => console.log("Unable to upload image ", res));
        } else {
          if (res) {
            if (window.confirm("Well done")) {
              window.location.replace("/index.html");
            }
          }
        }
      })
      .catch(res => console.log("Unable create or update company: ", res));
  };
}
