const userModel = require("../model/user");

exports.checkDuplicateEntries = async (req, res, next) => {
    const { email } = req.body;
    try {
        const existingEmail = await userModel.findOne({ email: email });

        if (existingEmail) {
            return res.status(200).json({ success: false, message: `'${email}' already exist!!` });
        }

        next();
    } catch (exc) {
        res.status(404).json({ error: true, message: exc.message });
    }
};