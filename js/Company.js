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
        //  divCol.classList.add("text-center");
        //  console.log("social", this.socialnetworks);
        // var objectResult = Object.keys(this.socialnetworks)
        //console.log('objectResult :', objectResult);
        // for (let i = 0; i < objectResult.length; i++) {
        //     console.log("entro al goro");
        //     var network = objectResult[i];
        //     console.log("NETWORK", network);
        //     var innerNetwork = "<a href='" + network + "'title='" + network + "'><i class='fab ml-3 btn" + network + "  fa-lg fa-" + network + "'></i></a>";
        //     console.log("innerNetwork", innerNetwork);
        //     divCol.innerHTML = divCol.innerHTML + innerNetwork;
        // };

        let innerNetwork = "";
        for (let social in this.socialnetworks) {
            innerNetwork += `<a href="${social}" title="${social}"><i style="z-index: 10;" class="fab ml-1 btn-${social} text-center  fa-lg fa-${social}"></i></a>`;
            console.log('social :', social);
        }
        divCol.innerHTML = innerNetwork;

        return divCol.innerHTML;
    }
}