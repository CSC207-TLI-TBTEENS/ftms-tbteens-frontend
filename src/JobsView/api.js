const JOBAPI = "/api/jobs/";

export async function getJobs() {
    return fetch(JOBAPI)
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