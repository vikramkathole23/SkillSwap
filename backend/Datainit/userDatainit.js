import UserModel from "../models/user.model.js";
import { users,skills } from "./userdata.js";
import { ConnectDB } from "../db/connectMongo.js";
import skillModel from "../models/skill.model.js";

ConnectDB()
console.log(users);

const newUserIds = [
  "68c2a049cd12ef28c9993c48",
  "68c5a218902efb36a3b72ef0",
  "68c2a027cd12ef28c9993c45"
];
const professions = [
  "Teacher",
  "Developer",
  "Designer"
];

const proficiencyMap = {
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Expert"
};


// Assign users alternately
const skillsWithUsers = skills.map((skill, index) => ({
  ...skills,
  user: newUserIds[index % newUserIds.length],
  profession: professions[index % professions.length],
  proficiency: proficiencyMap[skill.level] || "Intermediate"
}));

// Insert all skills at once
skillModel.insertMany(skillsWithUsers)
  .then(result => {
    console.log("Skills inserted:", result);
  })
  .catch(err => {
    console.error("Error inserting skills:", err);
  });