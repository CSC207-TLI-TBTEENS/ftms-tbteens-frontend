const JOBAPI = "/api/jobs/";
const JOBEMPLOYEES = JOBAPI + "employees";

export async function getJobs() {
    return fetch(JOBAPI)
    .then(resp => {return ValidateHTTPStatus(resp)});
}

export async function getEmployeesFromJob(input) {
    return fetch(JOBEMPLOYEES, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({...input})
    })
    .then(resp => {return ValidateHTTPStatus(resp)})
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