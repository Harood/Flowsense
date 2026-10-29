from playwright.sync_api import Page, expect

from conftest import FRONTEND_URL, save_screenshot


def test_dashboard_loads_usage_and_sensors(page: Page, browser_name: str):
    page.goto(f"{FRONTEND_URL}/dashboard")
    expect(page.get_by_role("heading", name="Dashboard", exact=True)).to_be_visible()
    expect(page.get_by_text("Today's Total Usage", exact=True)).to_be_visible()
    expect(page.get_by_role("heading", name="Sensor Overview", exact=True)).to_be_visible()
    expect(page.get_by_text("Master Bathroom", exact=True)).to_be_visible()
    save_screenshot(page, "dashboard-loaded", browser_name)


def test_dashboard_ignores_unknown_query_input(page: Page):
    page.goto(f"{FRONTEND_URL}/dashboard?view=unsupported")
    expect(page.get_by_role("heading", name="Dashboard", exact=True)).to_be_visible()


def test_dashboard_handles_empty_api_data_without_crashing(page: Page):
    page.route("**/api/dashboard", lambda route: route.fulfill(status=200, json={}))
    page.goto(f"{FRONTEND_URL}/dashboard")
    expect(page.get_by_role("heading", name="Dashboard", exact=True)).to_be_visible()
    expect(page.get_by_role("heading", name="Sensor Overview", exact=True)).to_be_visible()
