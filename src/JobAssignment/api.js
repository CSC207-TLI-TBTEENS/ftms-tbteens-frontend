import { apiCall} from "../Services/api";

const JOBAPI = "/api/jobs/";
const TASKAPI = "/api/tasks";
const JOBEMPLOYEES = JOBAPI + "employees"

export async function getJobsFromEmployee(input) {
    return fetch(JOBEMPLOYEES, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({...input})
    })
    .then(resp => {return ValidateHTTPStatus(resp)})
}


export async function assignJob(selection){
    return apiCall("PUT","/api/jobsassign",  {...selection});
}


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
}