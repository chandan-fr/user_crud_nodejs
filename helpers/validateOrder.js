const joi = require("joi");


module.exports = (order)=>{
    const schema = joi.object({
        products:joi.array().items(
            joi.object().required().messages({
                "object.base": "All items inside 'Products' must be of type object."
            })
        ).required().messages({
            "array.empty": "Products required to place order.",
            "array.base": "Must be an array of objects.",
            "array.includesRequiredUnknowns": "Products can't be empty."
        }),
        user: joi.string().required().messages({
            "string.empty": "User Id is required.",
        }),
    });

    return schema.validate(order);
};