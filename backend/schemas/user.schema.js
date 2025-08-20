import mongoose from 'mongoose';
import { Schema } from 'mongoose';
// const { Schema } = mongoose;

const UserSchema=new Schema({
    fullName:{
        type:String,
        required:true,
     },
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    bio:{
        type:String,

    },
    location:{
        type:String,
    },
    profile_pic:{
        type:String,
    }
},{timestamps:true})

export default UserSchema;