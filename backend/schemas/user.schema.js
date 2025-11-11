import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
// const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // bio:{
    //     type:String,

    // },
    // location:{
    //     type:String,
    // },
    // profile_pic:{
    //     type:String,
    // }
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill",
        required: true
      },
    ],
  },
  { timestamps: true }
);


// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

export default UserSchema;
