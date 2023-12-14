const bcrypt = require("bcryptjs");

const securePassword = async (password) => {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
};

module.exports = securePassword;