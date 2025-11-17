import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { ConnectDB } from "./db/connectMongo.js";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import skillRouter from "./routes/skill.routes.js";
import userRouter from "./routes/user.routes.js"
// import passport from "passport";
// import LocalStrategy from "passport-local"
import User from "./models/user.model.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import {createServer} from 'http'
import ioConnection from './sockets/index.socket.js';

// import mongoose from "mongoose";

const Port = process.env.PORT;
const app = express();
const server = createServer(app);
const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST","PUT", "PATCH", "DELETE"],
  credentials: true,
}
const io = new Server(server,{
  cors:corsOption
})
// const upload = multer({ dest: "uploads/" });
// socket connection
ioConnection(io);

ConnectDB();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors(corsOption)
);

app.use(cookieParser());
app.use(express.json())

const sessionOptions={
  // store:store,
  name: "connect.sid",
  secret: "asdfghjkkl",
  resave: false,
  saveUninitialized: true,
  cookie: {
  expires: new Date(Date.now() + 1000 * 60 ),
  maxAge:   60 * 1000,
  httpOnly: true
}
}
app.use(session(sessionOptions))
 
// app.use(passport.initialize());  
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()))

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

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

server.listen(Port, (req, res) => {
  console.log(`server is runing on port ${Port}`);
});
