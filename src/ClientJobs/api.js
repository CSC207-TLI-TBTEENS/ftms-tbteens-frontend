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
  return apiCall('GET', JOBEMPLOYEES + input);
}
