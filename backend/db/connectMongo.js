import  mongoose  from "mongoose";

export const ConnectDB = async ()=>{
  try {
    mongoose.connect('mongodb://localhost:27017/SkillSwap')
    .then(() => console.log('Connected!'));
  } catch (error) {
    console.log(error);
    
  }
}
  