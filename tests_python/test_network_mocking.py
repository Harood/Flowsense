from playwright.sync_api import Page, expect

from conftest import FRONTEND_URL


def test_dashboard_renders_empty_mocked_response(page: Page):
    page.route("**/api/dashboard", lambda route: route.fulfill(status=200, json={}))
    page.goto(f"{FRONTEND_URL}/dashboard")
    expect(page.get_by_role("heading", name="Dashboard", exact=True)).to_be_visible()
    expect(page.get_by_role("heading", name="Sensor Overview", exact=True)).to_be_visible()


def test_alerts_renders_error_when_mocked_server_fails(page: Page):
    page.route("**/api/alerts", lambda route: route.fulfill(status=500, json={"error": "mocked server error"}))
    page.goto(f"{FRONTEND_URL}/alerts")
    expect(page.get_by_text("Failed to fetch alerts", exact=True)).to_be_visible()
