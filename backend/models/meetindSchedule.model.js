import meetingScheduleSchema from "../schemas/meetingSchedule.schema.js";
import mongoose from "mongoose";

const meeting =  mongoose.model('meeting', meetingScheduleSchema);

export default meeting;