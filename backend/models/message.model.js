import mongoose from "mongoose";
import MessageSchema from "../schemas/message.schema";


const messageModel = mongoose.model('message', MessageSchema);

export default messageModel;