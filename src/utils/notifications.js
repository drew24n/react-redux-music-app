import {notification} from "antd";

export const notificationError = (message) => notification.error({
    message: message.toString(), duration: 5, placement: 'bottomRight'
})