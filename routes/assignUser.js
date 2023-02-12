const express = require("express");
const assignUserController  = require("../controller/assignUserController");
const router = express.Router();

router.get("/", assignUserController.assginUser);

module.exports = router;