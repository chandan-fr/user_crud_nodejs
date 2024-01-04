const mongoose = require("mongoose");
const joi = require("joi");


const Schema = mongoose.Schema;
const productSchema = new Schema({
    product_name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    banner_images: [{ type: String, default: [] }],
    details: {
        weight: { type: Number, required: true },
        dimensions: {
            length: { type: Number, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
        },
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const productModel = mongoose.model("product", productSchema);

const validateProduct = (product) => {
    const schema = joi.object({
        product_name: joi.string().alphanum().min(3),
    });

    return schema.validate(product);
}


module.exports = productModel;