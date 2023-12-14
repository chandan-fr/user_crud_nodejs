// importing all essentials
const express = require("express");
const userController = require("../controller/userController");
const verifySignup = require("../middleware/verifySignup");

// making router object
const router = express.Router();

//get routes
router.get("/alluser", userController.allUser);

//post routes
router.post("/adduser", [verifySignup.checkDuplicateEntries], userController.addUser);
router.post("/usersignin", userController.userSignin);

module.exports = router;