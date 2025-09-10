import User from "../models/user.model.js"

export const registerUser = async (req , res) => {
    const {fullName,email,password}=req.body
    try {
    const isExist = await User.findOne({email})
    if(isExist){
        console.log(isExist);
       return res.status(409).json({ success: false, message: "User already exist registered with this email!" });
    }

    const newUser = new User({
        fullName,
        email,
        password
    })
    await newUser.save();
    // console.log("user saved successfully!",newUser); 
    res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "something went wrong!" });
    } 
}