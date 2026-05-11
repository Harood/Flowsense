const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/recommendations.json");

exports.getRecommendations = (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    const recommendationsData = JSON.parse(data);
    const recommendations = recommendationsData.recommendations || [];
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
