const cartModel = require("../model/cart");


exports.getCart = async (req, res) => {
    try {
        const { id } = req?.params;
        let cartData = [];
        const user = req?.jwtData;

        if (user.id || id) {
            const allCartData = await cartModel.find().populate([{ path: 'product' }]);

            allCartData?.map(item => {
                if (item.user == (user.id || id)) {
                    cartData.push({ _id: item._id, product: item.product, qty: item.qty });
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

exports.increaseDecreaseQty = async (req, res) => {
    try {
        const { c_id, qty } = req.body;
        const user = req?.jwtData;

        if (qty) {
            if (user?.id) {
                const cart = await cartModel.findOne({ _id: c_id });

                if (user.id == cart.user) {
                    const updatedQty = await cartModel.findByIdAndUpdate(c_id, { qty: qty });

                    if (updatedQty) {
                        res.status(200).json({ success: true, message: "New quantity updated." });
                    } else {
                        res.status(500).json({ success: false, message: "Internal Server Error!" });
                    }
                } else {
                    res.status(403).json({ success: false, message: "Forbidden access!" });
                }
            } else {
                res.status(401).json({ success: false, message: "Unauthorized access!" });
            }
        } else {
            res.status(206).json({ success: false, message: "Quantity can't be zero!" });
        }
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
};