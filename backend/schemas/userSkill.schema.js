import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSkillSchema=new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        Ref:"user",
        required:true,
    },
    skillid:{
        type:Schema.Types.ObjectId,
        Ref:'skill',
        required:true,
    },
    skilltype:{
        type:String,
        required:true,
    },
    experience_year:{
        type:Number,
        rrequired:true,
    }
},{timestamps:true})

export default UserSkillSchema;