import request from "../Services/apiServices";
const RECOVERYAPI = "/api/recovery"

export async function verifyRecoverPassword(input) {
    const email = input.email;
    const url = RECOVERYAPI + "/password" + "?email=" + email; 
    let result = request({
        url: url,
        method: 'POST'
    })
    console.log(result)
    return result
}

export async function verifyRecoverEmailOrBoth(input) {
    console.log(input)
    const phone = input.phone;
    const firstname = input.firstname;
    const lastname = input.lastname;
    const url = RECOVERYAPI + "/emailboth" + "?phone=" + phone + "&firstName=" + firstname + "&lastName=" + lastname;
    return request({
        url: url,
        method: 'POST'
    })
}
