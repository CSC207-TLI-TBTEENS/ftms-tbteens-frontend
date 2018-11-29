import {apiCall} from "../Services/api";
import EmployeesList from "../JobAssignment/EmployeesList";
const EMPLOYEEAPI = "/api/employees/";
const EMPLOYEEJOBS = EMPLOYEEAPI + "jobs";


// Get Employees
export async function getEmployees() {
    return apiCall('GET',EMPLOYEEAPI);
}

// Create Employee
export async function createEmployee(input) {
    console.log({...input})
    return apiCall('POST',"/api/auth/signup", {...input});
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
    return apiCall('POST', EMPLOYEEJOBS, {...input});
}
