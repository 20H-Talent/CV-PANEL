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
    console.log(routeParameter, options);
    const route =
      routeParameter[0] !== "/" ? `/${routeParameter}` : routeParameter;

    if (Object.keys(options).length > 0) {
      switch (options["method"]) {
        case "GET":
          $.getJSON(baseURL + route, function(response) {
            console.log(baseURL + route, response);
            if (!response["error"] && response) {
              if (typeof options["callback"] === "function") {
                options["callback"](response);
              } else {
                throw new Error("The callback needs to be a function");
              }
            } else {
              throw new Error(response["error"]);
            }
          });
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
                $.ajax({
                  method: "POST",
                  cache: false,
                  proccessData: false,
                  url: `${baseURL}/${options["multipart"]["url"]}/${
                    response._id
                  }`,
                  data: options["multipart"]["file"],
                  mimeType: "multipart/form-data"
                }).done(function(uploadResponse) {
                  if (typeof options["callback"] === "function") {
                    options["callback"](uploadResponse);
                  } else {
                    throw new Error("The callback needs to be a function");
                  }
                });
              } else {
                if (typeof options["callback"] === "function") {
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

  return apiMethods;
};
