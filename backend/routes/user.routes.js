import { Router } from "express";
import { LoginUser, registerUser,UserController, LogoutUser } from "../controllers/user.controller.js";
import {signupValidation,loginValidation} from "../validateSchema/authValidation.js" 
// import user from "../models/user.model.js"

const router = Router();

router.route("/signup")
    .post(signupValidation,registerUser)   // Register New User
router.route("/login")
    .post(loginValidation,LoginUser)      // Login user
router.route("/:id")
    .get(UserController)   // find user
 
export default router;