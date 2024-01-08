const express = require("express");
const orderController = require("../controller/orderController");

const router = express.Router();

router.post("/placeorder", orderController.placeOrder);
router.get("/orderhistory/:id", orderController.orderHistory);

module.exports = router;