import skill from "../models/skill.model.js";
// import expressError from "../utils/expressError";

export const showSkill = async (req, res) => {
  try {
      const skills = await skill.find().populate("user");
  const safeSkills = skills.map((skill) => {
    if (skill.user) {
      const { password, ...safeUser } = skill.user.toObject();
      return { ...skill.toObject(), user: safeUser };
    }
    return skill;
  });

  res.json(safeSkills);
  } catch (error) {
    res.status(500).json({ message: "Server error" },error);
  }

};

export const createSkill = async (req, res) => {
  try {
    console.log(req);
    
    const skillData = req.body;
    const addSkill = await skill.create(skillData);
    console.log(addSkill);
    console.log({ message: "Skill added!", data: req.body });
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
    console.log(skillData);
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
