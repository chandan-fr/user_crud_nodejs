const cartModel = require("../model/cart");


exports.getCart = async (req, res) => {
    try {
        const { id } = req?.params;
        let cartData = [];

        if (id) {
            const allCartData = await cartModel.find().populate([{ path: 'product' }]);

            allCartData?.map(item => {
                if (item.user == id) {
                    cartData.push({ product: item.product, qty: item.qty });
                }
            });

            if (cartData.length) {
                res.status(200).json({ success: true, message: "Data fetched successfully.", data: cartData });
            } else {
                res.status(200).json({ success: false, message: "No data found!" });
            }
        } else {
            res.status(203).json({ success: false, message: "user_id is required!" });
        }
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
};

exports.addtoCart = async (req, res) => {
    try {
        const { product, user, qty } = req.body;

        if (product && user && qty) {
            const cartItem = cartModel({ product, user, qty });
            const newCartItem = await cartItem.save();

            if (newCartItem) {
                res.status(201).json({ success: true, message: "Item added successfully." });
            } else {
                res.status(500).json({ success: false, message: "Something went wrong. Please try again!" });
            }
        } else {
            res.status(206).json({ success: false, message: "All fields are required!" });
        }
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
};