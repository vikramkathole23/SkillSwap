import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// const userVerification = (req, res) => {
//   // const token = req.headers["authorization"]?.split(" ")[1]; 
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: "you don't have access,First login then add skill!" });
//   }
//   jwt.verify( token , process.env.TOKEN_KEY , async ( err , data ) => {
//     if (err) {
//      return res.json({ status: false })
//     } else {
//       const user = await User.findById(data.id)
//       if (user) {
//         return res.json({ status: true, user: user.username });
//       } else {
//         return res.json({ status: false });
//       }
//   }
//   }) 
// }

const isAuthenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // console.log(req);
  
  if(!authHeader) {
    return res.status(403)
      .json('Unauthorized, JWT token is required')
  }

  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(403)
      .json('Unauthorized, token missing')
  }

   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    req.user = decoded;
    next();
   } catch (error) {
    if (error) {
      return res.status(403)
        .json('Unauthorized, JWT token is wrong or expired')
    }
   } 
};

export default isAuthenticate;