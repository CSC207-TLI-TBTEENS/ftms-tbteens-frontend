import { apiCall} from "../Services/api";

const JOBAPI = "/api/jobs/";
const JOBEMPLOYEES = "/api/jobs/employees/";

export async function getJobs() {
    return apiCall("GET",JOBAPI);
}

export async function getEmployeesFromJob(input) {
    let address = JOBEMPLOYEES + input.toString();
    return apiCall("GET", address);
}

export async function getJobsFromEmployee(input) {
    let address = "api/jobs/getfromemployee/" + input.toString();
    return apiCall('GET', address);
}

export async function getJobCompletion(input) {
    let address = "api/timesheet/completion/" + input.toString();
    return apiCall('GET', address)
}

export async function getJobFromId(id) {
    return apiCall("GET", JOBAPI + id + "/timesheet");
}

export async function deleteJob(input) {
    let address = JOBAPI + input.toString();
    return apiCall("DELETE", address, {...input});
} 

export async function editJob(input) {
    let id = input.id.toString();
    let siteName = input.siteName;
    let description = input.description;
    let address = (JOBAPI + id + "?siteName=" + siteName + "&description=" + 
                description);
    return apiCall("PUT", address);
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