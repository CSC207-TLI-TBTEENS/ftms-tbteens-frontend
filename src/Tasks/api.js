import {apiCall} from "../Services/api";

const TASKAPI = "/api/tasks/";
const SESSIONAPI = "/api/tasks/sessions";

// Get Tasks
export async function getTasks(timesheet_id) {
    return apiCall('GET', `/api/timesheets/${timesheet_id}/tasks`);
}

// export async function getTasks(jobId, employeeID) {
//     return apiCall('GET', TASKAPI + jobId + "/" + employeeID);
// }

// Create Task
export async function createTask(input) {
    let timesheet_id = input.timesheet; 

    return apiCall('POST',`/api/timesheets/${timesheet_id}/tasks`, {...input});
}

// Delete Task
export async function deleteTask(input) {
    let address = TASKAPI + input.toString();
    return apiCall('DELETE', address, {...input});
}


//Edit Task
export async function editTask(input) {
    let id = input.id.toString();
    let starttime = input.starttime;
    let endtime = input.endtime;
    let address = (SESSIONAPI + id + "&starttime=" + starttime + "&endtime=" + endtime);
    return apiCall('PUT', address, {...input});
    
}

