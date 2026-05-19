require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboard");
const alertsRoutes = require("./routes/alerts");
const forecastRoutes = require("./routes/forecast");
const recommendationsRoutes = require("./routes/recommendations");

const app = express();
const PORT = process.env.PORT || 5000;


// CORS Configuration - allow Vercel frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL || "https://flowsense-seven.vercel.app",
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Routes
app.use("/api", dashboardRoutes);
app.use("/api", alertsRoutes);
app.use("/api", forecastRoutes);
app.use("/api", recommendationsRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "FlowSense backend is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`FlowSense backend running on port ${PORT}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(", ")}`);
});
