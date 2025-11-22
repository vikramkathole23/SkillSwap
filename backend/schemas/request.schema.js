// const mongoose = require("mongoose");
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true 
    },
  receiver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true 
    },
  skillId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "skill",
    required: true 
    },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
},{ timestamps: true });

export default requestSchema;