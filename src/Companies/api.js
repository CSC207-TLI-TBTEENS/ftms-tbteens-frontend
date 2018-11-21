const COMPANYAPI = "/api/companies/";

export async function deleteCompany(input) {
    let address = COMPANYAPI + input.toString();
    console.log(address)
    return fetch(address, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    })
    // .then(resp => {return ValidateHTTPStatus(resp)})
} 

export async function editCompany(input) {
    console.log(input)
    let id = input.id.toString();
    let name = input.name;
    let logo = input.logo;
    let email = input.email;
    let phone = input.number;
    let address = (COMPANYAPI + id + "?name=" + name + "&logo=" + 
                logo + "&email=" + email + "&phone=" + phone);
    console.log({...input})
    return fetch(address, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
    })
    .then(resp => {return ValidateHTTPStatus(resp)})
}

export async function getCompanies() {
    return fetch(COMPANYAPI)
    .then(resp => {return ValidateHTTPStatus(resp)});
}

export async function createCompany(input) {
    return fetch(COMPANYAPI, {
        method: "post",
        headers: new Headers({
            "Content-Type" : "application/json"
        }),
        body: JSON.stringify({...input})
    })
    .then(resp => {return ValidateHTTPStatus(resp)});
}

function ValidateHTTPStatus(resp) {
    if (!resp.ok) {
        if(resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
                let err = {errorMessage : data.message};
                throw err;
            });
        } else {
            let err = {errorMessage: "Server is not responding!"}
            throw err;
        }
    }
    return resp.json();
}