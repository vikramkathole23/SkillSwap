import UserSchema from "../schemas/user.schema.js";
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model('user', UserSchema);

export default User;