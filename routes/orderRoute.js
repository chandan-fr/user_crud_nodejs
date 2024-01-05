const express = require("express");
const orderController = require("../controller/orderController");

const router = express.Router();

router.post("/placeorder", orderController.placeOrder);

module.exports = router;