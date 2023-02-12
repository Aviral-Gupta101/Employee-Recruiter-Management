const express = require("express");
const getResumeController  = require("../controller/getResumeController");
const router = express.Router();

router.get("/", getResumeController.getResume);

module.exports = router;