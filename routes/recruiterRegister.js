const express = require("express");
const recruiterRegisterController  = require("../controller/recruiterRegisterController");
const router = express.Router();

router.post("/", recruiterRegisterController.recruiterRegister);

module.exports = router;