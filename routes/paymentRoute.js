const express = require("express");
const paymentController = require("../controller/paymentController");
const { ImageUpload } = require("../config/mediaConfig");
const modelAuth = require("../middleware/modelAuth");
const { validateProduct } = require("../model/product");


const router = express.Router();

router.get("/allproducts", paymentController.allProducts);
router.post("/addproduct",
    [
        ImageUpload.fields([{ name: "thumbnail" }, { name: "banner_images" }]),
        modelAuth(validateProduct),
    ],
    paymentController.addProduct
);

module.exports = router;