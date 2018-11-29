import {apiCall} from "../Services/api";
const EMPLOYEEAPI = "/api/employees/";

// Get Employees
export async function getEmployees() {
    return apiCall('GET',EMPLOYEEAPI);
}

// Create Employee
export async function createEmployee(input) {
    console.log({...input})
    return apiCall('POST',EMPLOYEEAPI, {...input});
}

// Edit Employee
export async function editEmployee(input) {
    let id = input.id.toString();
    let firstname = input.firstname;
    let lastname = input.lastname;
    let email = input.email;
    let phone = input.number;
    let address = (EMPLOYEEAPI + id + "?firstName=" + firstname + "&lastName=" + 
                    lastname + "&email=" + email + "&phone=" + phone);
    return apiCall('PUT', address, {...input});
}

// Delete Employee
export async function deleteEmployee(input) {
    let address = EMPLOYEEAPI + input.toString();
    return apiCall('DELETE', address, {...input});
}

// get Jobs from Employee
export async function getJobsFromEmployee(input) {
    const EMPLOYEEJOBS = EMPLOYEEAPI + "jobs";
    return apiCall('POST', EMPLOYEEJOBS, {...input});
}
