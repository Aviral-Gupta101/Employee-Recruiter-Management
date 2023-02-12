const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const verifyUserJWT = require("./middleware/verifyUserJwt");
const verifyAdminJWT = require("./middleware/verifyAdminJwt");
const verifyRecruiterJWT = require("./middleware/verifyRecruiterJwt");
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
app.use("/status",verifyUserJWT,require("./routes/checkStatus"));

app.use("/admin",require("./routes/adminLogin"));
app.use("/admin/register/recruiter", verifyAdminJWT, require("./routes/recruiterRegister"));
app.use("/recruiter/login", require("./routes/recruiterLogin"));
app.use("/recruiter/getuser",verifyRecruiterJWT,require("./routes/assignUser"));
app.use("/recruiter/get/resume",verifyRecruiterJWT,require("./routes/getResume"));
app.use("/recruiter/update/status",verifyRecruiterJWT,require("./routes/updateUserStatus"));


// FIXME: Just to check working or not 
app.get("/",verifyUserJWT ,(req, res) => {
    res.send("All working fine")
});




mongoose.connection.once("open", ()=>{
    console.log("DB Connected");
    app.listen(PORT, ()=>{console.log("Server started at http://localhost:3000");});
})





