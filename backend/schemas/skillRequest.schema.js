import mongoose from 'mongoose';
const { Schema } = mongoose;

const SkillRequestSchema=new Schema({
    sender_id:{
        type:Schema.Types.ObjectId,
        Ref:'user',
        required:true,
    },
    receiver_id:{
        type:Schema.Types.ObjectId,
        Ref:'user',
        required:true,
    },
    skill_id:{
        type:Schema.Types.ObjectId,
        Ref:'skill',
        required:true,
    },
    request_status:{
        type:String,
        required:true,
    }


},{timestamps:true})

export default SkillRequestSchema;