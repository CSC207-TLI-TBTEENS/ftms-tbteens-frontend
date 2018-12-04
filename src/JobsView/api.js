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

<<<<<<< HEAD
<<<<<<< HEAD
=======
export async function getJobFromId(id) {
    return apiCall("GET", JOBAPI + id + "/timesheet");
}

>>>>>>> 7b5fccd... Added client user view, and made it possible to add jobs attached to companies
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
<<<<<<< HEAD
}

=======
export async function getJobFromId(id) {
    return apiCall("GET", JOBAPI + id);
}
>>>>>>> f104e63... Enabled job title and description visibility in timesheets

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
>>>>>>> 7b5fccd... Added client user view, and made it possible to add jobs attached to companies
}