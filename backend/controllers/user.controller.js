import User from "../models/user.model.js";
import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";
import passport from "passport";
import createSecretToken from "../utils/SecretToken.js";
import bcrypt from  "bcrypt";


export const registerUser = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

  //check user is already exist 
  const isUserExist = await User.findOne({email});
  if (isUserExist) {
    return res
        .status(409)
        .json({message: "User already exist!, You can login", success: false });
  }

  // register new User 
  const newUser = await User.create({email,password,fullName});
  // bcrypt password
  newUser.password = await bcrypt.hash(password,10);
  await newUser.save();
  console.log(newUser);
  return res
        .status(201)
        .json({message: "User register successfull!", success: true });

  } catch (error) {
    console.log(error);
    
    return res
        .status(500)
        .json({message: "Internal server error!", success: false });
  }
}

export const LoginUser = async ( req , res ) => {
try {
  const { email, password } = req.body;
  const findUser = await User.findOne({email});
  if (!findUser) {
    return res
      .status(404)
      .json({message:"User is not found with this email!",success:false})
  }
  const errMessage = "Auth faild email or password wrong"
  if (!findUser) {
    return res
      .status(403)
      .json({message:errMessage,success:false})
  }
  const isPassEquale = await bcrypt.compare(password,findUser.password)
  if (!isPassEquale) {
    return res
      .status(403)
      .json({message:errMessage,success:false})
  }

 const token = jwt.sign(
  { id: findUser._id, email: findUser.email },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

   return res.status(201)
   .json({ message: "Login successful", success: true , token ,email,userName:findUser.fullName });
  
} catch (error) {
  console.log(error);
  return res
    .status(500)
    .json({message: "Internal server error!", success: false });
}
}

// export const registerUser = async (req, res) => {
//   try {
//     const { email, password, fullName } = req.body;
//     // check user is already exist
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "User already exist!", success: false });
//     }
//     // register user 
//     const user = await User.create({ email, password, fullName });

//     // create a token and send to fronted in cookies
//     const token = createSecretToken(user._id);
//     console.log(token);
    
//     res.cookie("token", token, {
//       httpOnly: true,   // prevent JS access
//       secure: false,    // set true in production (HTTPS)
//       sameSite: "lax",  
//       maxAge: 24 * 60 * 60 * 1000 // 1 day
//     });
//     res
//       .status(201)
//       .json({ message: "User signed in successfully", success: true, user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };




// export const LoginUser = async (req, res, next)=>{
//   try {
//     const {password,email}=req.body;
//     // check we get password and email
//     if( !password || !email ){
//       return res
//         .status(409)
//         .json({ message: "All fields are required!", success: false });
//     }
//     // check user exist 
//     const existUser = await User.findOne({email})
//     if(!existUser){
//       return res
//         .status(409)
//         .json({ message: "Incorrect password or email", success: false });
//     }
//     if (!existUser.password) {
//       return res.status(500).json({ message: "User has no password stored" });
//     }
//   //  compare password
//    const isMatch = await bcrypt.compare(password,existUser.password)
//    if (!isMatch) {
//       return res.json({message:'Incorrect password or email'}) 
//     }
    
//     // remove password 
//     const userObj = existUser.toObject();
//     delete userObj.password;
//     //create a token and set cookie 
//     const token = createSecretToken(existUser._id);
//     console.log(token);
    
//      res.cookie("token", token, {
//       secure: false,   // true in production
//       httpOnly: true,
//       sameSite: "lax",  
//       maxAge: 24 * 60 * 60 * 1000 
//      });
//      res.status(201).json({ message: "User logged in successfully", success: true, userObj});
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
    
//   }
// }


// export const UserController = async (req,res) => {
//     try {
//       // destructure user id from params
//       const {id}=req.params;
//       //find user 
//       const findUser = await User.findById(id)
//       // check user is exist or not
//       if (!findUser) {
//         return res.status(404).json({ message: "User not Found!", success: false});
//       }
//       // remove password  and send response
//       const userObj = findUser.toObject();
//       delete userObj.password;
//       console.log(userObj);
//       res.status(201).json({ message: "User Found  successfully", success: true, userObj});
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
// }
// export const registerUser = async (req, res, next) => {
//   try {
//     const { email, fullName, password } = req.body;
//     console.log(req.body);
    
//     const newUser = new User({ email , fullName , password });
//     const registeredUser = await User.register(newUser, password);

//     req.login(registeredUser, (err) => { 
//       if (err) return next(err);
//       res.status(201).json({
//         message: "User registered successfully",
//         success: true,
//         user: registeredUser.id
//       });
//     });
//   } catch (error) {
//     console.log("registration err:", error);
//     res.status(500).json({ message: error.message, success: false });
//   }
// };

// export const LoginUser = async (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return next(err);
//     if (!user) {
//       return res.status(400).json({ 
//         message: info?.message || "Invalid credentials", 
//         success: false 
//       });
//     }
//     req.login(user, (err) => { 
//       const User=user.toObject()
//       console.log(User);
      
//       delete User.password
//       delete User.salt
//       delete User.hash
//       if (err) return next(err);
//       return res.status(200).json({
//         message: "Login successful",
//         success: true,
//         id: User.id
//       });
//     });
//   })(req, res, next);
// };

export const LogoutUser = (req, res) => {
  try {
    req.logout((err) => {
      if (err) return next(err);

      // destroy session cookie
      req.session.destroy((err) => {
        if (err) return next(err);

        res.clearCookie("connect.sid",{
        path: "/",        // must match cookie path
        httpOnly: true,
        secure: false     
      });
        res.status(200).json({ message: "Logged out successfully", success: true });
      });
    });
  } catch (error) {
    console.log("Logout err:", error);
    res.status(500).json({ message: "Logout failed", success: false });
  }
}

export const UserController = ( req , res , next) => {
  
}