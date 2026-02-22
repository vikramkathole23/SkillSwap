import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const isAuthenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // const data = req.body
  // console.log(data);
  
  if(!authHeader) {
    return res.status(403)
      .json('Unauthorized, You must have login!')
  }

  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(403)
      .json('Unauthorized, You are not login!')
  }

   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    req.user = decoded;
    next();
   } catch (error) {
    if (error) {
       console.log(error);
       
      return res.status(403)
        .json('Unauthorized, JWT token is wrong or expired')
    }
   } 
};

export default isAuthenticate;