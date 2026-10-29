from playwright.sync_api import Page, expect

from conftest import FRONTEND_URL, save_screenshot


def test_forecast_loads_summary_cards(page: Page, browser_name: str):
    page.goto(f"{FRONTEND_URL}/forecast")
    expect(page.get_by_role("heading", name="Water Usage Forecast", exact=True)).to_be_visible()
    expect(page.get_by_text("7-Day Forecast", exact=True).first).to_be_visible()
    expect(page.get_by_text("30-Day Forecast", exact=True).first).to_be_visible()
    save_screenshot(page, "forecast-loaded", browser_name)


def test_forecast_switches_to_thirty_day_view(page: Page):
    page.goto(f"{FRONTEND_URL}/forecast")
    page.get_by_role("tab", name="30-Day Forecast").click()
    expect(page.get_by_role("tab", name="30-Day Forecast")).to_have_attribute("data-state", "active")


def test_forecast_shows_error_when_api_fails(page: Page):
    page.route("**/api/forecast", lambda route: route.fulfill(status=500, json={"error": "simulated failure"}))
    page.goto(f"{FRONTEND_URL}/forecast")
    expect(page.get_by_text("Error loading forecast", exact=True)).to_be_visible()
