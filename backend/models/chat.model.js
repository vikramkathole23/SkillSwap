import ChatSchema from "../schemas/chat.schema";
import mongoose from "mongoose";

const chat = mongoose.model('chat', ChatSchema);

export default chat;