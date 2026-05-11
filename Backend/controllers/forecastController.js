const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/forecast.json");

exports.getForecast = (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    const forecastData = JSON.parse(data);
    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
