// importing all essentials
const userModel = require("../model/user");
const bcrypt = require("bcryptjs");
const createToken = require("../config/createToken");
const securePassword = require("../config/securePassword");


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

        const enc_pass = await securePassword(password);

        const user = userModel({ name, email, phone, password: enc_pass });
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

            if (user && (bcrypt.compareSync(password, user.password))) {
                const token = createToken(user);

                const userDetails = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    __v: user.__v
                };

                res.status(200).json({ success: true, message: "Login Successful.", data: userDetails, token: token });
            } else {
                res.status(200).json({ success: false, message: "Incorrect email or password!!!" });
            }
        } else {
            res.status(200).json({ success: false, message: "All fields are required!!" });
        }
    } catch (exc) {
        res.status(404).json({ error: true, message: exc.message });
    }
};