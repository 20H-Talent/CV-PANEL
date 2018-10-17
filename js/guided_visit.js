// ------- Load the modal welcome ---------
$.get("../html/guided_visit.html", function(data) {
  $("body").append(data);

  // ------- Inicialize the events for button Skip and Start ---------
  $(".btn-secondary").on("click", function() {
    document.querySelector("#guidedVisit").remove();
  });
});
// $("#guidedVisit .btn-secondary").trigger();
