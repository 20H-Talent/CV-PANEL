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

      default:
        throw new Error(
          `This type method: ${type} doesn't exist in the array content`
        );
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
          }" value="${_id}" name="${
        data[_id].label
      }" id="${_id}" class="custom-control-input">
          <label class="custom-control-label" for="${_id}">${
        data[_id].label
      }</label>
        </div>`
    );
  }
}

function renderSkills(data) {
  const skillsContainer = $("form#advanced-search #skills");
  const frameworksColumn = skillsContainer.find('div[class*="col-12"]');
  const languagesColumn = skillsContainer.find('div[class*="col-5"]');
  const othersColumn = skillsContainer.find('div[class*="col-6"]');

  frameworksColumn.empty();
  languagesColumn.empty();
  othersColumn.empty();

  for (let _id in data) {
    let divObjectSkill = `
    <div class="custom-control custom-checkbox mr-3">
          <input type="checkbox" id="${_id}" class="custom-control-input" fieldName="${
      data[_id].type
    }" valueName="${data[_id].label}" value=${_id}
          name="${data[_id].label}">
          <label class="custom-control-label" for="${_id}">${
      data[_id].label
    }</label>
    </div>`;

    if (data[_id].type === "framework") {
      frameworksColumn.append(divObjectSkill);
    } else if (data[_id].type === "language") {
      languagesColumn.append(divObjectSkill);
    } else {
      othersColumn.append(divObjectSkill);
    }
  }
}
