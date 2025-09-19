import notificationSchema from "../schemas/notification.schema";
import mongoose from "mongoose";

const NotificationModel = mongoose.model('notification', notificationSchema);

export default NotificationModel;