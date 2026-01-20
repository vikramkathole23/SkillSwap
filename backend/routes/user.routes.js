import { Router } from "express";
import { LoginUser, registerUser,UserController, LogoutUser, verifyEmail, resendOtp, } from "../controllers/user.controller.js";
import {signupValidation,loginValidation} from "../validateSchema/authValidation.js" 
import { getUserRequests } from "../controllers/skillSwapRequest.js";
import { IsEmailVerify } from "../middleware/EmailVerifyMiddleware.js";
// import user from "../models/user.model.js"

const router = Router();

router.route("/signup")
    .post(signupValidation,registerUser) // Register New User
router.route("/signup/verify-email")
    .post(verifyEmail)
router.route("/signup/verify-otp/resend-otp")
    .post(resendOtp)
router.route("/login")
    .post(loginValidation,IsEmailVerify,LoginUser)      // Login user
router.route("/requests/:id")
    .get(getUserRequests)
router.route("/:id")
    .get(UserController)   // find user

export default router;