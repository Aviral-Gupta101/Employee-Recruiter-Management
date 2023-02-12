const express = require("express");
const checkStatusController  = require("../controller/checkStatusController");
const router = express.Router();

router.get("/", checkStatusController.checkStatus);

module.exports = router;