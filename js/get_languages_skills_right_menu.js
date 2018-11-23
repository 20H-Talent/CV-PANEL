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
    $("#languages").html(" ");
    $.each(data, function(d) {
      $("#languages").append(
        `<div class="custom-control custom-checkbox col-5">
          <input type="checkbox" fieldName="language" valueName="${data[d].label}" value="${data[d]._id}" 
          name="languages" id="${data[d]._id}" class="custom-control-input">
          <label class="custom-control-label" for="${data[d]._id}">${data[d].label}</label>
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
          data[d]._id
        }" class="custom-control-input" fieldName="${data[d].type}" valueName="${data[d].label}" value=${data[d]._id} 
        name="skills">
        <label class="custom-control-label" for="${data[d]._id}">${
        data[d].label
      }</label>
      </div>`;
      if (data[d].type === "framework") {
        $('#skills div[class*="col-12"]').append(divObjectSkill);
      } else if (data[d].type === "language") {
        $('#skills div[class*="col-5"]').append(divObjectSkill);
      } else {
        $('#skills div[class*="col-6"]').append(divObjectSkill);
      }
    });
  }
}

