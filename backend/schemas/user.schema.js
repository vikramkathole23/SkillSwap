import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
// import { number } from "joi";
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
    isvarify:{
      type:Boolean,
      default:false
    },
    otp:{
      type:Number,
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
    skills: 
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "skill",
        required: true
      },
    },
  { timestamps: true }
);


// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

export default UserSchema;
