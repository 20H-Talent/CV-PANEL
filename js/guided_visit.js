// ------- Load the modal welcome ---------
$.get("../html/guided_visit.html", function(data) {
  $("body main").append(data);

  // ------- Inicialize the events for button Skip and Start ---------
  $("#guidedVisit button.btn-secondary").on("click", function() {
    $("#guidedVisit").remove();
  });
  $("#guidedVisit button.btn-primary").on("click", getTooltips);
});

// function to get from JSON, the tooltips objects.
function getTooltips() {
  $.getJSON("../data/tooltips_guided_visit.json")
    .done(function(data) {
      // clear modal body to insert tooltips.
      $("#guidedVisit").html("");

      // make skeleton of tooltips.
      $.each(data, function(i) {
        $(
          "#guidedVisit"
        ).append(`<div class="d-none tool-${data[i].id}" style='position: relative; border: 2px solid white; height: ${data[i].elPositionSelected.height}; width: ${data[i].elPositionSelected.width}; top: ${data[i].elPositionSelected.top}; left: ${data[i].elPositionSelected.left}; right: ${data[i].elPositionSelected.right}; bottom: ${data[i].elPositionSelected.bottom}'></div><i style= 'position:absolute; font-size: 19px; top:${data[i].arrowPosition.top}; left: ${data[i].arrowPosition.left};' class="d-none tool-${data[i].id} fas fa-arrow-${data[i].arrowPosition.icon} text-white"></i><div style='position: absolute; top: ${data[i].tooltipPosition.top}; left: ${data[i].tooltipPosition.left}; right: ${data[i].tooltipPosition.right}; bottom: ${data[i].tooltipPosition.bottom}; width: 36%; height: 14%;' class='d-none tool-${data[i].id} bg-white tooltips p-3 rounded' data-toggle='tooltip'>
                
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
        if ($(e.currentTarget).attr("data-tool")) {
          callTools($(e.currentTarget).attr("data-tool"));
        }

        if (parseInt($(e.currentTarget).attr("data-tool")) === data.length) {
          $("#guidedVisit").remove();
        }
      });
      function callTools(valDataTool) {
        //recive de data-toogle value of the active button of tooltips.

        let activeTool = $(`.tool-${parseInt(valDataTool)}`); //convert valDataTool string to number and select the elements with class .tool-valDataTool.

        $.each(activeTool, function(a) {
          activeTool[a].classList.replace("d-block", "d-none");
        });

        let nextTool = $(`.tool-${parseInt(valDataTool) + 1}`);

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

// llamar con triguers entre ellos y pasarle el parametro de display.
