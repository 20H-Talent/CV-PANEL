/**
 * This class manage all the complex HTML elements inside the
 * center container of the admin panel, it allow us to manage our
 * logic more easily and empty & append new HTML elements smoothly.
 *
 */

const GeneralConstructor = (function() {
  let instance;
  const targetContainer = $(".main-container #data-column");

  function init() {
    return {};
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

const generalConstructor = GeneralConstructor.getInstance();
