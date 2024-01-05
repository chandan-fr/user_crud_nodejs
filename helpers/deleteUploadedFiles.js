const fs = require("fs");


module.exports = (fileObj, type) => {
    if (type === "file" && fileObj) {
        fs.unlink(fileObj?.path, (unlinkError) => {
            if (unlinkError) {
                console.error(`Error deleting uploaded file:${unlinkError}`);
            }
        });
    }
    if (type === "files" && fileObj) {
        Object.keys(fileObj).forEach((field) => {
            if (Array.isArray(fileObj[field])) {
                fileObj[field]?.map(item => {
                    fs.unlink(item?.path, (unlinkError) => {
                        if (unlinkError) {
                            console.error(`Error deleting uploaded file:${unlinkError}`);
                        }
                    });
                });
            }
        });
    }
};