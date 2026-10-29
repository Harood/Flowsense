# Python Playwright Tests

Install dependencies with:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements-playwright.txt
.\.venv\Scripts\python.exe -m playwright install chromium firefox webkit
```

The tests are split by feature and concern: `test_dashboard.py`, `test_alerts.py`, `test_insights.py`, `test_forecast.py`, `test_api_crud.py`, `test_network_mocking.py`, `test_notifications.py`, and the separately marked `test_intentional_bug.py`.

Run the standard suite with:

```powershell
.\.venv\Scripts\python.exe -m pytest tests_python -q --browser chromium --browser firefox
```

Run all browser engines with the Windows helper:

```powershell
.\run_all_browsers.ps1
```

Run the intentional regression separately:

```powershell
.\.venv\Scripts\python.exe -m pytest tests_python/test_intentional_bug.py -q --override-ini addopts="" -m bug --browser chromium
```

The fixture starts the local Backend and Frontend automatically unless `FLOWSENSE_BASE_URL` is set.
