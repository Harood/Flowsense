const express = require("express");
const router = express.Router();
const { getAlerts, updateAlertStatus } = require("../controllers/alertsController");

router.get("/alerts", getAlerts);
router.put("/alerts/status", updateAlertStatus);

module.exports = router;
