function Companies() {
    this.companies = [];
    this.addCompany = function(company) {
        this.companies.push(company);
    };
    this.renderTable = function() {
        console.log("companies", this.companies);
        //companies.addCompany(comp1);
        for (var i = 0; i < this.companies.length; i++) {
            console.log("algo", i);
            $("#tableBody").append(`<tr scope="row""  data-id=${this.companies[i].id}>    
            <td class="company-logo text-center"><img class="img rounded-circle  align-middle"src=${this.companies[i].logo} style="width:50px;"/></td>
                <td class="fullname"><p>${this.companies[i].name}</p></td>
                    <td class="company-email">${this.companies[i].email}</td>
                    <td class="company-registered">${this.companies[i].phone}</td>
                    <td class="company-city">${this.companies[i].address.city}</td>
                    <td class="company-registered">${this.companies[i].descripcion}</td>
                    <td class="company-registered">${this.companies[i].socialnetworks.facebook}</td>
                    <td class="options text-center">
                    <button  type="button" onclick="showInfo(${this.companies[i].id})"   class="btn  btn-sm btn-outline-info" data-toggle="modal" data-target="#ordine"><i class="far fa-eye"></i></button>
                    <button type="button" rel="tooltip" id="editForm"  class="btn btn-sm  btn-outline-secondary" data-original-title="" title=""><i class="fas fa-user-edit"></i>
                    </button>
                    <button type="button" class="my-2 btn  btn-sm btn-outline-danger"  id="deleteCompany"  data-toggle="modal" data-target="#delete" data-uid="2"><i class="far fa-trash-alt"></i></button></td>
                </tr>`);
        }
    };
    this.getCompanyByiD = function(id) {
        var company = this.companies.filter(function(company) {
            return company.id == id
        });
        return company[0];
    }
}