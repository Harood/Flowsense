require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboard");
const alertsRoutes = require("./routes/alerts");
const forecastRoutes = require("./routes/forecast");
const recommendationsRoutes = require("./routes/recommendations");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api", dashboardRoutes);
app.use("/api", alertsRoutes);
app.use("/api", forecastRoutes);
app.use("/api", recommendationsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`FlowSense backend running on port ${PORT}`);
});
