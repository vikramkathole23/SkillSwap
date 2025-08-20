import ReviewSchema from "../schemas/review.schema";
import mongoose from "mongoose";

const Review = mongoose.model('review', ReviewSchema);

export default Review;