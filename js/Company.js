function Company(
    id,
    name,
    CIF,
    email,
    socialnetworks,
    logo,
    descripcion,
    workersNumber,
    phone,
    address,
    socialnetworks
) {
    this.id = id;
    this.socialnetworks = socialnetworks;
    this.address = address;
    this.name = name;
    this.CIF = CIF;
    this.email = email;
    this.socialnetworks = socialnetworks;
    this.logo = logo;
    this.descripcion = descripcion;
    this.workersNumber = workersNumber;
    this.phone = phone;

    this.showInfo = function() {
        setTimeout($("#modal").html(
            `<div class="shadow-lg p-3 bg-dark rounded" >
            <div class="card-header d-flex bg-info flex-row align-items-center">
               <img class="img-fluid mr-2" src=${this.logo} width=120px height:60px  alt="test"/>
              <div class=" text-light">
              <h4 class="modal-title"> <p>${this.name}</p></h4></div>
            </div>
           <div class="text-light">
           <div class="card-subtitle mt-3">Email:  <p><a href="mailto:${this.email}">${this.email}</a></p> </div>
           <div class="card-subtitle">Profile:  <p>${this.descripcion}</p> </div>
           <div class="card-subtitle">Phone:  <p>${this.phone}</p> </div>
           <div class="card-subtitle">Numbers of workers:  <p>${this.workersNumber}</p> </div>
           <div class="card-subtitle">Address:  <p>${this.address.country} ~ ${this.address.city} ${this.address.street} / ${this.address.zipcode}</p> </div>
           <div class="card-footer  bg-info text-right">
           </div>
         </div> `
        ), 6000);
        console.log('this.id :', this.id);

    };
}