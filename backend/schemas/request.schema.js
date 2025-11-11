const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  from: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    },
  to: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    },
  skill: { 
    type: String, 
    required: true 
    },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date, 
    default: Date.now 
   },
});

export default requestSchema;