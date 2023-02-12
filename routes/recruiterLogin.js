const express = require("express");
const recruiterLoinController  = require("../controller/recruiterLoinController");
const router = express.Router();

router.post("/", recruiterLoinController.recruiterLogin);

module.exports = router;