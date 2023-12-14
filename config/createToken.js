const jwt = require("jsonwebtoken");
const secret_key = require("../config/secretKey");


const createToken = (user) => {
    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
    }, secret_key, { expiresIn: "9h" });

    return token;
};

module.exports = createToken;