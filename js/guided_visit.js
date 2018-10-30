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
        // <div class="d-none tool-${
        //   data[i].id
        // }" style='position: relative; border: 2px solid white; height: ${data[i].elPositionSelected.height}; width: ${data[i].elPositionSelected.width}; top: ${data[i].elPositionSelected.top}; left: ${data[i].elPositionSelected.left}; right: ${data[i].elPositionSelected.right}; bottom: ${data[i].elPositionSelected.bottom}'></div>
        $("#guidedVisit").append(`
          <i style='position:absolute; font-size: 19px; top:${
            data[i].arrowPosition.top
          }; left: ${data[i].arrowPosition.left};' class="d-none tool-${data[i].id} fas fa-arrow-${data[i].arrowPosition.icon} text-white"></i>
          <div style='position: absolute; top: ${
            data[i].tooltipPosition.top
          }; left: ${data[i].tooltipPosition.left}; right: ${data[i].tooltipPosition.right}; bottom: ${data[i].tooltipPosition.bottom}; width: ${data[i].tooltipPosition.width}; height: ${data[i].tooltipPosition.height};' class='d-none tool-${data[i].id} bg-white tooltips p-3 rounded' data-toggle='tooltip'>
          <span class='badge badge-danger' style='position: absolute; top: 5px; right:5px; font-size: 0.6rem'>${
            data[i].badgeTool
          }</span> 
          <h5 class="font-weight-bold mb-3" style='margin-top: -11px'>${
            data[i].title
          }</h5>
          <p>${data[i].text} </p>
          <button class='btn-tool badge badge-pill d-inline-flex' data-tool= ${
            data[i].id
          }>Next</button>
          <button class='btn-tool-skip badge badge-pill d-inline-flex' data-tool= ${
            data[i].id
          }>Skip</button>
        </div>
       
        `);
      });
      //make the div on final of #guidedVisit
      $("#guidedVisit").append(`<div id='elementSelected'></div>`);

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
      // if click on skip button on a tooltip, remove the modal.
      $(".btn-tool-skip").on("click", function(e) {
        console.log("Saltamos tutorial");
        $("#guidedVisit").remove();
      });

      function callTools(valDataTool) {
        //recive de data-toogle value of the active button of tooltips.
        console.log("id:", data[parseInt(valDataTool)].id);
        let activeTool = $(`.tool-${parseInt(valDataTool)}`); //convert valDataTool string to number and select the elements with class .tool-valDataTool.

        // if the valDataTool is equal to last data, remove the modal.
        if (parseInt(valDataTool) === 15) {
          return $("#guidedVisit").remove();
        }

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

        //cojo el tamaño y la posicion del elemento seleccionado.
        // function getDimensionsOfElementSelected() {
        //   let widthElementSelected = $(
        //     data[parseInt(valDataTool)].elSelected[0]
        //   ).width();
        //   let heightElmentSelected = $(
        //     data[parseInt(valDataTool)].elSelected[0]
        //   ).height();
        //   console.log(
        //     "[Width] Elemento seleccionado: ",
        //     data[parseInt(valDataTool)].elSelected[0],
        //     widthElementSelected
        //   );
        //   console.log("[Height] Elemento seleccionado: ", heightElmentSelected);
        //   let positionElementSelected = $(
        //     data[parseInt(valDataTool)].elSelected[0]
        //   ).position();
        //   console.log(
        //     "[Position] Elemento seleccionado: ",
        //     positionElementSelected
        //   );
        //   return $("#elementSelected").html(
        //     `<div style='position:relative; border: 1px solid red; width: ${widthElementSelected}px; height: ${heightElmentSelected}px; top: ${
        //       positionElementSelected.top
        //     }px; left: ${positionElementSelected.left}px;'></div>`
        //   );
        // }

        // setTimeout(getDimensionsOfElementSelected, 500);

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
