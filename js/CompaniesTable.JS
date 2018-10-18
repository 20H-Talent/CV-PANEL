function comapanies() {
  $.getJSON("../data/companies.json").done(function(data) {
    console.log(data);
    $.each(data, function(d) {
      $("#tableBody").append(`<tr scope="row">
      <td class="company-logo">
            <img class="img"  src=${data[d].logo}  style="width:100px" ; /></td>
            <td class="fullname">
              <p>${data[d].name}</p>
            </td>
            <td class="company-email">${data[d].email}</td>
            
           
            <td class="company-registered">${data[d].phone}</td> 
            <td class="company-city">${data[d].address.city}</td>
            <td class="company-registered">${data[d].descripcion}</td> 
            </td>
          </tr>`);
      console.log(data[d].name);
      console.log(data[d].email);
    });
  });
}
comapanies();
