const express = require("express");
const router = express.Router();
const downloadMp3Controllers = require("../controllers/downloadMp3");

router.get("/", downloadMp3Controllers.getDownloadMp3);

module.exports = router;
