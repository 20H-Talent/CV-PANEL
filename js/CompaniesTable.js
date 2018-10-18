//delete company button

function Comapany(view, edit, deleted) {
  this.view = view;
  this.edit = edit;
  this.deleted = deleted;

  function comapanies() {
    $.getJSON("../data/companies.json")
      .done(function(data) {
        console.log(data);
        $.each(data, function(i, item) {
          $("#tableBody").append(`<tr scope="row">
        <td class="company-logo user-avatar  pl-5">
              <img class="img text-center align-middle"  src=${
                item.logo
              }  style="width:50px; "  /></td>
              <td class="fullname">
                <p>${item.name}</p>
              </td>
              <td class="company-email">${item.email}</td>
              <td class="company-registered">${item.phone}</td> 
              <td class="company-city">${item.address.city}</td>
              <td class="company-registered">${item.descripcion}</td> 
              </td>
              <td class="options text-center">
              <button  type="button" class="btn btn-danger" data-toggle="modal" data-target="#ordine"><i class="far fa-eye"></i>
      </button>
              <button type="button" rel="tooltip" id="editForm" class="btn btn-outline-success btn-just-icon btn-sm" data-original-title="" title=""><i class="fas fa-user-edit"></i>
              </button>
                     <button type="button" class=" id="deleteCompany" my-2 btn btn-outline-danger btn-sm " data-toggle="modal" data-target="#delete" data-uid="2"><i class="far fa-trash-alt"></i></button>
                                
        </td>
            </tr>`);
        });
      })
      .fail(function(jqXHR) {
        if (jqXHR.statusText !== "OK") {
          console.log("[ERROR]: on loading json.");
        }
      });
  }

  function options() {
    $.each(this.data, function(i, item) {
      console.log("data", this.data);
      $("#modal").append(
        `<span${item.name} </span>
          <span${item.email} </span>
          <span${item.phone} </span>
          <span${item.address.city} </span>
          <span${item.descripcion} </span>`
      );
    });
  }

  $(".delete").click(function() {
    var id = $(this).data("uid");
    $("#del").click(function() {
      if (id == 1) {
        $("#d1").html("");
      } else if (id == 2) {
        $("#d2").html("");
      }
    });
  });

  options();
  comapanies();
}
var comapanies = new Comapany();
