const orderModel = require("../model/order");
const { productModel } = require("../model/product");

exports.placeOrder = async (req, res) => {
    try {
        const { products, user } = req.body;
        var count = 0;
        const order_id = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newProducts = [...products];

        await Promise.all(products?.map(async (item, i) => {
            const product = await productModel.findOne({ _id: item?.product });
            if (parseInt(product.master_qty) >= item?.qty) {
                count += 1;
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
                const product = await productModel.findOne({ _id: item?.product });
                await productModel.findByIdAndUpdate(product._id, { master_qty: product.master_qty - item?.qty });
            }));

            const order = orderModel({ order_id, products, user });
            const newOrder = await order.save();

            if (newOrder) {
                res.status(202).json({ success: true, message: "Order Placed successfully", data: newOrder });
            } else {
                res.status(500).json({ success: false, message: "Something went worng. Please try again" });
            }
        } else {
            res.status(200).json({ success: false, data: newProducts });
        }
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
};

exports.orderHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const orderData = [];

        const orders = await orderModel.find().populate([{ path: 'products.product' }]);

        orders.map(item => {
            if (item.user == id) {
                item?.products?.map(item => {
                    if (item.qty > 1) {
                        for (i = 1; i <= item.qty; i++) {
                            orderData.push(item.product);
                        };
                    } else {
                        orderData.push(item.product);
                    }
                });
            }
        });

        if (orderData) {
            res.status(200).json({ success: true, message: "Data fetched successfully.", data: orderData });
        } else {
            res.status(200).json({ success: false, message: "No data found!" });
        }
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
};