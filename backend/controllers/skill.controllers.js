import skill from "../models/skill.model.js";
// import expressError from "../utils/expressError";


export const showSkill = async (req, res) => {
    const user = await skill.find();
    res.json(user);
}

export const createSkill = async (req, res) => {
    const skillData = req.body;
    const addSkill = await skill.create(skillData);
    console.log(addSkill);
    console.log({ message: "Skill added!", data: req.body });
    res.json('new skill added successfully!')
    // res.json();
}

export const showSingleSkill = async (req, res) => {
  const { skillid } = req.params;
  const skillData = await skill.findById(skillid);
  res.json(skillData);
}

export const editSkill = async (req, res) => {
    const { skillid } = req.params;
    const { skillName, description, image, category, proficiency, profession } =
      req.body;

    const updatedSkill = await skill.findByIdAndUpdate(
      skillid,
     { skillName,
      description,
      image,
      category,
      proficiency,
      profession },
      { new: true }
    );
    console.log('updated successfully!');
    res.json(updatedSkill);
}

export const deleteSkill = async (req, res) => {
    const { skillid } = req.params;
    const deletedSkill = await skill.findByIdAndDelete(skillid);
    res.json('deleted successfully!')
}