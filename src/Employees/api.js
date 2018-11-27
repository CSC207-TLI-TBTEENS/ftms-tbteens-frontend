import request from "../Services/apiServices";
const SIGNUPEMPLOYEE = "/api/auth/signup";
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
    console.log(JSON.stringify({...input}))
    return request({
        url: SIGNUPEMPLOYEE,
        method: 'POST',
        body: JSON.stringify({...input})
    });
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
    return request({
        url: address,
        method: "PUT",
        body: {...input}
    })
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
