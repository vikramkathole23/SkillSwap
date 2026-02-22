import skill from "../models/skill.model.js";
import studymaterial from "../models/studymaterials.model.js";
import User from "../models/user.model.js";
// import {storage} from "../cloudinaryConfig.js"
// import expressError from "../utils/expressError";

export const showSkill = async (req, res) => {
  try {
      const skills = await skill.find().populate("user");
      const safeSkills = skills.map((skill) => {
    if(skill.user) {
      const { password, ...safeUser } = skill.user.toObject();
      return { ...skill.toObject(), user: safeUser };
    }
    return skill;
  });

  res.json(safeSkills);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server error" },error);
  }

};

export const createSkill = async (req, res) => {
  try {
    const {user} = req.body;
    const data = req.body;
    console.log(data);
    
    // find user by id
    const findUser = await User.findById(user);    

    // if user not found then return 
    if (!findUser) {
      return res.status(404).json("user is not register!")
    }
   
    // add skill in db
    const addSkill = await skill.create(data);

    // if not skill array in finduser create an array 
    if (!findUser.skills) {
      findUser.skills = [];
    }
    
    // push skill id in that array
    findUser.skills.push(addSkill._id);
    //and save it
    await findUser.save();
    // then return 
    return res.status(201).json({message:"New Skill added."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }, error);   
  }
};

export const showSingleSkill = async (req, res) => {
  try {
    const { skillid } = req.params;
    const skillData = await skill
      .findById(skillid)
      .populate("user", "fullName email");
    // console.log(skillData);
    if (!skillData) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(skillData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }, error);
  }
};

export const editSkill = async (req, res) => {
  try {
    const { skillid } = req.params;
    const { skillName, description, image, category, proficiency, profession } =
      req.body;

    const updatedSkill = await skill.findByIdAndUpdate(
      skillid,
      { skillName, description, image, category, proficiency, profession },
      { new: true }
    );
    return res.status(200).json("Skill updated. Full upgrade vibes.");
  } catch (error) {
    res.status(500).json({ message: "Server error" }, error);
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { skillid } = req.params;
    const deletedSkill = await skill.findByIdAndDelete(skillid);
    res.status(200).json("deleted successfully!");
  } catch (error) {
    res.status(500).json({ message: "Server error" }, error);
  }
};

export const UpaloadStudyMaterial = async (req , res ) => {
  try {
    // const {data} = req.body;
    // console.log(req.body);

    const fileData = {
      
      title: req.body.title,
      description: req.body.description,
      subject: req.body.subject,
      type: req.body.type,
      deadline: req.body.deadline || null,
      user: req.body.user,
      file: req.body.file,   
    
    }

    const saveData = await studymaterial.create(fileData);

    // console.log(saveData)
    //and save it
    await saveData.save();
    // then return 
    return res.status(201).json({message:"Notes Upload successfully."});
    // return res.status(200).json({ message: "uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" },error);
  }
}


