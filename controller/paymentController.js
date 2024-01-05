const { productModel } = require("../model/product")


exports.allProducts = async (req, res) => {
    try {
        const products = await productModel.find();

        if(products){
            res.status(200).json({ success: true, message: "Data fetched successfully", data: products });
        }else{
            res.status(200).json({ success: false, message: "Data not found", data: products });
        }
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { product_name, weight, length, width, height, price, description, master_qty } = req.body;
        const thumbnail = "public/userImg/" + req.files.thumbnail[0].filename;
        const banner_images = req.files.banner_images?.length ?
            req.files.banner_images.map(item => "public/userImg/" + item.filename) : [];

        const details = {
            weight: weight,
            dimensions: { length, width, height }
        };

        const product = productModel({ product_name, thumbnail, banner_images, details, price, description, master_qty });
        const newProduct = await product.save();

        res.status(200).json({ success: true, message: "this is test", data: newProduct });
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
};