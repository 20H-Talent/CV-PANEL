/**
 * This class manage all the complex HTML elements inside the
 * center container of the admin panel, it allow us to manage our
 * logic more easily and empty & append new HTML elements smoothly.
 * @return {function} getInstance
 */
const GeneralConstructor = (function() {
  let instance;
  let constructors;

  const targetContainer = $(".main-container #data-column");

  function init(classes) {
    constructors = classes;

    function construct(constructorKey) {
      if (
        constructors[constructorKey] &&
        targetContainer.find(constructors[constructorKey]["container"])
          .length === 0
      ) {
        if (
          constructorKey === "users-table" ||
          constructorKey === "survey-creator"
        ) {
          targetContainer.css("overflow-y", "hidden");
        } else {
          targetContainer.css("overflow-y", "auto");
        }
        constructors[constructorKey]["constructor"].construct(targetContainer);
      }
    }

    return {
      constructors,
      construct
    };
  }

  return {
    getInstance: function(classes) {
      if (!instance && classes instanceof Object) {
        instance = init(classes);
      } else {
        throw new Error(
          "GeneralConstructor receive a bad parameter: " + classes
        );
      }
      return instance;
    }
  };
})();

let generalConstructor;

try {
  generalConstructor = GeneralConstructor.getInstance({
    "users-table": { container: "#users-table", constructor: usersTable },
    "user-form": { container: "#user-form-container", constructor: userForm },
    "survey-creator": {
      container: ".survey-container",
      constructor: surveyCreator
    },
    "companies-table": {
      container: ".companies-table",
      constructor: companies
    },
    "enterprises-form": {
      container: "#alert-form-enterprises",
      constructor: enterpriseForm
    },
    calendar: { container: "#calendar", constructor: calendar }
  });
} catch (err) {
  alert(err.name + " " + err.message);
}
