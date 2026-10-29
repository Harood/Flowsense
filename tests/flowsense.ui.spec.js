// @ts-check
import { test, expect } from '@playwright/test';

test.describe('FlowSense dashboard', () => {
  test('loads dashboard data and sensor overview', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sensor Overview' })).toBeVisible();
    await expect(page.getByText("Today's Total Usage")).toBeVisible();
    await expect(page.getByText('Current consumption')).toBeVisible();
  });

  test('navigates between the main product pages', async ({ page }) => {
    await page.goto('/dashboard');

    await page.getByRole('button', { name: 'Insights', exact: true }).click();
    await expect(page).toHaveURL(/\/insights$/);
    await expect(page.getByRole('heading', { name: 'Insights & Analytics' })).toBeVisible();

    await page.getByRole('button', { name: 'Alerts', exact: true }).click();
    await expect(page).toHaveURL(/\/alerts$/);
    await expect(page.getByRole('heading', { name: 'Alerts', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Forecast', exact: true }).click();
    await expect(page).toHaveURL(/\/forecast$/);
    await expect(page.getByRole('heading', { name: 'Water Usage Forecast' })).toBeVisible();
  });

  test('shows alert summary and filter controls', async ({ page }) => {
    await page.goto('/alerts');

    await expect(page.getByRole('heading', { name: 'Recent Alerts' })).toBeVisible();
    await expect(page.getByRole('button', { name: /All \(/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Active \(/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Resolved \(/ })).toBeVisible();
  });
});