import { apiCall} from "../Services/api";

const NOTIFICATIONAPI = "/api/notifications/";

export async function getNotifications(userId){
    console.log(userId)
    return apiCall('GET', NOTIFICATIONAPI + userId);
}

