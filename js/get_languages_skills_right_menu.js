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
  languagesContainer.find("*").not("h6");

  for (let _id in data) {
    languagesContainer.append(
      `<div class="custom-control custom-checkbox col-5">
          <input data-type="languages" type="checkbox" fieldName="language" valueName="${
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
  const frameworksColumn = skillsContainer.find(`div.skills-frameworks`);
  const languagesColumn = skillsContainer.find(`div.skills-languages`);

  frameworksColumn.empty();
  languagesColumn.empty();

  for (let _id in data) {
    let divObjectSkill = `
    <div class="custom-control custom-checkbox mr-3">
          <input type="checkbox" data-type="skills" id="${_id}" class="custom-control-input" fieldName="${
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
    }
  }
}
