$("#mySidenavRight a").on("click", languages);
$("#mySidenavRight a").on("click", skills);

// ******* declare function to get data from languages json. ***********
function languages() {
  $.getJSON("http://cv-mobile-api.herokuapp.com/api/langs")
    .done(function(data) {
      searchForm(data);
    })
    .fail(function(jqXHR) {
      if (jqXHR.statusText !== "OK") {
        console.log("[ERROR]: on loading json.");
      }
    });

  // method to search
  function searchForm(data) {
    console.log("aquiii", data);
    $("#languages").html(" ");
    $.each(data, function(d) {
      $("#languages").append(
        `<div class="custom-control custom-checkbox col-5">
          <input type="checkbox" name="languages[]" id="${
            data[d].label
          }" value=${data[d]._id} class="custom-control-input">
          <label for="${data[d].label}" class="custom-control-label">${
          data[d].label
        }</label>
        </div>`
      );
    });
  }
}

// ************** declare function to get data from skills json. *************
function skills() {
  $.getJSON("http://cv-mobile-api.herokuapp.com/api/skills")
    .done(function(data) {
      searchForm(data);
    })
    .fail(function(jqXHR) {
      if (jqXHR.statusText !== "OK") {
        console.log("[ERROR]: on loading json.");
      }
    });

  // method to search
  function searchForm(data) {
 
    $('#skills div[class*="col-12"]').html(" ");
    $('#skills div[class*="col-5"]').html(" ");
    $('#skills div[class*="col-6"]').html(" ");
    $.each(data, function(d) {
      let divObjectSkill = `<div class="custom-control custom-checkbox mr-3">
        <input type="checkbox" id="${
          data[d].label
        }" class="custom-control-input" value=${data[d]._id} name="
        skills[]">
        <label class="custom-control-label" for="${data[d].label}">${
        data[d].label
      }</label>
      </div>`;
      if (data[d].type === "framework") {
        //objects 0-1.
        $('#skills div[class*="col-12"]').append(divObjectSkill);
      } else if (data[d].type === "language") {
        //objects 2-7.
        $('#skills div[class*="col-5"]').append(divObjectSkill);
      } else {
        //objects 7-14.
        $('#skills div[class*="col-6"]').append(divObjectSkill);
      }
    });
  }
}
