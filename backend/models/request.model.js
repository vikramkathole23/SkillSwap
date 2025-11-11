import requestSchema from "../schemas/request.schema";
import mongoose from "mongoose";

const Request = mongoose.model('request', requestSchema);

export default Request;