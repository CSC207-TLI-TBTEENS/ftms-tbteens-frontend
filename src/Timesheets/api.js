const TIMESHEETAPI = "/api/timesheets/";

export async function getTimesheets() {
    return fetch(TIMESHEETAPI)
    .then(resp => {return ValidateHTTPStatus(resp)});
}

export async function createTimesheet(input) {
    return fetch(TIMESHEETAPI, {
        method: "post",
        headers: new Headers({
            "Content-Type" : "application/json"
        }),
        body: JSON.stringify({...input})
    })
    .then(resp => {return ValidateHTTPStatus(resp)});
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