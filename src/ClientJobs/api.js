import {apiCall} from "../Services/api";
const JOBAPI = "/api/jobs/";
const JOBEMPLOYEES = JOBAPI + "employees/";

export async function getJobs() {
    return apiCall("GET", JOBAPI);
}


export async function createJob(input) {
    return apiCall("POST", JOBAPI, {...input});
    
}

export async function getEmployeesFromJob(input) {
  return apiCall('GET', JOBEMPLOYEES + input);
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