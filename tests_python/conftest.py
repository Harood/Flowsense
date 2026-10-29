from __future__ import annotations

import os
import subprocess
import time
from pathlib import Path
from urllib.request import urlopen

import pytest
from playwright.sync_api import APIRequestContext, Playwright

ROOT = Path(__file__).resolve().parents[1]
FRONTEND_URL = os.getenv("FLOWSENSE_BASE_URL", "http://127.0.0.1:5173")
BACKEND_URL = os.getenv("FLOWSENSE_API_URL", "http://127.0.0.1:5000")
ARTIFACTS = ROOT / "artifacts" / "screenshots"


def _is_ready(url: str) -> bool:
    try:
        with urlopen(url, timeout=2) as response:
            return 200 <= response.status < 500
    except Exception:
        return False


def _start(command: list[str], cwd: Path) -> subprocess.Popen:
    npm_command = command[0]
    if os.name == "nt" and npm_command == "npm":
        command[0] = "npm.cmd"
    return subprocess.Popen(
        command,
        cwd=cwd,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if os.name == "nt" else 0,
    )


def _wait_for(url: str, process: subprocess.Popen, timeout: int = 60) -> None:
    deadline = time.time() + timeout
    while time.time() < deadline:
        if _is_ready(url):
            return
        if process.poll() is not None:
            raise RuntimeError(f"Process stopped before {url} became available")
        time.sleep(0.5)
    raise TimeoutError(f"Timed out waiting for {url}")


@pytest.fixture(scope="session", autouse=True)
def local_services():
    ARTIFACTS.mkdir(parents=True, exist_ok=True)

    if os.getenv("FLOWSENSE_BASE_URL"):
        yield
        return

    owned_processes: list[subprocess.Popen] = []
    if not _is_ready(f"{BACKEND_URL}/health"):
        backend = _start(["npm", "start"], ROOT / "Backend")
        owned_processes.append(backend)
        _wait_for(f"{BACKEND_URL}/health", backend)

    if not _is_ready(FRONTEND_URL):
        frontend = _start(["npm", "run", "dev", "--", "--host", "127.0.0.1"], ROOT / "Frontend")
        owned_processes.append(frontend)
        _wait_for(FRONTEND_URL, frontend)

    yield

    for process in reversed(owned_processes):
        if process.poll() is None:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()


def save_screenshot(page, name: str, browser_name: str) -> None:
    path = ARTIFACTS / f"{name}-{browser_name}.png"
    page.screenshot(path=str(path), full_page=True)


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    setattr(item, f"rep_{report.when}", report)
    if report.when == "call" and report.failed and "page" in item.fixturenames:
        try:
            page = item.funcargs["page"]
            browser_name = item.funcargs.get("browser_name", "browser")
            test_name = item.name.replace(" ", "_").replace("/", "_")
            page.screenshot(
                path=str(ARTIFACTS / f"FAIL_{test_name}-{browser_name}.png"),
                full_page=True,
            )
        except Exception:
            pass


@pytest.fixture
def api_context(playwright: Playwright) -> APIRequestContext:
    context = playwright.request.new_context(base_url=BACKEND_URL)
    yield context
    context.dispose()
