const express = require("express");
const adminLoginController  = require("../controller/adminLoginController");
const router = express.Router();

router.post("/", adminLoginController.adminLogin);

module.exports = router;