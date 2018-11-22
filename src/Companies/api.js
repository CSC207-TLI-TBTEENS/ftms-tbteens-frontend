import request from "../Services/apiServices";
const COMPANYAPI = "/api/companies/";

export async function deleteCompany(input) {
    let address = COMPANYAPI + input.toString();
    return request({
        url: address,
        method: "DELETE",
    })
} 

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
    })
}

export async function getCompanies() {
    return request({
         url: COMPANYAPI,
         method: 'GET'
    })
}

export async function createCompany(input) {
    return fetch({
        url: COMPANYAPI,
        method: "POST",
        body: JSON.stringify({...input})
    })
}