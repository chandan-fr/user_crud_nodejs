// importing all essentials
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    phone:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    delete_flag:{
        type: Boolean,
        default: false
    },
    profile_photo:{
        type: String, 
    }
},{timestamps: true});


module.exports = mongoose.model("user", userSchema);