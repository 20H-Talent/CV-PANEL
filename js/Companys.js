function Companies() {
    this.companies = [];
    this.addCompany = function(company) {
        this.companies.push(company);
    };
    this.renderTable = function() {
        console.log("entro aqui", this.companies);
        //companies.addCompany(comp1);
        for (var i = 0; i < this.companies.length; i++) {
            console.log("algo", i);
            $("#tableBody").append(`<tr scope="row">
                <td class="company-logo user-avatar  pl-5"><img class="img text-center align-middle"src=${this.companies[i].logo} style="width:50px;"/></td>
                 <td class="fullname"><p>${this.companies[i].name}</p></td>
                      <td class="company-email">${this.companies[i].email}</td>
                      <td class="company-registered">${this.companies[i].phone}</td>
                      <td class="company-city">${this.companies[i].address.city}</td>
                      <td class="company-registered">${this.companies[i].descripcion}</td>
                      <td class="company-registered">${this.companies[i].socialnetworks.facebook}</td>
                      <td class="options text-center">
                      <button  type="button" onclick=" ${this.companies[i].showInfo()}" class="btn btn-danger" data-toggle="modal" data-target="#ordine"><i class="far fa-eye"></i></button>
                      <button type="button" rel="tooltip" id="editForm" class="btn btn-outline-success btn-just-icon btn-sm" data-original-title="" title=""><i class="fas fa-user-edit"></i>
                      </button>
                      <button type="button" class=" id="deleteCompany" my-2 btn btn-outline-danger btn-sm " data-toggle="modal" data-target="#delete" data-uid="2"><i class="far fa-trash-alt"></i></button></td>
                 </tr>`);
        }
    };
    // this.buttonOpciones = function() {
    //     for (var i = 0; i < this.companies.length; i++) {
    //         setTimeout($("#modal").append(
    //             `<span>${this.companies[i].logo} </span>
    //                <span>${this.companies[i].email} </span>
    //                <span>${this.companies[i].phone} </span>
    //                <span>${this.companies[i].descripcion} </span>
    //               <span>${this.companies[i].socialnetworks.facebook} </span>`
    //         ), 6000);
    //     }
    // };
}
// a ver si funciona