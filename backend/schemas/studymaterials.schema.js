import mongoose from "mongoose";
const { Schema } = mongoose;

const studyMaterialsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["notes", "assignment"],
    },
    deadline: { type: Date },
    file: {
      url: String,
      filename:  String,
      resourceType: String,
      format: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true },
);

export default studyMaterialsSchema;
