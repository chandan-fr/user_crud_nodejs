// importing all essentials
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();


// calling route
const userRoute = require("./routes/userRoute");


// making express app
const app = express();

// ======== view =========

// url encoding 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting router api prefix
app.use("/api", userRoute);

// res to browser
app.get("/", (req, res)=>{
    res.send("Hello I am Server. Happy to see you. :)")
});

// db con and port forward
const dbconn = `${process.env.DB_CONN}${process.env.USER_DB}`;

// db connection
mongoose.connect(dbconn).then(() => {
    app.listen(process.env.PORT, () => console.log(`Server Connected. ${process.env.HOST}${process.env.PORT}`))
}).catch(err => console.log(`Error==>${err}`));