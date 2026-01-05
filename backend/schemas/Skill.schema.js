import mongoose from 'mongoose';
const { Schema } = mongoose;

const skillSchema = new Schema(
  {
    skillName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, 
      required: false,
    },
    profession: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    proficiency: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"], // optional but neat
    },
    // Reference to User model that who created this skill
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

export default skillSchema;