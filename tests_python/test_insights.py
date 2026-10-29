from playwright.sync_api import Page, expect

from conftest import FRONTEND_URL, save_screenshot


def test_insights_loads_kpis_and_usage_trends(page: Page, browser_name: str):
    page.goto(f"{FRONTEND_URL}/insights")
    expect(page.get_by_role("heading", name="Insights & Analytics", exact=True)).to_be_visible()
    expect(page.get_by_text("Total Usage", exact=True)).to_be_visible()
    expect(page.get_by_text("Usage Trends", exact=True)).to_be_visible()
    save_screenshot(page, "insights-loaded", browser_name)


def test_insights_next_month_changes_the_selected_month(page: Page):
    page.goto(f"{FRONTEND_URL}/insights")
    expect(page.get_by_text("January 2026", exact=True)).to_be_visible()
    page.locator("button").filter(has_text="›").click()
    expect(page.get_by_text("February 2026", exact=True)).to_be_visible()


def test_insights_disables_previous_button_at_first_month(page: Page):
    page.goto(f"{FRONTEND_URL}/insights")
    expect(page.locator("button").filter(has_text="‹")).to_be_disabled()
