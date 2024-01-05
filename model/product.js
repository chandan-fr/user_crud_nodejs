const mongoose = require("mongoose");
const joi = require("joi");


const Schema = mongoose.Schema;
const productSchema = new Schema({
    product_name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    banner_images: [{ type: String, default: [] }],
    details: {
        weight: { type: String, required: true },
        dimensions: {
            length: { type: String, required: true },
            width: { type: String, required: true },
            height: { type: String, required: true },
        },
    },
    price: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const productModel = mongoose.model("product", productSchema);

const validateProduct = (product) => {
    const schema = joi.object({
        product_name: joi.string().min(3).messages({
            "string.empty": "Product Name is Required.",
            "string.min": "Minimum length should be 3",
        }),
        weight: joi.string().required().messages({
            "string.empty": "Weight is Required.",
        }),
        length: joi.string().required().messages({
            "string.empty": "Length is Required.",
        }),
        width: joi.string().required().messages({
            "string.empty": "Width is Required.",
        }),
        height: joi.string().required().messages({
            "string.empty": "Height is Required.",
        }),
        price: joi.string().required().messages({
            // "string.base": "Invalid input. Must be a string.",
            "string.empty": "Price is Required.",
        }),
        description: joi.string().required().messages({
            "string.empty": "Description is Required.",
        })
    });

    return schema.validate(product);
}


module.exports = { productModel, validateProduct };