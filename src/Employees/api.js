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
    return apiCall('POST',"/api/auth/signup", {...input});
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
    return apiCall('PUT',address, {...input});
}

// Delete Employee
export async function deleteEmployee(input) {
    let address = EMPLOYEEAPI + input.toString();
    return apiCall('DELETE',address, {...input});
}

// get Jobs from Employee
export async function getJobsFromEmployee(input) {
    return apiCall('POST',EMPLOYEEJOBS, {...input});
}
