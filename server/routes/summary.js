const express = require("express");
const router = express.Router();
const summaryControllers = require("../controllers/summary");

router.post("/", summaryControllers.getSummary);

module.exports = router;
