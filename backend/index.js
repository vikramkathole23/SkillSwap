import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { ConnectDB } from "./db/connectMongo.js";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import skillRouter from "./routes/skill.routes.js";
import userRouter from "./routes/user.routes.js"
import passport from "passport";
import localStratergy from "passport-local"
import User from "./models/user.model.js";
import session from "express-session";
import cookieParser from "cookie-parser";
// import mongoose from "mongoose";

const Port = process.env.PORT;
const app = express();
const upload = multer({ dest: "uploads/" });

ConnectDB();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json())

// const sessionOption = {
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
// }

// app.use(session(sessionOption))

// Skill routes 
app.use("/skill",skillRouter)

// User Route
app.use("/user",userRouter)

// page not found error
// app.all('*', (req, res, next) => {
//   next(new expressError(404, "Page not found"));
// });

// error handlemiddleware 
app.use((err,req,res,next)=>{
  const {statusCode=500,message="something went wrong"}=err
  res.status(statusCode).json(message)
})

app.listen(Port, (req, res) => {
  console.log(`server is runing on port ${Port}`);
});
