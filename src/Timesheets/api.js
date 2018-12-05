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

// //Edit Task
// export async function editTask(input) {
//     let id = input.id.toString();
//     let taskname = input.taskname;
//     let starttime = input.starttime;
//     let endtime = input.endtime;
//     let address = (TASKAPI + id + "?taskname=" + taskname + "&starttime=" + starttime + "&endtime=" + endtime);
//     return apiCall('PUT', address, {...input});
    
// }

//Below is for one spcific Task

//Edit Session
export async function editSession(input) {
    let id = input.id.toString();
    let starttime = input.starttime;
    let endtime = input.endtime;
    let address = (SESSIONAPI + id + "&starttime=" + starttime + "&endtime=" + endtime);
    return apiCall('PUT', address, {...input});
}