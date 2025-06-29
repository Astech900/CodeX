const Joi = require('joi');

const userSchemaValidation = Joi.object({
    user : Joi.object({
        email : Joi.string().required().min(10).max(320),
        username : Joi.string().required().min(3).max(30),
        password : Joi.string().required().min(6)

    })


})


module.exports = userSchemaValidation;