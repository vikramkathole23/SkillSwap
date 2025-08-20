import SkillSchema from "../Schemas/Skill.schema.js";
import mongoose from "mongoose";

const skill = mongoose.model('skill', SkillSchema);

export default skill;