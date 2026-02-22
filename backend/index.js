import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { ConnectDB } from "./db/connectMongo.js";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import skillRouter from "./routes/skill.routes.js";
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.route.js"
import User from "./models/user.model.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import {createServer} from 'http'
import ioConnection from './sockets/index.socket.js';
import Frontend_URL from './production.js';
import path from "path";
import { fileURLToPath } from "url";
// import multer from 'multer';
import cloudinary from 'cloudinary'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const Port = process.env.PORT;
const app = express();
const server = createServer(app);
// const allowedOrigins = process.env.Frontend_URL;
const allowedOrigins = [ 
  process.env.FRONTEND_URL_1,
  process.env.FRONTEND_URL_2,
]
// "https://skillswap-jynl.onrender.com"

const corsOption = {
  origin:Frontend_URL,
  methods: ["GET", "POST","PUT", "PATCH", "DELETE","OPTIONS"],
  credentials: true,
}
const io = new Server(server,{
  cors : corsOption ,
  transports: ["websocket", "polling"],
})
// console.log(Frontend_URL); 

ConnectDB();

app.set("io",io)
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors(corsOption)
);
// app.options("/*",cors(corsOption))
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
 
// Skill routes 
app.use("/skill",skillRouter)

// chat message 
app.use("/api",messageRouter)

// User Route
app.use("/user",userRouter)

// page not found error
// console.log(path.join(__dirname, "dist"));

// app.use(express.static(path.join(__dirname, "dist")));

// app.use( (req, res , next) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// error handlemiddleware 
app.use((err,req,res,next)=>{
  const {statusCode=500,message="something went wrong"}=err
  res.status(statusCode).json(message)
})

ioConnection(io);

server.listen(Port, (req, res) => {
  console.log(`server is runing on port ${Port}`);
});
