const fs = require("fs");


module.exports = (fileObj) => {
    Object.keys(fileObj).forEach((field) => {
        if (Array.isArray(fileObj[field])) {
            fileObj[field].map(item => {
                fs.unlink(item.path, (unlinkError) => {
                    if (unlinkError) {
                        console.error(`Error deleting uploaded file:${unlinkError}`);
                    }
                });
            });
        }
    });
};