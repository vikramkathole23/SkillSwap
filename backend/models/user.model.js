import UserSchema from "../schemas/user.schema.js";
import mongoose from "mongoose";

const User = mongoose.model('user', UserSchema);

export default User;