const express = require("express");
const cartController = require("../controller/cartController");
const modelAuth = require("../middleware/modelAuth");
const validateCart = require("../helpers/validateCart");
const jwtSessionAuth = require("../middleware/userAuth")


const router = express.Router();

router.get("/getcart/:id?", [jwtSessionAuth], cartController.getCart);
router.post("/addtocart", [modelAuth(validateCart)], cartController.addtoCart);

module.exports = router;