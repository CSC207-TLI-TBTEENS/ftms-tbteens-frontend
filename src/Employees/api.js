import {apiCall} from "../Services/api";
const EMPLOYEEAPI = "/api/employees/";

// Get Employees
export async function getEmployees() {
    return apiCall('GET',EMPLOYEEAPI);
}

// Create Employee
export async function createEmployee(input) {
    return apiCall('POST',EMPLOYEEAPI, {...input});
}

// Edit Employee
export async function editEmployee(input) {
    return apiCall('PUT', EMPLOYEEAPI, {...input});
}

// Delete Employee
export async function deleteEmployee(input) {
    let address = EMPLOYEEAPI + input.toString();
    return apiCall('DELETE', address, {...input});
}

// get Jobs from Employee
export async function getJobsFromEmployee(input) {
    const EMPLOYEEJOBS = `${EMPLOYEEAPI}/${input}/jobs`;
    return apiCall('GET', EMPLOYEEJOBS);
}

export async function getTimesheetsFromEmployee(employeeID){
    console.log(employeeID)
    return apiCall('GET', `/api/timesheets/employee/${employeeID}`)
}