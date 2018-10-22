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
    this.renderSocialNetworks = function() {
        var divCol = document.createElement("div");
        console.log("social", this.socialnetworks);
        // var objectResult = Object.keys(this.socialnetworks)
        console.log('objectResult :', objectResult);
        // for (let i = 0; i < objectResult.length; i++) {
        //     console.log("entro al goro");
        //     var network = objectResult[i];
        //     console.log("NETWORK", network);
        //     var innerNetwork = "<a href='" + network + "'title='" + network + "'><i class='fab ml-3 btn" + network + "  fa-lg fa-" + network + "'></i></a>";
        //     console.log("innerNetwork", innerNetwork);
        //     divCol.innerHTML = divCol.innerHTML + innerNetwork;
        // };


        // for (let social in this.socialnetworks) {
        //     console.log("entro al goro");
        //     console.log("NETWORK", this.socialnetworks[social]);
        //     var innerNetwork = "<a href='" + this.socialnetworks[social] + "'title='" + this.socialnetworks[social] + "'><i class='fab ml-3 btn " + this.socialnetworks[social] + "  fa-lg fa-" + this.socialnetworks[social] + "'></i></a>";
        //     console.log("innerNetwork", innerNetwork);
        //     divCol.innerHTML = divCol.innerHTML + innerNetwork;
        // }
        console.log('divCol :', divCol.innerHTML);
        console.log(this.id);
        console.log('divCol.innerHTML :', divCol.innerHTML);
        return divCol.innerHTML;
        // return divCol;
    }
}