// ******* declare function to get data from languages json. ***********
function languages() {
  $.getJSON("../data/languages.json")
    .done(function(data) {
      $.each(data, function(d) {
        // console.log(`Position ${d} [Label ${data[d].label}]`);
        // console.log(`Position ${d} [Name ${data[d].name}]`);
        // console.log(`Position ${d} [Defaul value ${data[d].defaultValue}]`);
        // console.log("\n");
        $("#languages").append(
          `<div class="custom-control custom-checkbox col-5">
            <input type="checkbox" name="${data[d].name}" id="${data[d].label}" value=${data[d].defaultValue} class="custom-control-input">
            <label for="${data[d].label}" class="custom-control-label">${data[d].label}</label>
          </div>`
        );
      });
    })
    .fail(function(jqXHR) {
      if (jqXHR.statusText !== "OK") {
        console.log("[ERROR]: on loading json.");
      }
    });
}
// ************** declare function to get data from skills json. *************
function skills() {
  $.getJSON("../data/skills.json")
    .done(function(data) {
      $.each(data, function(d) {
        let divObjectSkill = `<div class="custom-control custom-checkbox mr-3">
          <input type="checkbox" id="${data[d].label}" class="custom-control-input" value=${data[d].defaultValue} name="${data[d].name}">
          <label class="custom-control-label" for="${data[d].label}">${data[d].label}</label>
        </div>`;
        if(data[d].tag === 'layout'){ //objects 0-1.
          $('#skills div[class*="col-12"]').append(divObjectSkill);
        }
        else if(data[d].tag === 'languages'){ //objects 2-7.
          $('#skills div[class*="col-5"]').append(divObjectSkill);
          
        }
        else{ //objects 7-14.
          $('#skills div[class*="col-6"]').append(divObjectSkill);
        }
      });
    })
    .fail(function(jqXHR) {
      if (jqXHR.statusText !== "OK") {
        console.log("[ERROR]: on loading json.");
      }
    });
}

languages();
skills();

// crear 2 metodos :
  //  - form create
  //  - form search
// segun que evento sea llamado se llama a un met o a otro