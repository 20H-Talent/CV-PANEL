function comapanies() {
  $.getJSON("../data/companies.json").done(function(data) {
    console.log(data);
    $.each(data, function(i) {
      $("#tableBody").append(`<tr scope="row">
      <td class="company-logo">
            <img class="img"  src=${data[i].logo}  style="width:100px" ; /></td>
            <td class="fullname">
              <p>${data[d].name}</p>
            </td>
            <td class="company-email">${data[i].email}</td>
            
           
            <td class="company-registered">${data[i].phone}</td> 
            <td class="company-city">${data[i].address.city}</td>
            <td class="company-registered">${data[i].descripcion}</td> 
            </td>
          </tr>`);
      console.log(data[i].name);
      console.log(data[i].email);
    }).fail(function(jqXHR) {
      if (jqXHR.statusText !== "OK") {
        console.log("[ERROR]: on loading json.");
      }
    });
  });
}
comapanies();
