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

  apiMethods.request = function(routeParameter, options = {}) {
    const route =
      routeParameter[0] !== "/" ? `/${routeParameter}` : routeParameter;

    if (Object.keys(options).length > 0) {
      switch (options["method"]) {
        case "GET":
          getRequest(baseURL + route, options);
          break;
        case "POST":
          $.ajax({
            method,
            url: baseURL + route,
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
            .fail(function(err) {
              throw new Error(`An error in the request happened:  ${err}`);
            });
          break;

        case "PUT":
          break;

        case "DELETE":
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

  function uploadFileRequest(options, _id) {
    $.ajax({
      method: "POST",
      cache: false,
      proccessData: false,
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

  return apiMethods;
};
