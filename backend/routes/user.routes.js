import { Router } from "express";
import { LoginUser, registerUser, UserController } from "../controllers/user.controller.js";
// import user from "../models/user.model.js"

const router = Router();

router.route("/register")
    .post(registerUser)   // Register New User
router.route("/login")
    .post(LoginUser)      // LOgin user

router.route("/:id")
    .get(UserController)   // find user

export default router;