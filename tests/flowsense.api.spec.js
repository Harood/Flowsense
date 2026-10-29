// @ts-check
import { test, expect } from '@playwright/test';

const backendBaseUrl = 'http://localhost:5000';

test.describe('FlowSense API', () => {
  test('health endpoint reports a running backend', async ({ request }) => {
    const response = await request.get(`${backendBaseUrl}/health`);
    const health = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(health).toEqual({ status: 'FlowSense backend is running' });
  });

  test('dashboard returns the data needed by the dashboard page', async ({ request }) => {
    const response = await request.get(`${backendBaseUrl}/api/dashboard`);
    const dashboard = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(dashboard).toEqual(expect.objectContaining({
      sensor_cards: expect.any(Array),
      chart_last30: expect.any(Array),
      today_total_L: expect.any(Number),
      active_sensors: expect.any(Number),
    }));
    expect(dashboard.sensor_cards.length).toBeGreaterThan(0);
  });

  test('alerts returns an array of alert records', async ({ request }) => {
    const response = await request.get(`${backendBaseUrl}/api/alerts`);
    const alerts = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(Array.isArray(alerts)).toBeTruthy();
    expect(alerts.length).toBeGreaterThan(0);
    expect(alerts[0]).toEqual(expect.objectContaining({
      datetime: expect.any(String),
      detected_sensor: expect.any(String),
      severity: expect.any(String),
    }));
  });

  test('forecast and recommendations endpoints return usable collections', async ({ request }) => {
    const [forecastResponse, recommendationsResponse] = await Promise.all([
      request.get(`${backendBaseUrl}/api/forecast`),
      request.get(`${backendBaseUrl}/api/recommendations`),
    ]);
    const forecast = await forecastResponse.json();
    const recommendations = await recommendationsResponse.json();

    expect(forecastResponse.ok()).toBeTruthy();
    expect(recommendationsResponse.ok()).toBeTruthy();
    expect(forecast).toEqual(expect.objectContaining({
      next_7_days: expect.any(Array),
      next_30_days: expect.any(Array),
    }));
    expect(Array.isArray(recommendations)).toBeTruthy();
  });
});