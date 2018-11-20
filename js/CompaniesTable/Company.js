function Company(
  id,
  name,
  CIF,
  email,
  v,
  logoURL,
  bio,
  employees,
  phone,
  address,
  website
) {
  this.id = id;
  this.website = website;
  this.address = address;
  this.name = name;
  this.CIF = CIF;
  this.v = v;
  this.email = email;
  this.logoURL = logoURL;
  this.bio = bio;
  this.employees = employees;
  this.phone = phone;
  this.registeredDate = Date.now();
}
