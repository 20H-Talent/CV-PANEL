function Company(

    id,
    name,
    docType,
    docNumber,
    email,
    website,
    address,
    socialUrls,
    logo,
    bio,
    employees,
    phone,
    registeredDate,
    jobOffers
) {
    this.id = id;
    this.docType = docType;
    this.docNumber = docNumber;
    this.website = website;
    this.address = address;
    this.name = name;
    this.email = email;
    this.logo = logo;
    this.bio = bio;
    this.employees = employees;
    this.phone = phone;
    this.socialUrls = socialUrls;
    this.jobOffers = jobOffers;
    this.registeredDate = registeredDate;
    // this.renderSocialNetworks = function() {
    //  var divCol = document.createElement("div");
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
    //     let innerNetwork = "";
    //     for (let social in this.socialnetworks) {
    //         innerNetwork += `<a href="${social}" title="${social}"><i style="z-index: 10;" class="fab ml-1 btn-${social} text-center  fa-lg fa-${social}"></i></a>`;
    //     }
    //     divCol.innerHTML = innerNetwork;
    //     return divCol.innerHTML;
    // }
}