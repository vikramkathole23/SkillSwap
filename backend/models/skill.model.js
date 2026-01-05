import skillSchema from "../schemas/Skill.schema.js";
import mongoose from "mongoose";

const skill = mongoose.model('skill', skillSchema);

export default skill;