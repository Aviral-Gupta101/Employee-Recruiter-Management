const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const verifyUserJWT = require("./middleware/verifyUserJwt");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


/* CONNECT DB */
connectDB();


/* IN-BUILT MIDDLEWARE */
app.use(express.json());
app.use(cookieParser());


/* CUSTOM MIDDLEWARE */
app.use(logger);


/* ROUTES */
app.use("/register",require("./routes/userRegister"));
app.use("/login",require("./routes/userLogin"));
app.use("/upload",verifyUserJWT,require("./routes/fileUpload"));

// FIXME: Just to check working or not 
app.get("/",verifyUserJWT ,(req, res) => {
    res.send("All working fine")
});




mongoose.connection.once("open", ()=>{
    console.log("DB Connected");
    app.listen(PORT, ()=>{console.log("Server started at http://localhost:3000");});
})





