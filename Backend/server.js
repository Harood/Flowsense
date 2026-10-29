require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboard");
const alertsRoutes = require("./routes/alerts");
const forecastRoutes = require("./routes/forecast");
const recommendationsRoutes = require("./routes/recommendations");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - allow localhost, the configured frontend URL, and Vercel previews
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
].filter(Boolean));

const vercelOriginPattern = /^https:\/\/[a-z0-9-]+(?:-[a-z0-9-]+)*\.vercel\.app$/i;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.has(origin) || vercelOriginPattern.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
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
const server = app.listen(PORT, () => {
  console.log(`FlowSense backend running on port ${PORT}`);
  console.log(`Allowed CORS origins: ${Array.from(allowedOrigins).join(", ")}, plus matching *.vercel.app domains`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
