// This function loads with ajax the html section of search advanced company and puts it in the  menu right on click,(replacing)empting the section of users search advanced
$(document).ready(function() {
    $("#list-companies").click(function() {
        $.ajax({
            url: "../html/searchCompanyTable.html",
            dataType: "html",
            success: function(data) {
                $("#right-menu-ajax").empty().append(data);
            }
        });
    });
});


function advancedSearch() {

    let mainContainer = $(".main-container");
    let filtersContainer = mainContainer.find(".filters");
    let badgesContainer = filtersContainer.children(".search-badges");
    $("#company-name").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#companyTable tr").filter(function() {
            if ($(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)) {
                let badge = $(
                    `<span class="badge badge-pill badge-secondary filter mr-2">${value}: <span>${value}</span></span>`
                ).hide();
                badgesContainer.append(badge);

            }
        });
    });
    $("#company-cif").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#companyTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#company-workers").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#companyTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}




// function myFunction() {
//     $("#company-name").on("keyup", function() {
//         var value = $(this).val().toLowerCase();
//         $("#companyTable tr").filter(function() {
//             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//         });
//     });
// };
// // (".search-badges");
// const $input = $(input);
// console.log('input :', input);
// // filters[$input.prop("name")] = $input.val();