const jwt = require("jsonwebtoken");
const secret_key = require("../config/secretKey");

const jwtSessionAuth = (req, res, next) => {
    try {
        let token = req.body.token || req.query.token ||
            req.headers["x-access-token"] || req.headers.authorization
            || req.body.headers.Authorization;

        if (token?.startsWith("Bearer")) {
            token = token.slice(7);
        }
        if (!token) {
            return res.status(401).json({ status: false, message: "Token required for Authentication" });
        }

        const decode = jwt.verify(token, secret_key);
        req.jwtData = decode;

        next();
    } catch (exc) {
        return res.status(401).json({ error: true, message: exc.message });
    }
};

module.exports = jwtSessionAuth;