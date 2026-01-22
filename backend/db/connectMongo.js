import  mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const ConnectDB = async ()=>{
  try {
    console.log(process.env.MONGO_URL);
    
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
  }
}
  