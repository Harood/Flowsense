# FlowSense - Software Testing Final Project Report
## Complex Engineering Activity: Automated Testing with Playwright and Python

---

**Course:** Software Testing and Quality Assurance
**Project:** FlowSense Water Usage Anomaly Detection Dashboard
**Testing Framework:** Playwright for Python with `pytest-playwright`
**Test Engines:** Chromium, Mozilla Firefox, and WebKit
**Testing Team:** Haris Masood (SE-23088), M. Huzaifa Hassan (SE-23089)
**Date of Submission:** October 2026

---

## 1. Executive Summary

FlowSense is a web-based water management dashboard that presents sensor usage, anomaly alerts, historical insights, and machine-learning forecasts. The application consists of a React/Vite frontend and an Express backend API.

A modular automated testing suite was implemented with Playwright for Python and pytest. The suite validates the most important user workflows, backend response contracts, frontend behavior during network failures, cross-browser compatibility, and regression detection.

The project satisfies the required testing activities:

1. **Four core features with 12 end-to-end tests:** Dashboard Monitoring, Alerts Monitoring, Insights Analytics, and Forecasting.
2. **Four API tests:** GET, POST, PUT, and DELETE behavior with status and response assertions.
3. **Two network-mocking tests:** Empty data and HTTP 500 failure scenarios.
4. **Additional notification tests:** Opening the notification panel and handling an empty alert response.
5. **Cross-browser execution:** Chromium and Firefox completed successfully; WebKit was attempted and documented as a Windows launch limitation.
6. **Intentional bug demonstration:** A temporary Dashboard heading regression was injected, detected by Playwright, logged, and restored.
7. **Submission artifacts:** Test modules, screenshots, HTML reports, failure evidence, and a Windows execution script.

The standard test suite contains **20 tests**. The intentional regression is a separate marked test and is excluded from the normal green run.

## 2. System Under Test and Scope Analysis

### 2.1 System Under Test

FlowSense supports the following operational workflows:

- Users view current water consumption and sensor health on the Dashboard.
- Users review anomaly records and filter Alerts by active or resolved status.
- Users inspect historical usage KPIs and move between monthly Insights views.
- Users review seven-day and thirty-day water usage Forecasts.
- Users open the notification panel to review active alerts.
- The frontend retrieves data through the Express API endpoints under `/api`.

### 2.2 Features In Scope and Features Left Out

| Feature / Subsystem | Status | Technical Rationale |
|---|---|---|
| Dashboard Monitoring | **IN-SCOPE** | Core view for usage totals, sensor health, and consumption summaries. |
| Alerts Monitoring | **IN-SCOPE** | Critical anomaly workflow with active/resolved filtering. |
| Insights Analytics | **IN-SCOPE** | Verifies historical KPIs and month navigation. |
| Water Usage Forecasting | **IN-SCOPE** | Verifies seven-day and thirty-day prediction views. |
| Notification Panel | **IN-SCOPE** | Confirms active alerts can be surfaced to the user. |
| REST API | **IN-SCOPE** | Validates status codes and JSON response structure. |
| Network Failure Handling | **IN-SCOPE** | Tests empty responses and server errors through route interception. |
| Authentication | OUT-OF-SCOPE | No authentication workflow is implemented in this version. |
| Payments and External Integrations | OUT-OF-SCOPE | No corresponding UI or backend endpoints exist. |
| Live Sensor Hardware | OUT-OF-SCOPE | Hardware is not available in the local test environment. |
| ML Model Retraining | OUT-OF-SCOPE | Model training is not a browser workflow and is not deterministic E2E behavior. |

## 3. Comprehensive Test Case Matrix

| Test ID | Module | Target Feature | Test Objective | Category | Outcome |
|---|---|---|---|---|---|
| TC-01 | `test_dashboard.py` | Dashboard | Load usage totals and sensor overview | Positive E2E | PASS |
| TC-02 | `test_dashboard.py` | Dashboard | Handle an unsupported query value | Negative E2E | PASS |
| TC-03 | `test_dashboard.py` | Dashboard | Render safely with empty dashboard JSON | Negative E2E | PASS |
| TC-04 | `test_alerts.py` | Alerts | Load alert summary and All filter | Positive E2E | PASS |
| TC-05 | `test_alerts.py` | Alerts | Switch between Active and Resolved filters | Positive E2E | PASS |
| TC-06 | `test_alerts.py` | Alerts | Display an empty-alert state | Negative E2E | PASS |
| TC-07 | `test_insights.py` | Insights | Load KPI cards and Usage Trends | Positive E2E | PASS |
| TC-08 | `test_insights.py` | Insights | Navigate from January to February 2026 | Positive E2E | PASS |
| TC-09 | `test_insights.py` | Insights | Disable navigation before the first month | Negative E2E | PASS |
| TC-10 | `test_forecast.py` | Forecast | Load seven-day and thirty-day summaries | Positive E2E | PASS |
| TC-11 | `test_forecast.py` | Forecast | Switch to the thirty-day tab | Positive E2E | PASS |
| TC-12 | `test_forecast.py` | Forecast | Render an error state after HTTP 500 | Negative E2E | PASS |
| TC-13 | `test_notifications.py` | Notifications | Open the notification panel | Positive E2E | PASS |
| TC-14 | `test_notifications.py` | Notifications | Handle an empty notification list | Negative E2E | PASS |
| TC-15 | `test_api_crud.py` | Dashboard API [GET] | Return HTTP 200 and required JSON fields | Positive API | PASS |
| TC-16 | `test_api_crud.py` | Dashboard API [POST] | Reject unsupported dashboard creation | Negative API | PASS (404) |
| TC-17 | `test_api_crud.py` | Alerts API [PUT] | Update and restore an alert status | Positive API | PASS (200) |
| TC-18 | `test_api_crud.py` | Dashboard API [DELETE] | Reject unsupported dashboard deletion | Negative API | PASS (404) |
| TC-19 | `test_network_mocking.py` | Network Mocking | Return empty dashboard data | Negative Mock | PASS |
| TC-20 | `test_network_mocking.py` | Network Mocking | Return HTTP 500 for alerts | Negative Mock | PASS |
| TC-21 | `test_intentional_bug.py` | Regression Detection | Detect the temporary Dashboard heading bug | Intentional Bug | FAIL* |

\* TC-21 is intentionally expected to fail during the demonstration. It is excluded from the standard green test run.

## 4. Test Suite Implementation and Architecture

```text
FlowSense/
|-- pytest.ini
|-- requirements-playwright.txt
|-- run_all_browsers.ps1
|-- tests_python/
|   |-- conftest.py
|   |-- test_dashboard.py
|   |-- test_alerts.py
|   |-- test_insights.py
|   |-- test_forecast.py
|   |-- test_notifications.py
|   |-- test_api_crud.py
|   |-- test_network_mocking.py
|   `-- test_intentional_bug.py
|-- artifacts/
|   |-- python-report-all-browsers.html
|   |-- python-report-chromium.html
|   |-- intentional-bug-failure.txt
|   `-- screenshots/
`-- FlowSense-Playwright-Submission.zip
```

### 4.1 Shared Fixtures

`tests_python/conftest.py` provides the shared testing infrastructure:

- Starts the Express backend and Vite frontend when they are not already running.
- Waits for `/health` and the frontend URL before tests begin.
- Creates and disposes a Playwright `APIRequestContext`.
- Provides frontend and backend base URLs through environment variables.
- Saves feature screenshots using browser-specific filenames.
- Attempts failure screenshots through a pytest report hook.

The suite can run locally in VS Code or against another environment by setting `FLOWSENSE_BASE_URL` and `FLOWSENSE_API_URL`.

## 5. Visual Evidence and Screenshot Capture

The following feature tests capture full-page screenshots for both Chromium and Firefox:

- Dashboard loaded state.
- Alerts loaded state.
- Insights loaded state.
- Forecast loaded state.

The intentional regression also includes a dedicated failure screenshot showing the Dashboard with the temporary incorrect heading. All image evidence is stored under `artifacts/screenshots/` and included in the existing submission package.

## 6. API Testing and Network Mocking

### 6.1 REST API Tests

The API tests use Playwright's `APIRequestContext` rather than a browser page:

- **GET:** `/api/dashboard` returns HTTP 200 and includes `sensor_cards` and `chart_last30` arrays.
- **POST:** Posting to the read-only dashboard endpoint returns HTTP 404.
- **PUT:** `/api/alerts/status` updates an alert and restores its original status afterward.
- **DELETE:** Deleting the read-only dashboard endpoint returns HTTP 404.

The PUT test restores the original JSON data, preventing test execution from permanently changing the repository fixture.

### 6.2 Network Mocking Tests

The frontend request layer is intercepted with Playwright's `page.route()` API:

- An empty dashboard response verifies that the page shell remains rendered.
- An HTTP 500 alerts response verifies that the frontend displays `Failed to fetch alerts` without crashing.

## 7. Intentional Bug Demonstration and Failure Detection

To prove that the suite detects regressions, the Dashboard heading was temporarily changed from:

```tsx
Dashboard
```

to:

```tsx
Dashboard (Bug)
```

The test in `test_intentional_bug.py` continued to expect the correct product heading. Playwright failed with a locator assertion because the expected heading was not visible. The failure output was saved to:

```text
artifacts/intentional-bug-failure.txt
```

The failure screenshot was saved to:

```text
artifacts/screenshots/FAIL_test_intentional_bug_dashboard_heading-chromium.png
```

After evidence was captured, the application heading was restored and the standard suite was rerun successfully.

Command used for the demonstration:

```powershell
.\.venv\Scripts\python.exe -m pytest tests_python/test_intentional_bug.py -q --override-ini addopts="" -m bug --browser chromium
```

## 8. Cross-Browser Execution Results and HTML Report

The final clean execution command was:

```powershell
.\.venv\Scripts\python.exe -m pytest tests_python -q --browser chromium --browser firefox --html=artifacts\python-report-all-browsers.html --self-contained-html
```

### 8.1 Verified Results

| Execution | Result |
|---|---|
| Chromium UI tests | 16 passed |
| Firefox UI tests | 16 passed |
| API tests | 4 passed |
| Standard total | **36 passed** |
| Intentional bug test | 1 expected failure |
| WebKit | Attempted; browser executable exited during startup on Windows |

The HTML report is available at `artifacts/python-report-all-browsers.html`. WebKit's Windows launch limitation is recorded in `artifacts/webkit-launch-note.txt`; it occurred before application tests were reached and is not an application assertion failure.

## 9. Team Member Contribution Breakdown

| Team Member | Responsibilities |
|---|---|
| **Haris Masood (SE-23088)** | Dashboard and Alerts E2E modules, API contract review, test data verification, and backend behavior analysis. |
| **M. Huzaifa Hassan (SE-23089)** | Insights and Forecast E2E modules, network mocking, screenshot evidence, and report packaging. |
| **Both members** | Reviewed every test, executed the browser runs, discussed expected results, and prepared the intentional bug demonstration. |

Both members should be able to explain each fixture, locator, API assertion, mock route, browser result, and expected outcome during the final demonstration.

## 10. Conclusion

The FlowSense testing project provides a structured, maintainable Python Playwright suite for the application's principal workflows. It validates 20 standard scenarios, detects an intentional regression, verifies backend contracts, exercises frontend network resilience, produces visual evidence, and supports repeatable local and CI execution.

The final verified Chromium and Firefox run completed with **36 passing standard executions**. WebKit was attempted and its host-specific startup limitation was documented transparently. The application source was restored to its correct state after the intentional bug demonstration.
