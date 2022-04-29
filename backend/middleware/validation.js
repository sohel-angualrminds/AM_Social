const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 6,
    max: 250,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};

const userValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(4).required(),
        lastName: Joi.string().min(4).required(),
        email: Joi.string().email().min(6).required(),
        //    password: Joi.string().min(6).numeric(1).required(),
        password: passwordComplexity(complexityOptions),
    })
    return schema.validate(data)
}

module.exports.userValidation = userValidation;