const express = require("express");
const router = express.Router();
const { getForecast } = require("../controllers/forecastController");

router.get("/forecast", getForecast);

module.exports = router;
