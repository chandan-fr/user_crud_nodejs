const express = require("express");
const cartController = require("../controller/cartController");


const router = express.Router();

router.get("/getcart/:id", cartController.getCart);
router.post("/addtocart", cartController.addtoCart);

module.exports = router;