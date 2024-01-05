const orderModel = require("../model/order");
const { productModel } = require("../model/product");

exports.placeOrder = async (req, res) => {
    try {
        const { products, user } = req.body;

        const order_id = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // const allProducts = await productModel.find();
        products?.map(async item => {
            const product = await productModel.findOne({ _id: item?.product_id });
            if (parseInt(product.master_qty) >= item?.qty) {
                // await productModel.findByIdAndUpdate(product._id, { master_qty: product.master_qty - item?.qty });
                console.log({ item: product.product_name, quantity: item?.qty, msg: "order placed" });
            } else {
                if (parseInt(product.master_qty) == 0) {
                    console.log({ item: product.product_name, quantity: item?.qty, msg: "out of stock" });
                } else {
                    console.log({ item: product.product_name, quantity: item?.qty, msg: `only ${product.master_qty} left` });
                }
            }
        });
        // console.log(req.body);
        return;

        // const order = orderModel({ order_id, products, user });
        // const newOrder = await order.save();

        // if (newOrder) {
        //     res.status(200).json({ success: true, message: "Order Placed successfully", data: products });
        // } else {
        //     res.status(200).json({ success: false, message: "Something went worng. Please try again" });
        // }
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
}