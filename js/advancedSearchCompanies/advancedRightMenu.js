//This
//function loads with ajax the html section of search advanced company and puts it in the menu right on click, (replacing) empting the section of users search advanced

//var counter = 0;
//loading the right menu of searching companies
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
// function advancedSearch() {

//     let inputComapany = $("#company-name").val().toLowerCase();
//     console.log('inputComapany :', inputComapany);
//     let inputCif = $("#company-cif").val().toLowerCase();
//     let inputWorkers = $("#company-employees").val().toLowerCase();
//     console.log('inputWorkers :', inputWorkers);
//     let inputBio = $("#company-bio").val().toLowerCase();
//     console.log('inputBio :', inputBio);
//     let inputCity = $("#company-city").val().toLowerCase();
//     let inputEmail = $("#company-email").val().toLowerCase();
//     let inputCountry = $("#company-country").val().toLowerCase();
//     counter = counter + 1;
//     var mainContainer = $("#main");
//     var filtersContainer = mainContainer.find(".filters");
//     console.log('filtersContainer :', filtersContainer);
//     var badgesContainer = $(".search-badges");

//     $("#company-name").on("keyup", function() {
//         var value = $(this).val().toLowerCase();
//         $(".company-name-table").filter(function() {
//             if ($(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)) {
//                 var badge = $(
//                     `<span id ="spanBadge${counter}" class="badge badge-pill badge-secondary filter mr-2"${$(this)}: <span>ana</span></span>`
//                 ).hide();
//                 badgesContainer.append(badge)
//                 badge.show("slow");
//                 console.log('badge :', badge.get());
//                 console.log('object :', $(this).get());
//             }
//         });
//     });
//     $("#company-cif").on("keyup", function() {
//         var value = $(this).val().toLowerCase();
//         console.log('value :', value);
//         $("#companyTable tr ").filter(function() {
//             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//         });
//     });
//     $("#company-workers").on("keyup", function() {
//         var value = $(this).val().toLowerCase();
//         $("#companyTable tr").filter(function() {
//             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//         });
//     });
// }




// function myFunction() {
//     $("#company-name").on("keyup", function() {
//         var value = $(this).val().toLowerCase();
//         $("#companyTable tr").filter(function() {
//             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//         });
//     });
// };
// // (".search-badges");
// let $input = $(input);
// console.log('input :', input);
// // filters[$input.prop("name")] = $input.val();