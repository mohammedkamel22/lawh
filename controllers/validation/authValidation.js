const Joi = require("joi");

const registerSchema= joi.object({

username:Joi.string().trim().min(3).mix(30).required(),

email:Joi.string().lowercase().unique().trim().required(),

password:Joi.string().min(5).required(),

})


const loginSchema= joi.object({

email:Joi.string().lowercase().unique().trim().required(),

password:Joi.string().min(5).required(),

})

module.exports={
   registerSchema,
   loginSchema,
}
