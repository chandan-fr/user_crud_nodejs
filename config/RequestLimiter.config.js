const rateLimit = require("express-rate-limit");

exports.limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 50, // limit each window ip to 1 req/window
    message: "Too Many Requests.",
    trustProxy: true,
    keyGenerator: (req)=>req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
});