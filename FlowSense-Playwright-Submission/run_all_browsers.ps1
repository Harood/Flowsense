$python = Join-Path $PSScriptRoot '.venv\Scripts\python.exe'

& $python -m pytest tests_python -q --browser chromium --html=artifacts\python-report-chromium.html --self-contained-html
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& $python -m pytest tests_python -q --browser firefox --html=artifacts\python-report-firefox.html --self-contained-html
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& $python -m pytest tests_python -q --browser webkit --html=artifacts\python-report-webkit.html --self-contained-html
exit $LASTEXITCODE
