import {apiCall} from "../Services/api";

const TASKAPI = "/api/tasks/";

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
    let taskName = input.taskName;
    let taskDescription = input.taskDescription
    let startTime = input.overallStartTime;
    let endTime = input.overallEndTime;
    let duration = input.totalDuration;
    
    
    let address = (TASKAPI + id + "?taskname=" + taskName + "&sdescription=" + taskDescription + "&st=" + startTime + "&et=" + endTime + "&duration=" + duration);
    return apiCall('PUT', address, {...input});
    
}
