import mongoose from "mongoose";

const meetingScheduleSchema = new mongoose.Schema({
  requestId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "request" 
   },
  meetingTime: {
    type: String, 
    default: "" ,
    required:true
  },
  trainer:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
  },
  learner:{
     type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
  }
  
},{ timestamps: true });

export default meetingScheduleSchema;