import {apiCall} from "../../Services/api";

export async function getTimesheetsClientJob(jobID) {
    return apiCall("GET", `/api/timesheets/${jobID}`);
}

export async function getEmployee(employeeID){
    return apiCall("GET", `/api/employees/${employeeID}`);
}