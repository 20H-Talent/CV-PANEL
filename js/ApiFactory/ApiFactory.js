//Ruta para subida imagenes usuario /files/upload/user/
const ApiFactory = function(apiURL = "") {
  const urlREGEXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
  let baseURL;

  if (urlREGEXP.test(apiURL.trim())) {
    baseURL = apiURL[apiURL.length - 1] === "/" ? apiURL.slice(0, -1) : apiURL;
  } else {
    throw new Error(`The URL => ${baseURL} passed as parameter is invalid`);
  }

  const apiMethods = { baseURL };

  apiMethods.request = function(routeParameter, options = { storage: false }) {
    const route =
      routeParameter[0] !== "/" ? `/${routeParameter}` : routeParameter;

    if (Object.keys(options).length > 0) {
      switch (options["method"]) {
        case "GET":
          getRequest(baseURL + route, options);
          break;
        case "POST":
        case "PUT":
          storeOrUpdateRequest(baseURL + route, options);
          break;
        case "DELETE":
          deleteRequest(baseURL + route, options);
          break;
        default:
          throw new Error(
            `The method you passed as parameter is not valid => ${
              options["method"]
            }`
          );
      }
    }
  };

  function getRequest(url, options) {
    $.getJSON(url, function(response) {
      if (!response["error"] && response) {
        if (options["storage"]) {
          saveOnBrowserStorage(response, options["storage"]);
        }
        if (isFunction(options["callback"])) {
          options.callback(response);
        } else {
          throw new Error("The callback needs to be a function");
        }
      } else {
        throw new Error(response["error"]);
      }
    }).fail(function() {
      throw new Error(`An error ocurred in the ajax request to => ${url}`);
    });
  }

  function storeOrUpdateRequest(url, options) {
    $.ajax({
      method: options["method"],
      url,
      data: JSON.stringify(options["plainData"]),
      cache: true,
      crossDomain: true,
      contentType: "application/json"
    })
      .done(function(response) {
        if (
          options["multipart"] &&
          Object.keys(options["multipart"].length > 0)
        ) {
          uploadFileRequest(options, response._id);
        } else {
          if (isFunction(options["callback"])) {
            options.callback(response);
          } else {
            throw new Error("The callback needs to be a function");
          }
        }
      })
      .fail(function() {
        throw new Error(`An error in the request happened`);
      });
  }

  function deleteRequest(url, options) {
    $.ajax({
      method: options["method"],
      url,
      cache: false,
      crossDomain: true,
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(response) {
        if (isFunction(options["callback"])) {
          options.callback(response);
        } else {
          throw new Error("The callback needs to be a function");
        }
      })
      .fail(function() {
        throw new Error(`An error in the request happened`);
      });
  }

  function uploadFileRequest(options, _id) {
    $.ajax({
      method: "POST",
      cache: false,
      processData: false,
      contentType: false,
      url: `${baseURL}/${options["multipart"]["url"]}/${_id}`,
      data: options["multipart"]["file"],
      mimeType: "multipart/form-data"
    })
      .done(function(uploadResponse) {
        if (isFunction(options["callback"])) {
          options.callback(uploadResponse);
        } else {
          throw new Error("The callback needs to be a function");
        }
      })
      .fail(function(err) {
        throw new Error(`An error in the request happened:  ${err}`);
      });
  }

  function isFunction(param) {
    return typeof param === "function";
  }

  function saveOnBrowserStorage(data, storage) {
    if (!sessionStorage.getItem(storage["key"])) {
      sessionStorage.setItem(
        storage["key"],
        JSON.stringify(_collect(data, storage["collect"]))
      );
    }
  }

  function _collect(data, keyToCollect) {
    const collectedObject = { data: {} };
    data.forEach(item => {
      const key = item[keyToCollect];
      const itemCollected = {};
      delete item[keyToCollect];
      collectedObject["data"][key] = item;
    });
    return collectedObject;
  }

  return apiMethods;
};
