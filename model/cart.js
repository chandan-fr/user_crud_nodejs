const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    qty: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('cart', cartSchema);