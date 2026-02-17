import express from "express";
import { getMessage, sendMessage } from "..//controllers/message.controller.js";
import isAuthenticate from "../middleware/authsMiddleware.js";
// import secureRoute from "../middleware/secureRoute.js";
// isAuthenticate

const router = express.Router();
router.post("/send/:id", isAuthenticate, sendMessage);
router.get("/get/:id", isAuthenticate, getMessage);

export default router;