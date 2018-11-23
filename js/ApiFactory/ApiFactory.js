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
          _getRequest(baseURL + route, options);
          break;
        case "POST":
        case "PUT":
          _storeOrUpdateRequest(baseURL + route, options);
          break;
        case "DELETE":
          _deleteRequest(baseURL + route, options);
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

  function _getRequest(url, options) {
    $.getJSON(url, function(response) {
      if (!response["error"] && response) {
        if (options["storage"]) {
          saveOnBrowserStorage(response, options["storage"]);
        }
        if (_isFunction(options["callback"])) {
          options.successCallback(response);
        } else {
          throw new Error("The callback needs to be a function");
        }
      } else {
        if (_isFunction(options["errorCallback"])) {
          options.errorCallback(response["error"]);
        } else {
          throw new Error(response["error"]);
        }
      }
    }).fail(function() {
      const error = `An error ocurred in the ajax request to => ${url}`;
      dispatchError(error, options["errorCallback"]);
    });
  }

  function _storeOrUpdateRequest(url, options) {
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
          _uploadFileRequest(options, response._id);
        } else {
          if (_isFunction(options["callback"])) {
            options.successCallback(response);
          } else {
            throw new Error("The callback needs to be a function");
          }
        }
      })
      .fail(function() {
        const error = `An error ocurred in the ajax request to => ${url}`;
        dispatchError(error, options["errorCallback"]);
      });
  }

  function _deleteRequest(url, options) {
    $.ajax({
      method: options["method"],
      url,
      cache: false,
      crossDomain: true,
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(response) {
        if (_isFunction(options["callback"])) {
          options.successCallback(response);
        } else {
          throw new Error("The callback needs to be a function");
        }
      })
      .fail(function() {
        const error = `An error ocurred in the ajax request to => ${url}`;
        dispatchError(error, options["errorCallback"]);
      });
  }

  function _uploadFileRequest(options, _id) {
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
        if (_isFunction(options["callback"])) {
          options.successCallback(uploadResponse);
        } else {
          throw new Error("The callback needs to be a function");
        }
      })
      .fail(function() {
        const error = `An error ocurred in the ajax request to => ${
          options["multipart"]["url"]
        }`;

        dispatchError(error, options["errorCallback"]);
      });
  }

  function _isFunction(param) {
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

  function dispatchError(error, callback) {
    if (_isFunction(callback)) {
      callback(error);
    } else {
      throw new Error(error);
    }
  }

  function _collect(data, keyToCollect) {
    const collectedObject = {};
    data.forEach(item => {
      const key = item[keyToCollect];
      const itemCollected = {};
      delete item[keyToCollect];
      collectedObject[key] = item;
    });
    return collectedObject;
  }

  return apiMethods;
};
