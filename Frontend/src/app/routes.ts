import { createBrowserRouter } from "react-router";
import { DashboardPage } from "./pages/DashboardPage";
import { InsightsPage } from "./pages/InsightsPage";
import { AlertsPage } from "./pages/AlertsPage";
import { ForecastPage } from "./pages/ForecastPage";
import { Root } from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: DashboardPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "insights", Component: InsightsPage },
      { path: "alerts", Component: AlertsPage },
      { path: "forecast", Component: ForecastPage },
    ],
  },
]);