import { apiCall} from "../Services/api";

const NOTIFICATIONAPI = "/api/notifications/";
const ISREADAPI = "/api/notifications/isRead/";

export async function getNotifications(userId){
    return apiCall('GET', NOTIFICATIONAPI + userId);
}

export async function updateIsRead(notificationId) {
    return apiCall('PUT', ISREADAPI + notificationId);
}

