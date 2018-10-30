// This function loads with ajax the html section of search advanced company and puts it in the  menu right on click,(replacing)empting the section of users search advanced
$(document).ready(function() {
    $("#open-icon-right").click(function() {
        $.ajax({
            url: "../html/searchCompanyTable.html",
            dataType: "html",
            success: function(data) {
                $("#right-menu-ajax").empty().append(data);
            }
        });
    });
});