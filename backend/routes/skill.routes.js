import isAuthenticate from "../middleware/authsMiddleware.js";
import express from "express"
import { Router } from "express"
import  {wrapAsync}  from "../utils/wrapasync.js"
import { sendSwapRequest , getUserRequests , updateRequestStatus } from "../controllers/skillSwapRequest.js";
import {
  showSkill,
  createSkill,
  showSingleSkill,
  editSkill,
  deleteSkill
} from "../controllers/skill.controllers.js";


const router = Router();

// Show All skill routes
router.route("/")
    .get(wrapAsync(showSkill))

// create New skill 
router.route("/newskill")
    .post( isAuthenticate,wrapAsync(createSkill))

// GET,Edit,Delete single Skill
router.route("/:skillid")
    .get(wrapAsync(showSingleSkill))  // get single skill route 
    .patch( isAuthenticate,wrapAsync(editSkill))      // edit skill route
    .delete(isAuthenticate,wrapAsync(deleteSkill))   // delete skill route

router.route("/swap/send")
    .post(isAuthenticate,sendSwapRequest)

router.route("/swap/send/:id")
    .patch(isAuthenticate,updateRequestStatus)

export default router;