import express from "express";
import { ConnectDB } from "./db/connectMongo.js";
import User from "./models/user.model.js";
import skill from "./models/skill.model.js";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import mongoose from "mongoose";

const Port = 3000;
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(bodyParser.json());
app.use(express.urlencoded());

ConnectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.get("/skill", async (req, res) => {
  try {
    const user = await skill.find();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/skill/:skillid", async (req, res) => {
  const { skillid } = req.params;
  try {
    // console.log(skillid)
    const skillData = await skill.findById(skillid);
    // console.log(skillData)
    res.json(skillData);
  } catch (error) {
    console.log(error);
  }
});

app.post("/skill/newskill", async (req, res) => {
  const skillData = req.body;
  try {
    const addSkill = await skill.insertOne(skillData);
    console.log(addSkill);
    console.log({ message: "Skill added!", data: req.body });
    res.json('new skill added successfully!')
    // res.json();
  } catch (error) {
    console.log("mongo error:", error);
  }
});

app.delete("/skill/:skillid", async (req, res) => {
  try {
    const { skillid } = req.params;
    const deletedSkill = await skill.findByIdAndDelete(skillid);
    res.json('deleted successfully!')
    // console.log(deletedSkill);
  } catch (error) {
    console.log("mongo deletion error:", error);
  }
});

app.get("skill/:skillid", (req, res) => {
  try {
    const { skillid } = req.params;
    const data = skill.findById(skillid);
    // console.log(data);
  } catch (error) {
    console.log("skill update error:", error);
  }
});

app.patch("/skill/:skillid", async (req, res) => {
  try {
    const { skillid } = req.params;
    const { skillName, description, image, category, proficiency, profession } =
      req.body;

    const updatedSkill = await skill.findByIdAndUpdate(
      skillid,
     { skillName,
      description,
      image,
      category,
      proficiency,
      profession },
      { new: true }
    );
    console.log('updated successfully!');
    res.json(updatedSkill);
  } catch (error) {
    console.log("mongo update error:", error);
  }
});

app.listen(Port, (req, res) => {
  console.log(`server is runing on port ${Port}`);
});
