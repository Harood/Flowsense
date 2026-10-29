import re

from playwright.sync_api import Page, expect

from conftest import FRONTEND_URL, save_screenshot


def test_alerts_page_shows_summary_and_all_filter(page: Page, browser_name: str):
    page.goto(f"{FRONTEND_URL}/alerts")
    expect(page.get_by_role("heading", name="Alerts", exact=True)).to_be_visible()
    expect(page.get_by_role("heading", name="Recent Alerts", exact=True)).to_be_visible()
    expect(page.get_by_role("button", name=re.compile(r"^All \("))).to_be_visible()
    save_screenshot(page, "alerts-loaded", browser_name)


def test_alerts_filters_switch_between_active_and_resolved(page: Page):
    page.goto(f"{FRONTEND_URL}/alerts")
    active = page.get_by_role("button", name=re.compile(r"^Active \("))
    resolved = page.get_by_role("button", name=re.compile(r"^Resolved \("))
    assert active.inner_text().startswith("Active (")
    assert resolved.inner_text().startswith("Resolved (")
    active.click()
    expect(active).to_have_class(re.compile(r"bg-red-500"))
    resolved.click()
    expect(resolved).to_have_class(re.compile(r"bg-green-500"))


def test_alerts_empty_filter_state_is_readable(page: Page):
    page.route("**/api/alerts", lambda route: route.fulfill(status=200, json=[]))
    page.goto(f"{FRONTEND_URL}/alerts")
    expect(page.get_by_text("No alerts found", exact=True)).to_be_visible()
