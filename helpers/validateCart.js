const joi = require("joi");


module.exports = (cart)=>{
    const schema = joi.object({
        product: joi.string().required().messages({
            "string.empty": "Product is required!",
        }),
        user: joi.string().required().messages({
            "string.empty": "User Id is required!",
        }),
        qty: joi.number().required().messages({
            "numver.empty": "Quantity is required!",
            "number.base": "Must be a number"
        }),
    });

    return schema.validate(cart);
};