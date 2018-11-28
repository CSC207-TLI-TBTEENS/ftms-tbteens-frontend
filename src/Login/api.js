import {apiCall} from "../Services/api";
const RECOVERYAPI = "/api/recovery"

export async function verifyRecoverPassword(input) {
    console.log({...input})
    const address = RECOVERYAPI + "/password";
    return apiCall('POST', address, {...input});
}

export async function verifyRecoverEmailOrBoth(input) {
    console.log({...input})
    const address = RECOVERYAPI + "/emailboth";
    return apiCall('POST', address, {...input});
}
