const joi = require("joi");


module.exports = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).required().pattern(/^[a-zA-Z ]+$/).messages({
            "string.empty": "Name is Required.",
            "string.min": "Minimum length should be 3",
            "string.pattern.base": "Alphabets & Blank spaces only.",
        }),
        email: joi.string().email({ minDomainSegments: 1, maxDomainSegments: 2, tlds: { allow: ['com', 'in'] } })
        .required().messages({
            "string.empty": "Email is Required.",
            "string.email": "Invalid Email format.",
        }),
        phone: joi.string().min(10).max(10).required().messages({
            "string.empty": "Name is Required.",
            "string.min": "Minimum length should be 10",
            "string.max": "Maximum length should be 10",
        }),
        password: joi.string().min(6).max(12).required().messages({
            "string.empty": "Password is Required.",
            "string.min": "Minimum length should be 6",
            "string.max": "Maximum length should not exceed 12",
        })
    });

    return schema.validate(user);
};