// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary'

import multer from "multer";

// const storage = multer.memoryStorage(); 

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


 const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
  folder: file.mimetype === "application/pdf" 
    ? "skillswap/notes"
    : "skillswap/images",
  resource_type: "auto",
})
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});
 
// module.exports ={
//     storage,
//     cloudinary
// }