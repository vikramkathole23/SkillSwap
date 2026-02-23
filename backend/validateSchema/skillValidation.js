import Joi from "joi";

export const addNewSkillSchemaValidation = (req, res, next) => {
  const schema = Joi.object({
    skillName: Joi.string().trim().required(),

    file: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required(),
      resourceType: Joi.string().required(),
      format: Joi.string().required()
    }).required(),

    profession: Joi.string().trim().required(),

    description: Joi.string().trim().required(),

    category: Joi.string().trim().required(),

    proficiency: Joi.string()
      .valid("Beginner", "Intermediate", "Advanced", "Expert")
      .required(),

    user: Joi.string().required() 
  });

  const { error } = schema.validate(req.body);
   console.log(error);
   
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};