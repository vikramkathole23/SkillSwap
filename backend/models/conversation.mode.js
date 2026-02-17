
import mongoose from "mongoose";
import conversationSchema from "../schemas/conversation.schema.js";

const conversationModel = mongoose.model('conversation', conversationSchema);

export default conversationModel;