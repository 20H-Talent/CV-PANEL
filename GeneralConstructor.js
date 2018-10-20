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
      for (constructor of constructors) {
        if (constructor[constructorKey]) {
          constructor[constructorKey].construct(targetContainer);
          break;
        }
      }
    }

    return {
      constructors,
      construct
    };
  }

  return {
    getInstance: function(classes) {
      if (!instance && classes instanceof Array) {
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
  generalConstructor = GeneralConstructor.getInstance([
    { "users-table": usersTable }
  ]);
} catch (err) {
  alert(err.name + " " + err.message);
}
