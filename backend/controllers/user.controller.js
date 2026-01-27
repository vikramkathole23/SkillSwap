import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
// import passport from "passport";
// import createSecretToken from "../utils/SecretToken.js";
import bcrypt from "bcrypt";
import sendMail from "./sendMail.controler.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    console.log(email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    //check user is already exist
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({
        message: "User already exist!, You can login",
        success: false,
      });
    }

    // register new User
    const newUser = await User.create({ email, password, fullName });

    // bcrypt password
    newUser.password = await bcrypt.hash(password, 10);

    // create a opt
    // const otp = Math.floor(1000 + Math.random() * 9000);
    // console.log(otp);

    // send mail for verifying user Email
    // sendMail(newUser.email, "verify your account", otp, fullName);

    // otp save in db
    // newUser.otp = otp;

    // save user in db
    await newUser.save();
    return res.status(201).json({
      message: "User register successfull!, Now you can login.",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false, error });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(201)
        .json({ message: "Please,Enter your Register Email!", success: true });
    }
    console.log(req);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    // send mail for verifying user Email
    const mail = await sendMail(
      user.email,
      "verify your account",
      otp,
      user.fullName,
    );
    console.log(mail);
    // otp save in db
    user.otp = otp;

    await user.save();
    return res
      .status(201)
      .json({
        message: "Code is send, Check Your Email!",
        success: true,
        mail,
      });
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code, email } = req.body;
    // console.log(email,code);
    // extract code from user db
    const user = await User.findOne({ email });
    // console.log(user);
    if (email !== user.email) {
      return res.status(404).json({
        message: "Please, enter your register Email! ",
        success: false,
      });
    }

    // check otp
    if (code == user.otp) {
      user.isVerify = true;
      await user.save();
      return res
        .status(201)
        .json({ message: "Email verify successfull!", success: true });
    }

    return res
      .status(403)
      .json({ message: "Check Email or OTP is incorrect!", success: false });
  } catch (error) {
    console.log(error);
    return res
      .status(201)
      .json({ message: "server error, Try again!", error, success: false });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        message: "User is not found with this email!",
        success: false,
      });
    }
    const errMessage = "Auth faild email or password wrong";
    // if (!findUser.isVerify) {
    //   return res.status(403).json({
    //     message: "Email is not verify,Please verify first!",
    //     success: false,
    //   });
    // }
    const isPassEquale = await bcrypt.compare(password, findUser.password);
    if (!isPassEquale) {
      return res.status(403).json({ message: errMessage, success: false });
    }

    const jwtToken = jwt.sign(
      { id: findUser._id, email: findUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const user = {
      _id: findUser._id,
      name: findUser.fullName,
      email: findUser.email,
    };
    //  console.log(user);

    return res.status(201).json({
      message: "Login successful",
      success: true,
      jwtToken,
      user,
      // email ,
      // userName:findUser.fullName
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

export const LogoutUser = (req, res) => {
  try {
    req.logout((err) => {
      if (err) return next(err);

      // destroy session cookie
      req.session.destroy((err) => {
        if (err) return next(err);

        res.clearCookie("connect.sid", {
          path: "/", // must match cookie path
          httpOnly: true,
          secure: false,
        });
        res
          .status(200)
          .json({ message: "Logged out successfully", success: true });
      });
    });
  } catch (error) {
    console.log("Logout err:", error);
    res.status(500).json({ message: "Logout failed", success: false });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ message: "please send user Id!", success: false });
    }
    const user = await User.findById(id).select("-password -isVerify  -otp");
    if (!user) {
      return res
        .status(404)
        .json({
          message: "user not exist please send valid id or login first!",
          success: false,
        });
    }
    // console.log(user);
    return res
      .status(200)
      .json({ message: "user geted!", success: true, user });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: "server error", success: false });
  }
};

export const editUserDeteil = async (req, res) => {
  try {
    const { user_id, fullName, profile_pic, about_me, profession, category } =
      req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res
        .status(404)
        .json({
          message: "user not found,check user is exist!",
          success: false,
        });
    }

    const userObject = {
      fullName,
      profile_pic,
      about_me,
      profession,
      category,
    };
    const updatedUser = await User.findByIdAndUpdate(user_id, userObject);
    // console.log(updatedUser);
    return res
      .status(200)
      .json({
        message: "user updated successfully!",
        success: true,
        // updatedUser,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", success: false });
  }
};
