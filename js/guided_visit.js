// ************** DECLARATION FUNCTIONS **************
// ----------------- TO CREATE CONFETTI TO THE END OF THE TUTORIAL ------------
function getConfetti() {
  for (var i = 0; i < 250; i++) {
    create(i);
  }

  function create(i) {
    var width = Math.random() * 8;
    var height = width * 0.4;
    var colourIdx = Math.ceil(Math.random() * 6);
    var colour = "red";
    switch (colourIdx) {
      case 1:
        colour = "light-blue";
        break;
      case 2:
        colour = "blue";
        break;
      case 3:
        colour = "pink";
        break;
      case 4:
        colour = "purple";
        break;
      case 5:
        colour = "green";
        break;
      case 6:
        colour = "greenyellow";
        break;
      default:
        colour = "red";
    }
    $('<div class="confetti-' + i + " " + colour + '"></div>')
      .css({
        width: width + "px",
        height: height + "px",
        top: -Math.random() * 20 + "%",
        left: Math.random() * 100 + "%",
        opacity: Math.random() + 0.5,
        transform: "rotate(" + Math.random() * 360 + "deg)"
      })
      .appendTo("#guidedVisit .modal-dialog");

    drop(i);
  }

  function drop(x) {
    $(".confetti-" + x).animate(
      {
        top: "100%",
        left: "+=" + Math.random() * 15 + "%"
      },
      Math.random() * 3000 + 3000,
      function() {
        reset(x);
      }
    );
  }

  function reset(x) {
    $(".confetti-" + x).animate(
      {
        top: -Math.random() * 20 + "%",
        left: "-=" + Math.random() * 15 + "%"
      },
      0,
      function() {
        drop(x);
      }
    );
  }
}
// ------------ TO CHECK THE VISITS OF LOCAL STORAGE AND TO DO ACCORDIND THEM. --------
function checkTimesVisitedPage() {
  let visitsLocalStorage = localStorage.getItem("refreshPage");

  function _loadGuidedVisit() {
    // ------- Load the modal welcome ---------
    return new Promise((resolve, reject) => {
      $.get("html/guided_visit.html", dataModal => {
        dataModal;
      })
        .done(dataModal => {
          resolve(dataModal);
        })
        .fail(dataModal => {
          reject(dataModal);
        });
    });
  }
  function toDoAccordingLocalStorage(visitsLocalStorage) {
    //------- visitsLocalStorage is typeof object and  null the first time. -----------
    if (visitsLocalStorage === null) {
      localStorage.setItem("refreshPage", 1);

      visitsLocalStorage = "1";
    }

    if (parseInt(visitsLocalStorage) < 4) {
      _loadGuidedVisit()
        .then(dataModal => {
          $("body main").append(dataModal);

          // ------- Inicialize the events for button Skip and Start ---------
          $("#guidedVisit button.btn-secondary").on("click", function() {
            $("#guidedVisit").remove();
          });
          $("#guidedVisit button.btn-primary").on("click", () => tooltips());
        })
        .catch(dataModal => {
          console.error("Unable to load Guided Visit");
        });
    } else if (parseInt(visitsLocalStorage) === 4) {
      // --------- if equal to 4, shows a message. ----------
      $("main")
        .append(` <div style='top: 0; position: absolute; z-index: 10; opacity:0.9; background-color: #484646' class="alert alert-dismissible fade show w-100 h-100 d-flex justify-content-center align-items-center flex-column text-white" role="alert">
          <p style='font-size: 1.5rem' class='text-center'>
            <strong>Hey you!</strong> You visited the page more than 3 times, so the
            guided visit will not appear any more. If you want to see again, there is
            a button on left menu.
          </p>
          <button type='button' class='open  btn btn-primary' data-dismiss='alert' aria-label='close' style='width: 5%;'>
          <span aria-hidden="true">Close</span>
          </button>
        </div>`);

      $("button[class*=btn-primary").on("click", function() {
        location.reload(true);
      });
    } else {
      // -------- if visits to Page is more than 4, added the button Guided Visit lo left menu. -------
      if ($("#btnGuidedVisit").length === 0) {
        setTimeout(() => {
          $('#left-menu li[data-original-title*="Logout"]').before(
            `<li id="btnGuidedVisit" class="mb-3 rounded w-100 app-tooltip" data-toggle="tooltip" data-placement="right"
           title="Replay the Guided Visit">
            <a href="#" class="p-1 pl-2">
                <i class="fa fa-reply mr-2"></i>
                <span class="close">Guided Visit</span>
            </a>
            </li>`
          );
          $("#btnGuidedVisit").tooltip();
          $("#btnGuidedVisit").on("click", function() {
            _loadGuidedVisit()
              .then(dataModal => {
                $("body main").append(dataModal);

                // ------- Inicialize the events for button Skip and Start ---------
                $("#guidedVisit button.btn-secondary").on("click", function() {
                  $("#guidedVisit").remove();
                });
                $("#guidedVisit button.btn-primary").on("click", () =>
                  tooltips()
                );
              })
              .catch(dataModal => {
                console.error("Unable to load Guided Visit");
              });
          });
        }, 500);
      }
    }
    localStorage.setItem("refreshPage", parseInt(visitsLocalStorage) + 1);
  }
  toDoAccordingLocalStorage(visitsLocalStorage);
}
// --------------- MAKE TOOLTIPS AND FUNCTIONALITIES ----------------------
function tooltips() {
  // to get from JSON, the tooltips objects.
  function _getDataForTooltips() {
    return new Promise((resolve, reject) => {
      $.getJSON("../data/tooltips_guided_visit.json")
        .done(function(dataJSON) {
          resolve(dataJSON);
        })
        .fail(function(jqXHR) {
          if (jqXHR.statusText !== "OK") {
            reject("[ERROR]: on loading Tooltips JSON.");
          }
        });
    });
  }
  // to make skeleton of tools
  function _makeSkeletonTooltips(dataJSON) {
    let data = dataJSON;
    // clear modal body to insert tooltips.
    $("#guidedVisit").html("");

    $.each(data, function(i) {
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
            <button style='position: relative; left: 360px; font-size: 0.8rem' class='btn-tool badge badge-pill badge-info' data-tool= ${
              data[i].id
            }>Next</button>
            <button style='position:relative; left:365px; font-size: 0.8rem' class='btn-tool-skip badge badge-pill badge-secondary' data-tool= ${
              data[i].id
            }>Skip</button>
          </div>
          `);
    });
    return dataJSON;
  }
  // to inicialize the spacebar, the buttons next and call the next tooltip.
  function _InicializeTooltips(dataJSON) {
    // ----------- Declarations --------------

    let data = dataJSON;
    let currentDataTool = 0;

    function _inicializeSpaceBar() {
      $(window).on("keypress", function(e) {
        if (e.keyCode === 32) {
          _callTooltips(currentDataTool);
        }
      });
    }

    function _inicializeBtnTooltips() {
      $(".btn-tool").on("click", function(e) {
        if ($(e.currentTarget).attr("data-tool")) {
          //call event to close of data[0].
          _callTooltips($(e.currentTarget).attr("data-tool"));
        }
      });
      // if click on skip button on a tooltip, remove the modal.
      $(".btn-tool-skip").on("click", function(e) {
        $("#guidedVisit").remove();
        location.reload(true);
      });
    }
    // call tooltips to display.
    function _callTooltips(eventCurrentBtnNext) {
      //convert eventCurrentBtnNext string to number and store on currentBtnNext.
      let currentBtnNext = parseInt(eventCurrentBtnNext);
      // store the data of actual tooltip.
      let dataPosition = data[currentBtnNext];

      //recive de data-toogle value of the active button of tooltips.
      let activeTool = $(`.tool-${currentBtnNext}`); //select the elements with class .tool-currentBtnNext.

      // if the currentBtnNext is equal to last data, remove the modal.
      if (currentBtnNext === 20) {
        $("#guidedVisit").html("");

        $("#guidedVisit")
          .append(`<div class="bg-dark h-100" style="top:-28px; position:relative;">
          <div class="modal-dialog modal-dialog-centered" role="document">
           <div class="modal-content align-items-center">
              <div class="modal-header justify-content-center w-100 text-white" style="background-color: #4d394b">
                  <h5 class="modal-title font-weight-bold">Completed tutorial</h5>
              </div>
              <div class="modal-body text-center">
                  <p>Congratulations!! You passed the guided visit.<br>
                   Now, you can work with the app.
                  </p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn-tool-finish btn btn-primary">Finish</button>
              </div>
          </div>
      </div>
      </div>`);
        $("#guidedVisit .modal-dialog").className = "wrappert";
        getConfetti();
        $(".btn-tool-finish").on("click", function(e) {
          $("#guidedVisit").remove();
          location.reload(true);
        });
      }

      $.each(activeTool, function(a) {
        activeTool[a].classList.replace("d-block", "d-none");
      });

      let nextTool = $(`.tool-${currentBtnNext + 1}`);

      $(dataPosition.eventCallToOpen).trigger(dataPosition.eventCallToClose);

      $.each(nextTool, function(n) {
        nextTool[n].classList.replace("d-none", "d-block");
      });
      currentDataTool++;
    }

    // ------------- Executions --------------------
    _inicializeBtnTooltips();
    _inicializeSpaceBar();

    // call the first tool ...
    let tool1 = $(".tool-0");
    $.each(tool1, function(u) {
      tool1[u].classList.replace("d-none", "d-block");
    });

    //call trigger of tooltip 1
    $(listUsers).trigger("click");
  }
  // call principal function of tooltips().
  _getDataForTooltips()
    .then(dataJSON => _makeSkeletonTooltips(dataJSON))
    .then(dataJSON => _InicializeTooltips(dataJSON))
    .catch(dataJSON => console.error(dataJSON));
}

// ***************** CALL FUNCTIONS *******************
checkTimesVisitedPage();
