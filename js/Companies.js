// This is the object that represents a list of companies and the functions that you could use to work with companies


function Companies() {
    this.companies = [];
    this.addCompany = function(company) {
        this.companies.push(company);
    };
    this.renderTable = function() {
        //companies.addCompany(comp1);
        for (var i = 0; i < this.companies.length; i++) {
            $("#tableBody").append(`<tr scope="row""  data-id=${this.companies[i].id}>    
            <td class="company-logo text-center"><img class="img rounded-circle  align-middle"src=${this.companies[i].logo} style="width:50px;"/></td>
                <td class="fullname"><p>${this.companies[i].name}</p></td>
                    <td class="company-email">${this.companies[i].email}</td>
                    <td class="company-registered">${this.companies[i].phone}</td>
                    <td class="company-city">${this.companies[i].address.city}</td>
                    <td class="company-registered">${this.companies[i].descripcion}</td>
                    <td class="company-registered">${this.companies[i].socialnetworks.facebook}</td>
                    <td class="options text-center">
                    <button  type="button" onclick="showInfo(${this.companies[i].id})"   class="btn  btn-sm btn-outline-info preview-company " data-toggle="modal" data-target="#ordine"><i class="far fa-eye"></i></button>
                    <button type="button" rel="tooltip"   class="btn btn-sm  btn-outline-secondary edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
                    </button>
                    <button type="button" class="my-2 btn  remove-company  btn-sm btn-outline-danger" onclick="removeCompanyFromDOM(${this.companies[i].id})" ><i class="far fa-trash-alt"></i></button></td>
                </tr>`);
        }
    };
    this.getCompanyById = function(id) {
        var company = this.companies.filter(function(company) {
            return company.id == id
        });
        return company[0];
    }
}