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
        });
        companies.renderTable();
        // companies.buttonOpciones();
    })
    .fail(function(jqXHR) {
        if (jqXHR.statusText !== "OK") {
            console.log("[ERROR]: on loading json.");
        }
    });
// working ??