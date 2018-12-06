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

export async function getRecoveryCodeForPassword(input) {
    console.log(input)
    const address = RECOVERYAPI + "/getcode/password/" + input;
    return apiCall('POST', address, input);
}

export async function getRecoveryCodeForEmailOrBoth(input) {
    console.log(input)
    const address = RECOVERYAPI + "/getcode/email/" + input;
    return apiCall('POST', address, input);
}

export async function getUserIdByName(input) {
    const address = RECOVERYAPI + "/getuserid/name";
    return apiCall('POST', address, input);
}

export async function getUserIdByEmail(input) {
    console.log(input);
    const address = RECOVERYAPI + "/getuserid/email";
    return apiCall('POST', address, input);
}

export async function verifyCodeForPasswordRecovery(input) {
    const address = RECOVERYAPI + '/verifycode/password';
    return apiCall('POST', address, input);
}

export async function changePassword(input) {
    console.log(input)
    const address = RECOVERYAPI + '/changepassword';
    return apiCall('POST', address, input);
}