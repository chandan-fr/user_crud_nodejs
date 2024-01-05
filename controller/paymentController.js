const { productModel } = require("../model/product")


exports.allProduct = async (req, res) => {
    try {

    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
}

exports.addProduct = async (req, res) => {
    try {
        const { product_name, weight, length, width, height, price, description } = req.body;
        const thumbnail = "public/userImg/" + req.files.thumbnail[0].filename;
        const banner_images = req.files.banner_images?.length ?
            req.files.banner_images.map(item => "public/userImg/" + item.filename) : [];

        const details = {
            weight: weight,
            dimensions: { length, width, height }
        };

        const product = productModel({ product_name, thumbnail, banner_images, details, price, description });
        const newProduct = await product.save();

        res.status(200).json({ success: true, message: "this is test", data: newProduct });
    } catch (exc) {
        res.status(400).json({ error: true, message: exc.message });
    }
};