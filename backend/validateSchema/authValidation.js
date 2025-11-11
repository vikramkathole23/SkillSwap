import Joi from "joi";

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const {error} = schema.validate(req.body);
  if (error) {
    return res.status(400)
       .json({message:"bad request",error})
  }
  next()
}

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const {error} = schema.validate(req.body);
  if (error) {
    return res.status(400)
       .json({message:"bad request",error})
  }
  next()
}

// module.exports={
//     signupValidation,
//     loginValidation
// }