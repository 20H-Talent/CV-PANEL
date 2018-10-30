// $(document).ready(function() {
//     $("#list-companies").click(function() {
//         //let mainRight = $("#right-menu-ajax").empty();
//         $("#search-company").load("../html/searchCompanyTable.html", function() {
//             let mainRight = $("#right-menu-ajax").empty();
//             //  mainRight = $("#right-menu-ajax").empty().append(this);

//         });
//     });
// });




$(document).ready(function() {
    $("#list-companies").click(function() {
        $.ajax({
            url: "../html/searchCompanyTable.html",
            dataType: "html",
            success: function(data) {
                console.log('data :', data);
                let mainRight = $("#right-menu-ajax").empty().append(data);

                console.log('data :', data);
            }
        });
    });
});