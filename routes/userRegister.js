const express = require("express");
const userRegisterController  = require("../controller/userRegisterController");
const router = express.Router();

router.post("/", userRegisterController.userRegister);

module.exports = router;