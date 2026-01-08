
import { constants } from "crypto";
import User from "../models/user.model.js"

export const IsEmailVerify =async (req,res,next)=>{
   try {
     const {email} = req.body;
     const user = await User.findOne({email});
     if (!user) {
        return res
        .status(404)
        .json({ message: "Please,Enter your valid registered Email!", success: false });
     }
    //  console.log(user)
     const isVarify = user?.isVerify;
    //  console.log(isVarify)
    if (!isVarify) {
        return res
        .status(403)
        .json({ message: "Please,Verify your Email!", success: false });
    }

    next()

   } catch (error) {
    console.log(error)
     return res
        .status(501)
        .json({ message: "Server error, Try again!", success: false });

   }
}