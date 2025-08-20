import UserModel from "../models/user.model.js";
import { users,skills } from "./userdata.js";
import { ConnectDB } from "../db/connectMongo.js";
import skillModel from "../models/skill.model.js";

ConnectDB()
console.log(users);
  
skills.map((data,ind)=>{
    skillModel.insertMany(data)
    .then((result)=>{
        console.log(result);
    })
    .then((err)=>{
        console.log(err);
        
    })
    // console.log(data);
    
})