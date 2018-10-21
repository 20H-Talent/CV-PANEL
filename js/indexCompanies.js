//   $(".delete").click(function() {
//     var id = $(this).data("uid");
//     $("#del").click(function() {
//       if (id == 1) {
//         $("#d1").html("");
//       } else if (id == 2) {
//         $("#d2").html("");
//       }
//     });
//   });
var companies = new Companies();
$.getJSON("../data/companies.json")
    .done(function(data) {
        $.each(data, function(i, item) {
            var comp1 = new Company(
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
            companies.addCompany(comp1);
            console.log('comp1 :', comp1);
        });
        companies.renderTable();

        //companies.getCompanyByiD();
        // companies.showInfo();
    })
    .fail(function(jqXHR) {
        if (jqXHR.statusText !== "OK") {
            console.log("[ERROR]: on loading json.");
        }
    });


function showInfo(id) {
    var company = companies.getCompanyById(id);
    $("#modal").html(
        `<div class="shadow-lg p-3 border border-info  rounded"   data-id=${company.id} >
        <div class="card-header d-flex bg-info flex-row align-items-center">
            <img class="img-fluid mr-2 rounded-circle" src=${company.logo} width=120px height:60px  alt="test"/>
            <div class=" ml-4 text-light">
                <h4 class="modal-title">                     
                <p>${company.name}</p>
                <p> CIF ${company.CIF}</p>
                </h4>
            </div>
        </div> 
        <div class="text-light">
            <div class=" text-dark text-center mt-3 h6"><h5 class="  text-center badge-info rounded  text-white">Email</h5><p><a class="text-dark text-center" href="mailto${company.email}">${company.email}</a></p>
        </div>
            <div class="text-dark text-center h6 "><h5 class="  text-center badge-info text-white rounded ">Profile </h5>
            <p>${company.descripcion}</p> 
        </div>
            <div  class="text-dark text-center h6 "><h5 class="text-center badge-info text-white rounded">Phone</h5>
            <p>${company.phone}</p> 
        </div>
            <div class="text-dark text-center h6"><h5 class=" text-center badge-info text-white rounded">Numbers of workers</h5>
            <p>${company.workersNumber}</p> 
        </div>
            <div class="text-dark text-center h6 "><h5 class="  text-center badge-info text-white rounded" >Address</h5>
            <p>${company.address.country} ~ ${company.address.city} ${company.address.street} / ${company.address.zipcode}</p>
        </div>
            <div class="card-footer  bg-info text-right"></div>
    </div> `);
};