const express = require("express");
const router = express.Router();
const ControllerHistory = require("../controllers/controllerHistory");

router.get("/", ControllerHistory.getHistory);

module.exports = router;
