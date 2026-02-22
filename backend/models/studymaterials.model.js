// import skillSchema from "../schemas/Skill.schema.js";

import mongoose from "mongoose";
import studyMaterialsSchema from "../schemas/studymaterials.schema.js";

const studymaterial = mongoose.model('studymaterial', studyMaterialsSchema);

export default studymaterial;