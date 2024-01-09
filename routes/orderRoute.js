const express = require("express");
const orderController = require("../controller/orderController");
const modelAuth = require("../middleware/modelAuth");
const validateOrder = require("../helpers/validateOrder");

const router = express.Router();

router.post("/placeorder", [modelAuth(validateOrder)], orderController.placeOrder);
router.get("/orderhistory/:id", orderController.orderHistory);

module.exports = router;