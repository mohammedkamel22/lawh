const Joi = require("joi");


const studentRegisterSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().lowercase().trim().email().required(),
  password: Joi.string().min(5).required(),
  grade: Joi.string().optional(),
  department: Joi.string().optional()
});

const parentRegisterSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().lowercase().trim().email().required(),
  password: Joi.string().min(5).required(),
  studentEmail: Joi.string().lowercase().trim().email().required() 
});

const loginSchema = Joi.object({
  email: Joi.string().lowercase().trim().email().required(),
  password: Joi.string().min(5).required(),
});

module.exports = {
   studentRegisterSchema,
   parentRegisterSchema,
   loginSchema,
};