import mongoose from 'mongoose';
const { Schema } = mongoose;

const SkillSchema=new Schema({
    skillName:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false
    },
    profession:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    proficiency:{
        type:String,
        required:true
    }
},{timestamps:true})

export default SkillSchema;