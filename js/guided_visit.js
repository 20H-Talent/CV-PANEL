/*papi capa para todo
div elemento z-index alto important relative
div encima del elemento z-index alto+1 absolute content-box rgba(blanco,.9)
*/

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
        <div class="d-none tool-${
          data[i].id
        }" style='position: relative; border: 2px solid white; height: ${data[i].elPositionSelected.height}; width: ${data[i].elPositionSelected.width}; top: ${data[i].elPositionSelected.top}; left: ${data[i].elPositionSelected.left}; right: ${data[i].elPositionSelected.right}; bottom: ${data[i].elPositionSelected.bottom}'></div>
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

      // llamando al primer tool ...
      let tool1 = $(".tool-0");
      $.each(tool1, function(u) {
        tool1[u].classList.replace("d-none", "d-block");
      });
      //selecionamos elemento header y ponemos overlay en los demas contenedores.
      // $(data[0].elSelected[0]).attr("style", function() {
      //   return `z-index:101 !important; position:${$(data[0].elSelected[1])};`;
      // });
      // $(data[0].elSelected).attr("position", function() {
      //   return `relative`;
      // });

      // $.each(data[0].overlayContent, function(o) {
      //   $(data[0].overlayContent[o]).append(`<div class="overlay"></div>`);
      // });

      //llamamos trigger del tooltip 1
      $(listUsers).trigger("click");

      $(".btn-tool").on("click", function(e) {
        if ($(e.currentTarget).attr("data-tool")) {
          //call event to close of data[0].
          console.log("active tool:", $(e.currentTarget).attr("data-tool"));
          $(data[0].eventCallToClose).trigger("click");

          callTools($(e.currentTarget).attr("data-tool"));
        }
      });

      function callTools(valDataTool) {
        //recive de data-toogle value of the active button of tooltips.
        console.log("id:", data[parseInt(valDataTool)].id);
        let activeTool = $(`.tool-${parseInt(valDataTool)}`); //convert valDataTool string to number and select the elements with class .tool-valDataTool.

        //poniendo overlay y seleccionando elemento ...
        // $(data[parseInt(valDataTool)].elSelected[0]).attr("style", "");
        // $(data[parseInt(valDataTool)].elSelected).attr("position", "");

        // let removeOverlay = $("div.overlay");
        // console.log(removeOverlay);
        // $.each(removeOverlay, function(r) {
        //   removeOverlay[r].remove();
        // });

        if (!data[parseInt(valDataTool)]) {
          //id data[valDataTool] not exist, remove the modal.
          return $("#guidedVisit").remove();
        }

        // call event to close of227 active tooltip.
        $(data[parseInt(valDataTool)].eventCallToClose).trigger("click");

        $.each(activeTool, function(a) {
          activeTool[a].classList.replace("d-block", "d-none");
        });
        // console.log(
        //   "Data en la que estoy: ",
        //   data[parseInt(valDataTool)].id + 0.1
        // );
        // console.log("activetool +1: ", activeTool + 0.1);
        let nextTool = $(`.tool-${parseInt(valDataTool) + 1}`);

        // call event to open of disable tooltip(the next).
        // console.log(
        //   $(data[parseInt(valDataTool)].eventCallToOpen).trigger("click")
        // );
        // $(
        // console.log($(data[parseInt(valDataTool) + 1].elSelected));
        //estaba esto y funcionaba
        // $(data[parseInt(valDataTool) + 1].elSelected[0]).attr(
        //   "style",
        //   function() {
        //     console.log(
        //       `data ${data[parseInt(valDataTool) + 1].elSelected[0]} selected`
        //     );
        //     return `z-index: 101 !important; position: ${
        //       data[parseInt(valDataTool) + 1].elSelected[1]
        //     };`;
        //   }
        // );

        // $(data[parseInt(valDataTool) + 1].elSelected).attr(
        //   "position",
        //   function() {
        //     return `relative;`;
        //   }
        // );

        //poner esto
        // $.each(data[parseInt(valDataTool) + 1].overlayContent, function(o) {
        //   $(data[parseInt(valDataTool) + 1].overlayContent[o]).append(
        //     `<div class="overlay"></div>`
        //   );
        // });
        $(data[parseInt(valDataTool)].eventCallToOpen).trigger(
          data[parseInt(valDataTool)].eventCallToClose
        );
        console.log($(event.relatedTarget));
        // let test = $("tr[1]");
        // $.each(test, function(r) {
        //   console.log(r);
        // });
        // console.log("test: ", test);

        //tbody[0].td[class*='options'].button[title='View user']
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
// crear propiedad eventToCall  y como string ponerle el evento que tiene que llamar por triguer
// el boton next.
// cuando se cambie el tooltip activo por d-none se remueve el triguer.

// el tooltip 2.1 abre el menu ---> "eventCallToOpen": "#open-icon-left" y explica boton list users.
// el 2.2 explica tabla
//el 2.3 explica boton visualizar detalles user , like birthday, telp, full address , languages, skills and frameworks.
// el 2.4 abre detalles de user.
// el 2.5 explica boton modificar user.
//el 2.6 abre formulario editar user
// el 2.7 explica boton detele
// el 2.8 abre boton delete
//el 2.9 explica boton crear user
// el 2.10 abre boton crear user

//el 3.1 abre menu derecho.
//#left-menu ul li:nth-of-type(2) abre el form
