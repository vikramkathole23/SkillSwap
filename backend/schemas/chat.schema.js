import mongoose from 'mongoose';
const { Schema } = mongoose;

const ChatSchema = new Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: "string",
      default: "",
      trim:true
    },
   seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);



export default ChatSchema;