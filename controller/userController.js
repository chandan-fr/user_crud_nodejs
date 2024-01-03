// importing all essentials
const userModel = require("../model/user");
const bcrypt = require("bcryptjs");
const createToken = require("../config/createToken");
const securePassword = require("../config/securePassword");
const fs = require("fs");


exports.allUser = async (req, res) => {
    try {
        const users = await userModel.find();
        if (users.length) {
            res.status(200).json({ success: true, message: "Users data fetched successfully", data: users });
        } else {
            res.status(200).json({ success: false, message: "Data not found", data: users });
        }
    } catch (exc) {
        res.status(404).json({ error: true, message: exc.message });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const img = req.file ? "public/userImg/" + req.file.filename : "";

        const enc_pass = await securePassword(password);

        const user = userModel({ name, email, phone, password: enc_pass, profile_photo: img });
        const newUser = await user.save();

        if (newUser) {
            res.status(201).json({ success: true, message: "Users created successfully" });
        } else {
            res.status(201).json({ success: false, message: "Users creation failed! try again" });
        }
    } catch (exc) {
        res.status(404).json({ error: true, message: exc.message });
    }
};

exports.userSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email && password) {
            const user = await userModel.findOne({ email });

            if (user && !user.delete_flag) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = createToken(user);

                    const userDetails = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        // delete_flag: user.delete_flag,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        __v: user.__v
                    };

                    res.status(200).json({ success: true, message: "Login Successful.", data: userDetails, token: token });
                } else {
                    res.status(200).json({ success: false, message: "Incorrect email or password!!!" });
                }
            } else {
                res.status(200).json({ success: false, message: "Invalid User!!!" });
            }
        } else {
            res.status(200).json({ success: false, message: "All fields are required!!" });
        }
    } catch (exc) {
        res.status(404).json({ error: true, message: exc.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // const enc_pass = await securePassword(password);

        const user = await userModel.findByIdAndUpdate(req?.params?.id, { name, email, phone });

        if (user) {
            res.status(200).json({ success: true, message: "User updated successfully" });
        } else {
            res.status(200).json({ success: false, message: "Update failed! try again" });
        }
    } catch (exc) {
        res.status(404).json({ error: true, message: exc.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        // const user = await userModel.findByIdAndDelete({_id: req?.params?.id});

        /* soft delete */
        const user = await userModel.findByIdAndUpdate(req?.params?.id, { delete_flag: true });

        if (user) {
            res.status(200).json({ success: true, message: "User deleted" });
        } else {
            res.status(200).json({ success: false, message: "Please try again!!!" });
        }
    } catch (exc) {
        res.status(404).json({ error: true, message: exc.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req?.body;

        const exsistingUser = await userModel.findOne({ _id: req?.params?.id });
        if (exsistingUser) {
            const isMatchedPassword = bcrypt.compareSync(old_password, exsistingUser.password);
            if (isMatchedPassword) {
                const enc_pass = await securePassword(new_password);
                const user = await userModel.findByIdAndUpdate(req?.params?.id, { password: enc_pass });

                if (user) {
                    res.status(200).json({ success: true, message: "Password updated successfully" });
                } else {
                    res.status(200).json({ success: false, message: "Update failed! try again" });
                }
            } else {
                res.status(200).json({ success: false, message: "Password not matched! try again" });
            }
        } else {
            res.status(200).json({ success: false, message: "Invalid User Id!!!" });
        }
    } catch (exc) {
        res.status(404).json({ error: true, message: exc.message });
    }
};

exports.updateProfilePhoto = async (req, res) => {
    try {
        const exsistingUser = await userModel.findOne({ _id: req?.params?.id });
        if (exsistingUser) {
            fs.unlink(exsistingUser.profile_photo, (unlinkError) => {
                if (unlinkError) {
                    console.error(`Error deleting uploaded file:${unlinkError}`);
                }
            });

            const img = req.file ? "public/userImg/" + req.file.filename : exsistingUser.profile_photo;
            const user = await userModel.findByIdAndUpdate(req?.params?.id, { profile_photo: img });

            if (user) {
                res.status(200).json({ success: true, message: "Profile photo updated successfully" });
            } else {
                res.status(200).json({ success: false, message: "Update failed! try again" });
            }
        } else {
            res.status(200).json({ success: false, message: "Invalid User Id!!!" });
        }
    } catch (exc) {
        res.status(404).json({ error: true, message: exc.message });
    }
}