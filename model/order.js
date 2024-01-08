const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSubSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    qty: { type: Number }
}, { _id: false });

const orderSchema = new Schema({
    order_id: { type: String },
    products: [productSubSchema],
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);