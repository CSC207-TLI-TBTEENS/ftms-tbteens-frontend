import {apiCall} from "../Services/api";
export async function getUser(input){
    console.log(input)
    return apiCall("GET", "/api/employees/individual", input)
}