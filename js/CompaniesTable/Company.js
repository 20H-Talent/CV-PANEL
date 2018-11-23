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
}