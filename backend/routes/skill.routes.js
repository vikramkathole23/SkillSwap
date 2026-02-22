import isAuthenticate from "../middleware/authsMiddleware.js";
import express from "express";
import { Router } from "express";
import { wrapAsync } from "../utils/wrapasync.js";
import {
  sendSwapRequest,
  getUserRequests,
  updateRequestStatus,
} from "../controllers/skillSwapRequest.js";
import {
  showSkill,
  createSkill,
  showSingleSkill,
  editSkill,
  deleteSkill,
  UpaloadStudyMaterial,
} from "../controllers/skill.controllers.js";
import { upload } from "../cloudinaryConfig.js";
import multer from "multer";
import { UploadMulterFile } from "../middleware/cloudinaryMiddlleware.js";
// const upload = multer({ storage });

const router = Router();

// Show All skill routes
router.route("/").get(wrapAsync(showSkill));

// create New skill
router
  .route("/newskill")
  .post(
    isAuthenticate,
    upload.single("image"),
    UploadMulterFile,
    wrapAsync(createSkill),
  );

// GET,Edit,Delete single Skill
router
  .route("/:skillid")
  .get(wrapAsync(showSingleSkill)) // get single skill route
  .patch(isAuthenticate, wrapAsync(editSkill)) // edit skill route
  .delete(isAuthenticate, wrapAsync(deleteSkill)); // delete skill route

router.route("/swap/send").post(isAuthenticate, sendSwapRequest);

router.route("/swap/send/:id").patch(isAuthenticate, updateRequestStatus);

router.route("/studymaterial/upaload").post(isAuthenticate,upload.single("file"),UploadMulterFile,UpaloadStudyMaterial)

export default router;
