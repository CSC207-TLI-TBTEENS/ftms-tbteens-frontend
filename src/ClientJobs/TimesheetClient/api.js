import {apiCall} from "../../Services/api";

export async function getTimesheetsClientJob(jobID) {
    return apiCall("GET", `/api/timesheets/${jobID}`);
}
//Timesheet Approval and rejection backend apiCalls
export async function rejectTimesheet(timesheetID){
    return apiCall("PUT", `/api/timesheet/reject/${timesheetID}`)
}

export async function approveTimesheet(timesheetID){
    return apiCall("PUT", `/api/timesheet/approve/${timesheetID}`)
}