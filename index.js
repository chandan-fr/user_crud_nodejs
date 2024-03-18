// importing all essentials
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const os = require("os");
const { connectDatabase } = require("./config/db.config");
require("dotenv").config();


// calling route
const userRoute = require("./routes/userRoute");
const paymentRoute = require("./routes/paymentRoute");
const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cartRoute");


// making express app
const app = express();

// db connection
connectDatabase();

app.use("/public", express.static("public"));
app.use(morgan("dev"));

// url encoding 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ======== view =========
// app.set("view engine", "ejs");
// app.set("views", "views");

// server health
app.get("/health", (req, res) => {
    try {
        const networkInterfaces = os.networkInterfaces();

        // Extract IPv4 address
        const IPv4Address = Object.values(networkInterfaces)
            .flat()
            .filter(interfaceInfo => interfaceInfo.family === "IPv4")
            .map(interfaceInfo => interfaceInfo.address);

        if (mongoose.connection.name) {
            const serverHealthInfo = {
                host: IPv4Address,
                message: "Healthy",
                status: true,
                time: new Date(),
            };

            console.table(serverHealthInfo);
            return res.status(200).json({ response: serverHealthInfo });
        } else {
            const serverHealthInfo = {
                host: IPv4Address,
                message: "Unhealthy",
                status: false,
                time: new Date(),
            };

            console.table(serverHealthInfo);
            return res.status(501).json({ response: serverHealthInfo });
        }
    } catch (error) {
        return res.status(501).json({ response: error.message });
    }
});

// cors policy
app.use(cors());

// setting router api prefix
app.use("/api", userRoute);
app.use("/api", paymentRoute);
app.use("/api", orderRoute);
app.use("/api", cartRoute);

// res to browser
app.get("/api/check", (req, res) => {
    res.send("Hello I am Server. Happy to see you. :)")
});

// Internal Server Error
app.use((err, req, res, next) => {
    res.status(500).json({ status: 500, message: err.message });
});

// Page Not Found
app.use((req, res, next) => {
    res.status(404).json({ status: 404, message: "Page not found!" });
});

app.listen(process.env.PORT, () => console.log(`Server Connected to ${process.env.HOST}${process.env.PORT}`));