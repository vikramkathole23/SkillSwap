import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema=new Schema({
      reviewSender_id:{
        type:Schema.Types.ObjectId,
        Ref:'user',
        required:true,
      },
      reviewReceiver_id:{
        type:Schema.Types.ObjectId,
        Ref:'user',
        required:true,
      },
      rating:{
        type:Number,
        required:true,
      },
      Comment:{
        type:String,
        required:true,
      }
})

export default ReviewSchema;