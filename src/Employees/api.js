import request from "../Services/apiServices";
const EMPLOYEEAPI = "/api/employees/";
const EMPLOYEEJOBS = EMPLOYEEAPI + "jobs";


// Get Employees
export async function getEmployees() {
    return request({
        url: EMPLOYEEAPI,
        method: 'GET'
    });
}

// Create Employee
export async function createEmployee(input) {
    return request({
        url: EMPLOYEEAPI,
        method: 'POST',
        body: JSON.stringify({...input})
    });
}

// Delete Employee
export async function deleteEmployee(input) {
    let address = EMPLOYEEAPI + input.toString();
    return request({
        url: address,
        method: 'DELETE',
    });
}

// get Jobs from Employee
export async function getJobsFromEmployee(input) {
    return request({
        url: EMPLOYEEJOBS,
        method: 'POST',
        body: JSON.stringify({...input})
    });
}