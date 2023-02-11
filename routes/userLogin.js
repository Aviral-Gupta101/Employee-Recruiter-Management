const express = require("express");
const userLoginController  = require("../controller/userLoginController");
const router = express.Router();

router.post("/", userLoginController.userLogin);

module.exports = router;