 //function loads with ajax the html section of search advanced company and puts it in the menu right on click, (replacing) empting the section of users search advanced
 $(document).ready(function() {
     $("#list-companies").click(function() {
         $.get("../html/searchCompaniesForm.html")
             .done(function(data) {
                 $("#right-menu-ajax").empty().append(data);
             }).fail(function(jqXHR) {
                 if (jqXHR.statusText !== "OK") {
                     console.log("[ERROR]: on loading json.");
                 }
             });;
     });
 });