function comapanies() {
  $.getJSON("../data/companies.json")
    .done(function(data) {
      console.log(data);
      $.each(data, function(i, item) {
        $("#tableBody").append(`<tr scope="row">
      <td class="company-logo user-avatar  pl-5">
            <img class="img text-center align-middle"  src=${
              item.logo
            }  style="width:50px; "  /></td>
            <td class="fullname">
              <p>${item.name}</p>
            </td>
            <td class="company-email">${item.email}</td>
            <td class="company-registered">${item.phone}</td> 
            <td class="company-city">${item.address.city}</td>
            <td class="company-registered">${item.descripcion}</td> 
            </td>
          </tr>`);
      });
    })
    .fail(function(jqXHR) {
      if (jqXHR.statusText !== "OK") {
        console.log("[ERROR]: on loading json.");
      }
    });
}
comapanies();
