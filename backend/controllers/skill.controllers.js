import skill from "../models/skill.model.js";
// import expressError from "../utils/expressError";

export const showSkill = async (req, res) => {
  const skills = await skill.find().populate("user");

  const safeSkills = skills.map((skill) => {
    if (skill.user) {
      const { password, ...safeUser } = skill.user.toObject();
      return { ...skill.toObject(), user: safeUser };
    }
    return skill;
  });

  res.json(safeSkills);
};

export const createSkill = async (req, res) => {
  const skillData = req.body;
  // console.log(skillData);

  const addSkill = await skill.create(skillData);
  console.log(addSkill);
  console.log({ message: "Skill added!", data: req.body });
  res.json("new skill added successfully!");
  // res.json();
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
    res.status(500).json({ message: "Server error" });
  }
};

export const editSkill = async (req, res) => {
  const { skillid } = req.params;
  const { skillName, description, image, category, proficiency, profession } =
    req.body;

  const updatedSkill = await skill.findByIdAndUpdate(
    skillid,
    { skillName, description, image, category, proficiency, profession },
    { new: true }
  );
  console.log(updatedSkill);

  console.log("updated successfully!");
  res.json(updatedSkill);
};

export const deleteSkill = async (req, res) => {
  try {
    const { skillid } = req.params;
    const deletedSkill = await skill.findByIdAndDelete(skillid);
    res.json("deleted successfully!");
  } catch (error) {
    console.log(error);
  }
};
