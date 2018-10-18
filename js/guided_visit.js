// ------- Load the modal welcome ---------
$.get("../html/guided_visit.html", function(data) {
  $("body main").append(data);

  // ------- Inicialize the events for button Skip and Start ---------
  $("#guidedVisit button.btn-secondary").on("click", function() {
    // document.querySelector("#guidedVisit").remove();
    $("#guidedVisit").remove();
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
      //console.log(data);
      // me falta organizar el json para la posicion del primer div(el del borde)
      // y poner la posicion del tooltip(segundo div).
      // cuando click en next llamar al siguiente.

      // clear modal body to insert tooltips.
      $("#guidedVisit").html("");

      // make skeleton of tooltips.
      $.each(data, function(i) {
        $(
          "#guidedVisit"
        ).append(`<div class="d-none tool-${data[i].id}" style='position: relative; border: 2px solid white; height: ${data[i].elPositionSelected.height}; width: ${data[i].elPositionSelected.width}; top: ${data[i].elPositionSelected.top}; left: ${data[i].elPositionSelected.left}; right: ${data[i].elPositionSelected.right}; bottom: ${data[i].elPositionSelected.bottom}'></div><div class='d-none tool-${data[i].id} tooltips-arrow top'></div><div style='position: absolute; top: ${data[i].tooltipPosition.top}; left: ${data[i].tooltipPosition.left}; right: ${data[i].tooltipPosition.right}; bottom: ${data[i].tooltipPosition.bottom}; width: 36%; height: 14%;' class='d-none tool-${data[i].id} bg-white tooltips p-3 rounded' data-toggle='tooltip'>
                
        <span class='badge badge-danger' style='position: absolute; top: 3%; left:1%; font-size: 0.6rem'>${
          data[i].id
        }</span> ${data[i].text} <button class='btn-tool badge badge-pill' data-tool= ${data[i].id}>Next <i class='fas fa-arrow-right'></i></button>
        </div>`);
      });

      // llamando al primer tool ...
      let tool1 = $(".tool-1");
      $.each(tool1, function(u) {
        tool1[u].classList.replace("d-none", "d-block");
      });
      $(".btn-tool").on("click", function(e) {
        // console.log(e.currentTarget.offsetParent);
        // console.log(e.currentTarget);
        // let activeTool = e.currentTarget;
        // console.log($(activeTool).attr("data-tool"));
        if ($(e.currentTarget).attr("data-tool")) {
          callTools($(e.currentTarget).attr("data-tool"));
        }

        // $(`.tool-${activeTool}`)
      });
      function callTools(valDataTool) {
        //recive de data-toogle value of the active button of tooltips.
        // console.log(valDataTool);
        // valDataTool.classList.replace("d-block", "d-none");

        // string to number parseInt()
        //numer to string num.toString()

        let activeTool = $(`.tool-${parseInt(valDataTool)}`); //convert valDataTool string to number and select the elements with class .tool-valDataTool.

        $.each(activeTool, function(a) {
          activeTool[a].classList.replace("d-block", "d-none");
        });
        let nextTool = $(`.tool-${parseInt(valDataTool) + 1}`);
        // console.log(nextTool);
        $.each(nextTool, function(n) {
          nextTool[n].classList.replace("d-none", "d-block");
        });
      }
    })
    .fail(function(jqXHR) {
      if (jqXHR.statusText !== "OK") {
        console.log("[ERROR]: on loading json.");
      }
    });
}
// crear funcion para el esqueleto de los tooltips, pasandole data y parametro para display
// $("#nextTool").on("click", function() {
//   $("#guidedVisit").html("");
// });
// $("#nextTool").on("click", setTimeout(makeTools(position + 1), 7000));

// llamar con triguers entre ellos y pasarle el parametro de display.
