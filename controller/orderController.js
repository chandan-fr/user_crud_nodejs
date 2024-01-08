const orderModel = require("../model/order");
const { productModel } = require("../model/product");

exports.placeOrder = async (req, res) => {
    try {
        const { products, user } = req.body;
        var count = 0;
        const order_id = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newProducts = [...products];

        await Promise.all(products?.map(async (item, i) => {
            const product = await productModel.findOne({ _id: item?.product_id });
            if (parseInt(product.master_qty) >= item?.qty) {
                count += 1;
                console.log({ item: item?.product_id, quantity: item?.qty, msg: "order placed" });
            } else {
                if (parseInt(product.master_qty) == 0) {
                    newProducts[i].msg = "out of stock";
                } else {
                    newProducts[i].msg = `only ${product.master_qty} left`;
                }
            }
        }));

        if (count === products.length) {
            await Promise.all(products?.map(async item => {
                const product = await productModel.findOne({ _id: item?.product_id });
                await productModel.findByIdAndUpdate(product._id, { master_qty: product.master_qty - item?.qty });
            }));

            const order = orderModel({ order_id, products, user });
            const newOrder = await order.save();

            if (newOrder) {
                res.status(200).json({ success: true, message: "Order Placed successfully", data: newOrder });
            } else {
                res.status(200).json({ success: false, message: "Something went worng. Please try again" });
            }
        } else {
            res.status(200).json({ success: false, data: newProducts });
        }
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
}