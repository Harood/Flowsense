import pytest
from playwright.sync_api import Page, expect

from conftest import ARTIFACTS, FRONTEND_URL


@pytest.mark.bug
def test_dashboard_heading_catches_intentional_regression(page: Page):
    page.goto(f"{FRONTEND_URL}/dashboard")
    page.screenshot(
        path=str(ARTIFACTS / "FAIL_test_intentional_bug_dashboard_heading-chromium.png"),
        full_page=True,
    )
    expect(page.get_by_role("heading", name="Dashboard", exact=True)).to_be_visible()
