function comapanies() {
  $.getJSON("../data/companies.json").done(function(data) {
    console.log(data);
    $.each(data, function(d) {
      $("#company-column").append(`<tr scope="row">
      <td class="company-logo">
            <img class="img-fluid" /></td>
            <td class="fullname">
              <p>${data[d].name}</p>
            </td>
            <td class="user-email">${data[d].email}</td>
            <td class="company-city">
            <p></p>
            
            </td>
          </tr>`);
      console.log(data[d].name);
      console.log(data[d].email);
    });
  });
}
comapanies();
