import { apiCall} from "../Services/api";
const JOBAPI = "/api/jobs/";
const JOBEMPLOYEES = JOBAPI + "employees/"

export async function getAllJobs() {
    return apiCall('GET', JOBAPI);
}

//Assign Job 
export async function assignJob(jobID, employeeID){
    return apiCall("PUT",`/api/jobs/${jobID}/assign/${employeeID}`);
}

//Remove Job 
export async function removeJob(jobID, employeeID){
    return apiCall("DELETE",`/api/jobs/${jobID}/remove/${employeeID}`);
}

export async function getEmployeesFromJob(input) {
    return apiCall("GET", JOBEMPLOYEES + input);
}