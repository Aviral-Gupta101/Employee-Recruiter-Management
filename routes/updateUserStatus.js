const express = require("express");
const updateUserStatusController  = require("../controller/updateUserStatusController");
const router = express.Router();

router.post("/", updateUserStatusController.updateUserStatus);

module.exports = router;