import {apiCall} from "../Services/api";

const TASKAPI = "/api/tasks/";
const SESSIONAPI = "/api/tasks/sessions";



// Get Tasks
export async function getTask() {
    return apiCall('GET',TASKAPI);
}

// Create Tasks
export async function createTask(input) {
    console.log({...input})
    return apiCall('POST',"/api/auth/signup", {...input});
}



// Delete Task
export async function deleteTask(input) {
    let address = TASKAPI + input.toString();
    return apiCall('DELETE', address, {...input});
}



//Below is for one spcific Task

//Edit Session
export async function editSession(input) {
    let id = input.id.toString();
    let starttime = input.starttime;
    let endtime = input.endtime;
    let address = (SESSIONAPI + id + "&starttime=" + starttime + "&endtime=" + endtime);
    return apiCall('PUT', address, {...input});
}

//Edit Task
export async function editTask(input) {
    let id = input.id.toString();
    let taskName = input.taskName;
    let taskDescription = input.taskDescription
    let startTime = input.overallStartTime;
    let endTime = input.overallEndTime;
    let duration = input.totalDuration;
    
    
    let address = (SESSIONAPI + id + "?taskname=" + taskName + "&sdescription=" + taskDescription + "&st=" + startTime + "&et=" + endTime + "&duration=" + duration);
    return apiCall('PUT', address, {...input});
    
}