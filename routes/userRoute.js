// importing all essentials
const express = require("express");
const userController = require("../controller/userController");
const verifySignup = require("../middleware/verifySignup");
const { ImageUpload } = require("../config/mediaConfig");
const modelAuth = require("../middleware/modelAuth");
const validateUser = require("../helpers/validateUser")

// making router object
const router = express.Router();

//get routes
router.get("/alluser", userController.allUser);

//post routes
router.post("/adduser",
    [
        ImageUpload.single("profile_photo"),
        modelAuth(validateUser),
        verifySignup.checkDuplicateEntries
    ],
    userController.addUser
);
router.post("/usersignin", userController.userSignin);
router.post("/updateuser/:id", userController.updateUser);
router.post("/deleteuser/:id", userController.deleteUser);
router.post("/updateprofilephoto/:id", [ImageUpload.single("profile_photo")], userController.updateProfilePhoto);
router.post("/updatepassword/:id", userController.updatePassword);

module.exports = router;