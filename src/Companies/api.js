import request from "../Services/apiServices";

const COMPANYAPI = "/api/companies/";


// Get Employees
export async function getCompanies() {
    return request({
        url: COMPANYAPI,
        method: "GET"
    })
}

// Create a Company
export async function createCompany(input) {
    return request({
        url: COMPANYAPI,
        method: "POST",
        body: JSON.stringify({...input})
    })
}

// Delete a Company
export async function deleteCompany(input) {
    let address = COMPANYAPI + input.toString();
    return request({
        url: address,
        method: "DELETE",
    })
} 

// Edit a Company
export async function editCompany(input) {
    let id = input.id.toString();
    let name = input.name;
    let logo = input.logo;
    let email = input.email;
    let phone = input.number;
    let address = (COMPANYAPI + id + "?name=" + name + "&logo=" + 
                logo + "&email=" + email + "&phone=" + phone);
    return request({
        url: address,
        method: "PUT",
        body: {...input}
    })
}