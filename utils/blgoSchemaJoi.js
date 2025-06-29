const Joi = require('joi');


const blogSchemaValidation = Joi.object({
   blog :  Joi.object({
    title : Joi.string().required().max(100),
    content : Joi.string().required().min(100),
    image : Joi.string().allow("", null)
   })
});



module.exports = blogSchemaValidation;