$("#mySidenavLeft ul li:nth-of-type(2)").on("click", languages);
$("#mySidenavRight a").on("click", languages);
$("#mySidenavLeft ul li:nth-of-type(2)").on("click", skills);
$("#mySidenavRight a").on("click", skills);

// ******* declare function to get data from languages json. ***********
function languages(e) {

    $.getJSON("../data/languages.json")
        .done(function(data) {
            //call createForm or searchForm method

            // console.log(e.target.value);
            console.log(e.currentTarget);
            if (
                //     e.currentTarget.tagName === "LI" ||
                //     e.currentTarget.tagName === "I" ||
                e.currentTarget.tagName === "BUTTON"
            ) {
                createForm(data);
                //     // to prevent the duplicity of data, removing the event from the dom.
                //     // $("#mySidenavLeft ul li:nth-of-type(2)").off("click", languages);
            } else {
                searchForm(data);
                //     //  $("#mySidenavRight a").off("click", languages);
            }
        })
        .fail(function(jqXHR) {
            if (jqXHR.statusText !== "OK") {
                console.log("[ERROR]: on loading json.");
            }
        });

    // method to create form
    function createForm(data) {
        $("#selLanguage").html(" ");
        $.each(data, function(d) {
            $("#selLanguage").append(
                `<option value="${data[d].label}">${data[d].label}</option>`
            );
        });
    }
    // method to search
    function searchForm(data) {
        $("#languages").html(" ");
        $.each(data, function(d) {
            // console.log(`Position ${d} [Label ${data[d].label}]`);
            // console.log(`Position ${d} [Name ${data[d].name}]`);
            // console.log(`Position ${d} [Defaul value ${data[d].defaultValue}]`);
            // console.log("\n");
            $("#languages").append(
                `<div class="custom-control custom-checkbox col-5">
          <input type="checkbox" name="${data[d].name}" id="${
          data[d].label
        }" value=${data[d].defaultValue} class="custom-control-input">
          <label for="${data[d].label}" class="custom-control-label">${
          data[d].label
        }</label>
        </div>`
            );
        });
    }
}

// ************** declare function to get data from skills json. *************
function skills(e) {

    $.getJSON("../data/skills.json")
        .done(function(data) {
            if (e.currentTarget.value === 0) {
                createForm(data);
                // to prevent the duplicity of data, removing the event from the dom.
                // $("#mySidenavLeft ul li:nth-of-type(2)").off("click", skills);
            } else {
                searchForm(data);
                //  $("#mySidenavRight a").off("click", skills);
            }
        })
        .fail(function(jqXHR) {
            if (jqXHR.statusText !== "OK") {
                console.log("[ERROR]: on loading json.");
            }
        });

    // method to create form
    function createForm(data) {
        $("#skill").html(" ");
        $.each(data, function(d) {

            $("#skill").append(
                `<div class="custom-control custom-checkbox custom-control-inline">
          <input name="${
            data[d].name
          }" type="checkbox" class="custom-control-input" id="${
          data[d].label
        }" value=${data[d].defaultValue}>
          <label class="custom-control-label" for="${data[d].label}">${
          data[d].label
        }</label>
        </div`
            );
        });
    }
    // method to search
    function searchForm(data) {
        //divObjectSkill.html(" ");
        $('#skills div[class*="col-12"]').html(" ");
        $('#skills div[class*="col-5"]').html(" ");
        $('#skills div[class*="col-6"]').html(" ");
        $.each(data, function(d) {
            let divObjectSkill = `<div class="custom-control custom-checkbox mr-3">
        <input type="checkbox" id="${
          data[d].label
        }1" class="custom-control-input" value=${data[d].defaultValue} name="${
        data[d].name
      }">
        <label class="custom-control-label" for="${data[d].label}1">${
        data[d].label
      }</label>
      </div>`;
            if (data[d].tag === "layout") {
                //objects 0-1.
                $('#skills div[class*="col-12"]').append(divObjectSkill);
            } else if (data[d].tag === "languages") {
                //objects 2-7.
                $('#skills div[class*="col-5"]').append(divObjectSkill);
            } else {
                //objects 7-14.
                $('#skills div[class*="col-6"]').append(divObjectSkill);
            }
        });
    }

}



/////
// $("#mySidenavLeft ul li:nth-of-type(2)").on("click", languages);
// $("#mySidenavRight a").on("click", languages);
// $("#mySidenavLeft ul li:nth-of-type(2)").on("click", skills);
// $("#mySidenavRight a").on("click", skills);

// // ******* declare function to get data from languages json. ***********
// function languages(e) {
//     $.getJSON("../data/languages.json")
//         .done(function(data) {
//             //call createForm or searchForm method

//             // console.log(e.target.value);
//             console.log(e.currentTarget);
//             if (
//                 e.currentTarget.tagName === "LI" ||
//                 e.currentTarget.tagName === "I" ||
//                 e.currentTarget.tagName === "BUTTON"
//             ) {
//                 createForm(data);
//                 // to prevent the duplicity of data, removing the event from the dom.
//                 $("#mySidenavLeft ul li:nth-of-type(2)").off("click", languages);
//             } else {
//                 searchForm(data);
//                 $("#mySidenavRight a").off("click", languages);
//             }
//         })
//         .fail(function(jqXHR) {
//             if (jqXHR.statusText !== "OK") {
//                 console.log("[ERROR]: on loading json.");
//             }
//         });
//     // method to create form
//     function createForm(data) {
//         $.each(data, function(d) {
//             $("#selLanguage").append(
//                 `<option value="${data[d].label}">${data[d].label}</option>`
//             );
//         });
//     }
//     // method to search
//     function searchForm(data) {
//         $.each(data, function(d) {
//             // console.log(`Position ${d} [Label ${data[d].label}]`);
//             // console.log(`Position ${d} [Name ${data[d].name}]`);
//             // console.log(`Position ${d} [Defaul value ${data[d].defaultValue}]`);
//             // console.log("\n");
//             $("#languages").append(
//                 `<div class="custom-control custom-checkbox col-5">
//           <input type="checkbox" name="${data[d].name}" id="${
//           data[d].label
//         }" value=${data[d].defaultValue} class="custom-control-input">
//           <label for="${data[d].label}" class="custom-control-label">${
//           data[d].label
//         }</label>
//         </div>`
//             );
//         });
//     }
// }
// // ************** declare function to get data from skills json. *************
// function skills(e) {
//     $.getJSON("../data/skills.json")
//         .done(function(data) {
//             if (e.currentTarget.value === 0) {
//                 createForm(data);
//                 // to prevent the duplicity of data, removing the event from the dom.
//                 $("#mySidenavLeft ul li:nth-of-type(2)").off("click", skills);
//             } else {
//                 searchForm(data);
//                 $("#mySidenavRight a").off("click", skills);
//             }
//         })
//         .fail(function(jqXHR) {
//             if (jqXHR.statusText !== "OK") {
//                 console.log("[ERROR]: on loading json.");
//             }
//         });
//     // method to create form
//     function createForm(data) {
//         $.each(data, function(d) {
//             $("#skill").append(
//                 `<div class="custom-control custom-checkbox custom-control-inline">
//           <input name="${
//             data[d].name
//           }" type="checkbox" class="custom-control-input" id="${
//           data[d].label
//         }" value=${data[d].defaultValue}>
//           <label class="custom-control-label" for="${data[d].label}">${
//           data[d].label
//         }</label>
//         </div`
//             );
//         });
//     }
//     // method to search
//     function searchForm(data) {
//         $.each(data, function(d) {
//             let divObjectSkill = `<div class="custom-control custom-checkbox mr-3">
//         <input type="checkbox" id="${
//           data[d].label
//         }1" class="custom-control-input" value=${data[d].defaultValue} name="${
//         data[d].name
//       }">
//         <label class="custom-control-label" for="${data[d].label}1">${
//         data[d].label
//       }</label>
//       </div>`;
//             if (data[d].tag === "layout") {
//                 //objects 0-1.
//                 $('#skills div[class*="col-12"]').append(divObjectSkill);
//             } else if (data[d].tag === "languages") {
//                 //objects 2-7.
//                 $('#skills div[class*="col-5"]').append(divObjectSkill);
//             } else {
//                 //objects 7-14.
//                 $('#skills div[class*="col-6"]').append(divObjectSkill);
//             }
//         });
//     }
// }