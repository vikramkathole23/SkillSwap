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

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json('Token required');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json('Invalid or expired token');
    req.user = user;
    next();
  });
};

export default authenticateToken;