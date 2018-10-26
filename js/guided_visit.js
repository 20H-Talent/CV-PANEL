var currentDataTool = 0;
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
        // <div class="d-none tool-${data[i].id}" style='position: relative; border: 2px solid white; height: ${data[i].elPositionSelected.height}; width: ${data[i].elPositionSelected.width}; top: ${data[i].elPositionSelected.top}; left: ${data[i].elPositionSelected.left}; right: ${data[i].elPositionSelected.right}; bottom: ${data[i].elPositionSelected.bottom}'></div>
        $("#guidedVisit").append(`
       
          <i style='position:absolute; font-size: 19px; top:${
            data[i].arrowPosition.top
          }; left: ${data[i].arrowPosition.left};' class="d-none tool-${data[i].id} fas fa-arrow-${data[i].arrowPosition.icon} text-white"></i>
          <div style='position: absolute; top: ${
            data[i].tooltipPosition.top
          }; left: ${data[i].tooltipPosition.left}; right: ${data[i].tooltipPosition.right}; bottom: ${data[i].tooltipPosition.bottom}; width: 36%; height: ${data[i].tooltipPosition.height};' class='d-none tool-${data[i].id} bg-white tooltips p-3 rounded' data-toggle='tooltip'>
          <span class='badge badge-danger' style='position: absolute; top: 3%; left:1%; font-size: 0.6rem'>${
            data[i].badgeTool
          }</span> ${data[i].text} <button class='btn-tool badge badge-pill' data-tool= ${data[i].id}>Next <i class='fas fa-arrow-right'></i></button>
        </div>`);
      });
      //make the div on final of #guidedVisit
      $("#guidedVisit").append(`<div></div>`);

      // llamando al primer tool ...
      let tool1 = $(".tool-0");
      $.each(tool1, function(u) {
        tool1[u].classList.replace("d-none", "d-block");
      });

      //llamamos trigger del tooltip 1
      $(listUsers).trigger("click");

      $(".btn-tool").on("click", function(e) {
        if ($(e.currentTarget).attr("data-tool")) {
          //call event to close of data[0].
          console.log("active tool:", $(e.currentTarget).attr("data-tool"));
          // $(data[0].eventCallToClose).trigger("click");

          callTools($(e.currentTarget).attr("data-tool"));
        }
      });

      function callTools(valDataTool) {
        //recive de data-toogle value of the active button of tooltips.
        console.log("id:", data[parseInt(valDataTool)].id);
        let activeTool = $(`.tool-${parseInt(valDataTool)}`); //convert valDataTool string to number and select the elements with class .tool-valDataTool.

        if (!data[parseInt(valDataTool)]) {
          //id data[valDataTool] not exist, remove the modal.
          return $("#guidedVisit").remove();
        }

        // call event to close of227 active tooltip.
        // $(data[parseInt(valDataTool)].eventCallToOpen).trigger("click");

        $.each(activeTool, function(a) {
          activeTool[a].classList.replace("d-block", "d-none");
        });

        let nextTool = $(`.tool-${parseInt(valDataTool) + 1}`);

        $(data[parseInt(valDataTool)].eventCallToOpen).trigger(
          data[parseInt(valDataTool)].eventCallToClose
        );
        console.log(
          "Trigger que se ejecuta: ",
          $(data[parseInt(valDataTool)].eventCallToOpen)
        );
        console.log(
          "Segundo parametro del trigger: ",
          data[parseInt(valDataTool)].eventCallToClose
        );

        $.each(nextTool, function(n) {
          nextTool[n].classList.replace("d-none", "d-block");
        });
        currentDataTool++;
      }
      $(window).on("keypress", function(e) {
        if (e.keyCode === 32) {
          callTools(currentDataTool);
        }
      });
    })
    .fail(function(jqXHR) {
      if (jqXHR.statusText !== "OK") {
        console.log("[ERROR]: on loading json.");
      }
    });
}
