import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import user from "../models/user.model.js"

const router = Router();

router.route("/register")
    .post(registerUser)   // Register New User




export default router;