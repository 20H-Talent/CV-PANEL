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
                    <td class="company-email"> <a href="${this.companies[i].email}" target="_blank" class=" btn-email btn-xs mr-2"><i class="fa fa-envelope"></i></a>${this.companies[i].email}</td>
                    <td class="company-registered">${this.companies[i].phone}</td>
                    <td class="company-city">${this.companies[i].address.city}</td>
                    <td class="company-registered">${this.companies[i].descripcion}</td>
                    <td class="company-registered">
                    <div class="container">
    <div class="row">
   
    <div class="col-md-12 text-center">
    
     <a href="${this.companies[i].socialnetworks.linkedin}" target="_blank"><i class="fab fa-lg fa-linkedin "></i></a>
      <a href="${this.companies[i].socialnetworks.instagram}" target="_blank"><i class="fab fa-lg fa-instagram"></i></a>
      <a href="${this.companies[i].socialnetworks.twitter}" target="_blank><i class="fab fa-lg fa-twitter"></i></a>
      <a href="${this.companies[i].socialnetworks.youtube}" target="_blank"><i class="fab fa-lg fa-youtube text-danger"></i></a>
      <a href="${this.companies[i].socialnetworks.facebook}" target="_blank" ><i class="fab fa-lg fa-facebook-square"></i></a>
    </div>
</div>
</div></td>
                    <td class="options text-center">
                    <button  type="button" onclick="showInfo(${this.companies[i].id})"   class="btn  btn-sm bg-light btn-ldeep-purple preview-company " data-toggle="modal" data-target="#ordine"><i class="far fa-eye"></i></button>
                    <button type="button" rel="tooltip"   class="btn btn-sm bg-light btn-ldeep-purple  edit-company " data-original-title="" title=""><i class="fas fa-user-edit"></i>
                    </button>
                    <button type="button" class="my-2 btn  remove-company  btn-sm bg-light btn-ldeep-purple " onclick="removeCompanyFromDOM(${this.companies[i].id})" ><i class="far fa-trash-alt"></i></button></td>
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