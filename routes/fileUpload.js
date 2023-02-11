const express = require("express");
const fileUploadController  = require("../controller/fileUploadController");
const router = express.Router();

router.post("/", fileUploadController.fileUpload);

module.exports = router;