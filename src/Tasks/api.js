import {apiCall} from "../Services/api";

const TASKAPI = "/api/tasks/";

// Get Tasks
export async function getTasks(timesheet_id) {
    return apiCall('GET', `/api/timesheets/${timesheet_id}/tasks`);
}

export async function getTaskByID(input) {
    return apiCall('GET', `/api/tasks/${input}`);
}

export async function getSessionsByTaskID(input) {
    return apiCall('GET', `/api/sessions/bytask/${input}`);
}

export async function getSessionBySessionID(input) {
    return apiCall('GET', `/api/sessions/byid/${input}`);
}

export async function startNewSession(input) {
    return apiCall('POST', `/api/sessions/create/${input}`);
}

export async function endSession(input) {
    return apiCall('POST', `/api/sessions/end/${input}`);
}

// Create Task
export async function createTask(input) {
    console.log(input)
    let timesheet_id = input.timesheet; 

    return apiCall('POST',`/api/timesheets/${timesheet_id}/tasks`, {...input});
}

// Create a new part request
export async function createPartRequest(input) {
    return apiCall('POST', "/api/tasks/parts", input);
}

// Delete Task
export async function deleteTask(input) {
    let address = TASKAPI + input.toString();
    return apiCall('DELETE', address, {...input});
}

//Edit Task
export async function editTask(input) {
    return apiCall('PUT', `/api/tasks/${input.id}`, {name: input.name, description: input.description});
    
}

