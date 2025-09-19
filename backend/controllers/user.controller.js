import User from "../models/user.model.js";
import createSecretToken from "../utils/SecretToken.js";
import bcrypt from  "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    // check user is already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exist!", success: false });
    }
    // register user 
    const user = await User.create({ email, password, fullName });

    // create a token and send to fronted in cookies
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,   // prevent JS access
      secure: false,    // set true in production (HTTPS)
      sameSite: "lax",  
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const LoginUser = async (req, res, next)=>{
  try {
    const {password,email}=req.body;
    // check we get password and email
    if( !password || !email ){
      return res
        .status(409)
        .json({ message: "All fields are required!", success: false });
    }
    // check user exist 
    const existUser = await User.findOne({email})
    if(!existUser){
      return res
        .status(409)
        .json({ message: "Incorrect password or email", success: false });
    }
    if (!existUser.password) {
      return res.status(500).json({ message: "User has no password stored" });
    }
  //  compare password
   const isMatch = await bcrypt.compare(password,existUser.password)
   if (!isMatch) {
      return res.json({message:'Incorrect password or email'}) 
    }
    
    // remove password 
    const userObj = existUser.toObject();
    delete userObj.password;
    //create a token and set cookie 
    const token = createSecretToken(existUser._id);
     res.cookie("token", token, {
      secure: false,   // true in production
      httpOnly: true,
      sameSite: "lax",  
      maxAge: 24 * 60 * 60 * 1000 
     });
     res.status(201).json({ message: "User logged in successfully", success: true, userObj});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
    
  }
}

export const UserController = async (req,res) => {
    try {
      // destructure user id from params
      const {id}=req.params;
      //find user 
      const findUser = await User.findById(id)
      // check user is exist or not
      if (!findUser) {
        return res.status(404).json({ message: "User not Found!", success: false});
      }
      // remove password  and send response
      const userObj = findUser.toObject();
      delete userObj.password;
      console.log(userObj);
      res.status(201).json({ message: "User Found  successfully", success: true, userObj});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}