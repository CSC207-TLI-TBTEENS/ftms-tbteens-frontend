import {apiCall} from "../Services/api";

const TASKAPI = "/api/tasks/";



// Get Tasks
export async function getTasks(jobId, employeeID) {
    return apiCall('GET', TASKAPI + jobId + "/" + employeeID);
}

// Create Task
export async function createTask(input) {
    console.log({...input})
    return apiCall('POST',"/api/auth/signup", {...input});
}

// Delete Task
export async function deleteTask(input) {
    let address = TASKAPI + input.toString();
    return apiCall('DELETE', address, {...input});
}

//Edit Task
export async function editTask(input) {
    let id = input.id.toString();
    let taskname = input.taskname;
    let starttime = input.starttime;
    let endtime = input.endtime;
    let address = (TASKAPI + id + "?taskname=" + taskname + "&starttime=" + starttime + "&endtime=" + endtime);
    return apiCall('PUT', address, {...input});
    
}

