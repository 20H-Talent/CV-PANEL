// $("#Div1").load("../html/guided_visit.html", function() {
//   $("#guidedVisit").trigger("focus");
// });
// $("#Div1").load("../html/guided_visit.html");

// ------- Load the modal welcome ---------
$.get("../html/guided_visit.html", function(data) {
  $("body").append(data);
});
