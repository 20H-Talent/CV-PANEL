$("#mySidenavRight a").on("click", renderLanguagesAndSkills);

// ******* declare function to get data from languages json. ***********
function renderLanguagesAndSkills(event) {
  for (let type of ["skills", "languages"]) {
    const sourceData = JSON.parse(sessionStorage.getItem(type));
    switch (type) {
      case "languages":
        renderLanguages(sourceData);
        break;
      case "skills":
        renderSkills(sourceData);
        break;
    }
  }
}

function renderLanguages(data) {
  const languagesContainer = $("form#advanced-search #languages");
  languagesContainer.html(" ");

  for (let _id in data) {
    languagesContainer.append(
      `<div class="custom-control custom-checkbox col-5">
          <input type="checkbox" fieldName="language" valueName="${
            data[_id].label
          }" value="${_id}"
          name="${data[_id].label}" id="${_id}" class="custom-control-input">
          <label class="custom-control-label" for="${_id}">${
        data[_id].label
      }</label>
        </div>`
    );
  }
}

function renderSkills(data) {
  const skillsContainer = $("form#advanced-search #skills");
  skillsContainer.find('div[class*="col-12"]').html(" ");
  skillsContainer.find('div[class*="col-5"]').html(" ");
  skillsContainer.find('div[class*="col-6"]').html(" ");

  for (let _id in data) {
    let divObjectSkill = `<div class="custom-control custom-checkbox mr-3">
        <input type="checkbox" id="${_id}" class="custom-control-input" fieldName="${
      data[_id].type
    }" valueName="${data[_id].label}" value=${_id}
        name="${data[_id].label}">
        <label class="custom-control-label" for="${_id}">${
      data[_id].label
    }</label>
          </div>`;

    if (data[_id].type === "framework") {
      skillsContainer.find("div[class*='col-12']").append(divObjectSkill);
    } else if (data[_id].type === "language") {
      skillsContainer.find("div[class*='col-5']").append(divObjectSkill);
    } else {
      skillsContainer.find("div[class*='col-6']").append(divObjectSkill);
    }
  }
}
