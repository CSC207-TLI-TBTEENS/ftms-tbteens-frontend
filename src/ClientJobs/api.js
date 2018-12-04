import {apiCall} from "../Services/api";
const JOBAPI = "/api/jobs/";
const JOBEMPLOYEES = JOBAPI + "employees/";

export async function getJobs(company_id) {
    return apiCall("GET", `/api/companies/${company_id}/jobs`);
}

export async function createJob(company_id, input) {
    return apiCall("POST", `/api/companies/${company_id}/jobs`, {...input});
    
}

export async function getEmployeesFromJob(input) {
<<<<<<< HEAD
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
=======
    return apiCall("POST", JOBEMPLOYEES, {...input});
>>>>>>> 7b5fccd... Added client user view, and made it possible to add jobs attached to companies
}