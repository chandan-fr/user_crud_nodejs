const deleteUploadedFiles = require("../helpers/deleteUploadedFiles");

// model authentication
module.exports = (validator) => {
    return (req, res, next) => {
        const { error, value } = validator(req.body);
        if (error) {
            console.log("file ==>", req.file);
            console.log("files ==>", req.files);
            if (req.files) {
                deleteUploadedFiles(req.files);
            }
            return res.status(400).json({ success: false, message: error?.details[0]?.message, type: error?.details[0]?.path[0] })
        }
        next();
    }
};