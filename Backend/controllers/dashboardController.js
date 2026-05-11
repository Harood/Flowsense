const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/dashboard_stats.json");

exports.getDashboard = (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    const dashboardStats = JSON.parse(data);
    res.json(dashboardStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
