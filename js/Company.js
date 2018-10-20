function Company(
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
        $("#modal").html(
            `<span>${this.logo} </span>
                   <span>${this.email} </span>
                   <span>${this.phone} </span>
                   <span>${this.descripcion} </span>
                  <span>${this.socialnetworks.facebook} </span>`
        );
    };
}