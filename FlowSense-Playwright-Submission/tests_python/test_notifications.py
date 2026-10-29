from playwright.sync_api import Page, expect

from conftest import FRONTEND_URL


def test_notification_panel_opens(page: Page):
    page.goto(f"{FRONTEND_URL}/dashboard")
    page.locator("header button").click()
    expect(page.get_by_role("heading", name="Notifications", exact=True)).to_be_visible()


def test_notification_panel_handles_empty_alert_data(page: Page):
    page.route("**/api/alerts", lambda route: route.fulfill(status=200, json=[]))
    page.goto(f"{FRONTEND_URL}/dashboard")
    page.locator("header button").click()
    expect(page.get_by_role("heading", name="Notifications", exact=True)).to_be_visible()
    expect(page.get_by_role("heading", name="No new notifications", exact=True)).to_be_visible()
