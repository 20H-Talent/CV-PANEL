// ------- Load the modal welcome ---------
$.get("../html/guided_visit.html", function(data) {
  $("body").append(data);

  // ------- Inicialize the events for button Skip and Start ---------
  $("#guidedVisit button.btn-secondary").on("click", function() {
    document.querySelector("#guidedVisit").remove();
  });
  $("#guidedVisit button.btn-primary").on(
    "click",
    getTooltips
    // document.querySelector("#guidedVisit .modal-dialog.modal-dialog-centered").remove();

    //lhacer una funcion para los tooltips y llamarla desde este evento, que lo dispare.
    //load JSON tooltips.
  );
});
// $("#guidedVisit .btn-secondary").trigger();
function getTooltips() {
  $.getJSON("../data/tooltips_guided_visit.json")
    .done(function(data) {
      $.each(data, function(i) {
        console.log(data[i]);
        $(
          "#guidedVisit"
        ).html(`<div style='position: relative; border: 2px solid white; height: ${data[i].height}; width: ${data[i].width}; top: ${data[i].position.top}; left: ${data[i].position.left}; right: ${data[i].position.right}'></div><div class='tooltips-arrow top'></div><div class='bg-white tooltips p-3 w-50' data-toggle='tooltip'>
              ${
                data[i].text
              } <button id='nextTool' class='badge badge-pill'>Next <i class='fas fa-arrow-right'></i></button>
              </div>
              `);
        $("#nextTool").on("click", function() {
          $("#guidedVisit").html("");
        });
      });
      //console.log(data);

      // me falta organizar el json para la posicion del primer div(el del borde)
      // y poner la posicion del tooltip(segundo div).

      // cuando click en next llamar al siguiente.
    })
    .fail(function(jqXHR) {
      if (jqXHR.statusText !== "OK") {
        console.log("[ERROR]: on loading json.");
      }
    });
}
