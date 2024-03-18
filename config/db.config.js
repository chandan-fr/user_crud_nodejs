const mongoose = require("mongoose");
require("dotenv").config();

// db con and port forward
const dbconn = `${process.env.DB_CONN}${process.env.USER_DB}`;

const connectDatabase = async () => {
    try {
        console.log("Connecting Database....");
        await mongoose.connect(dbconn);
        const DB_Info = {
            status: "Connected to Database",
            host: mongoose.connection.host,
            db: mongoose.connection.name,
            time: new Date()
        };
        console.table(DB_Info);
        
    } catch (exc) {
        console.error("Mongo Connection Error =>", exc.message);
        process.exit(1);
    }
};

module.exports = { connectDatabase };