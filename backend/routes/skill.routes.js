
import express from "express"
import { Router } from "express"
import  {wrapAsync}  from "../utils/wrapasync.js"
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
    .post(wrapAsync(createSkill))

// GET,Edit,Delete single Skill
router.route("/:skillid")
    .get(wrapAsync(showSingleSkill))  // get single skill route 
    .patch(wrapAsync(editSkill))      // edit skill route
    .delete(wrapAsync(deleteSkill))   // delete skill route


export default router;