import { apiCall} from "../Services/api";

const JOBAPI = "/api/jobs/";
const TASKAPI = "/api/tasks";
const JOBEMPLOYEES = JOBAPI + "employees"
let newtimesheet= {job: "", employee: " "};

export async function getAllJobs() {
    return apiCall('GET', JOBAPI);
}

//Assign Job 
export async function assignJob(timesheet){
    if (newtimesheet.job != timesheet.job && newtimesheet.employee != timesheet.employee){
        newtimesheet = {job: timesheet.job, employee: timesheet.employee}
        return apiCall("PUT","/api/jobsassign" ,  {...newtimesheet});
    }
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