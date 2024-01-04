const express = require("express");
const paymentController = require("../controller/paymentController");
const { ImageUpload } = require("../config/mediaConfig");


const router = express.Router();

router.post("/addproduct",
    [ImageUpload.fields([{name: "thumbnail"}, {name: "banner_images"}])],
    paymentController.addProduct
);

module.exports = router;