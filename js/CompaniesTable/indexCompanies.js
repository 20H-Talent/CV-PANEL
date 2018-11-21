var companies = new Companies();

function getCompanyFromAPI() {
    generalConstructor.construct("companies-table");
    $.getJSON("https://cv-mobile-api.herokuapp.com/api/companies")
        .done(function(data) {
            $.each(data, function(i, item) {
                var company = new Company(
                    data[i]._id,
                    data[i].name,
                    data[i].docType,
                    data[i].docNumber,
                    data[i].email,
                    data[i].website,
                    data[i].address,
                    data[i].socialUrls,
                    data[i].logo,
                    data[i].bio,
                    data[i].employees,
                    data[i].phone,
                    data[i].registeredDate,
                    data[i].jobOffers,
                );
                companies.addCompany(company);
            });
            companies.renderCompaniesTable(companies.companies);
            $(window).on("resize", function() {
                let width = $(this).width();
                const companyContainer = $(".main-container-companies");
                const tableBodyCompanies = companyContainer.find("#company-table tbody");
                let cardDiv = $("#card-container-company");
                if (width > 868) {
                    companies.renderCompaniesTable(companies.companies);
                    console.log('companies.companies :', companies.companies);
                } else {
                    companies.renderCompanyCards();
                }
            });
        });

}