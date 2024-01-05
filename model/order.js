const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    order_id: { type: String },
    products: [{ product_id: { type: String }, qty: { type: Number } }],
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);