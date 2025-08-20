import UserSkillSchema from "../schemas/userSkill.schema";
import mongoose from "mongoose";

const UserSkill = mongoose.model('userskill', UserSkillSchema);

export default UserSkill;