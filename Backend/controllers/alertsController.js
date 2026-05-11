const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/alerts.json");

exports.getAlerts = (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    const alertsData = JSON.parse(data);
    let alerts = Array.isArray(alertsData) ? alertsData : (alertsData.alerts || []);

    alerts.sort((a, b) => {
      const dateA = new Date(b.datetime);
      const dateB = new Date(a.datetime);
      return dateA - dateB;
    });

    res.json(alerts);
  } catch (error) {
    console.error("Error in getAlerts:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateAlertStatus = (req, res) => {
  try {
    const { datetime, status } = req.body;

    if (!datetime || !status) {
      return res.status(400).json({ error: "datetime and status are required" });
    }

    const data = fs.readFileSync(dataPath, "utf-8");
    const alertsData = JSON.parse(data);
    let alerts = Array.isArray(alertsData) ? alertsData : (alertsData.alerts || []);

    const alertIndex = alerts.findIndex(a => a.datetime === datetime);
    if (alertIndex === -1) {
      return res.status(404).json({ error: "Alert not found" });
    }

    alerts[alertIndex].status = status;

    fs.writeFileSync(dataPath, JSON.stringify(alerts, null, 2));
    res.json({ success: true, alert: alerts[alertIndex] });
  } catch (error) {
    console.error("Error in updateAlertStatus:", error);
    res.status(500).json({ error: error.message });
  }
};
