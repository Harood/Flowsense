from playwright.sync_api import APIRequestContext


def test_get_dashboard_returns_200_and_required_fields(api_context: APIRequestContext):
    response = api_context.get("/api/dashboard")
    assert response.status == 200
    body = response.json()
    assert isinstance(body.get("sensor_cards"), list)
    assert isinstance(body.get("chart_last30"), list)


def test_post_to_read_only_dashboard_returns_404(api_context: APIRequestContext):
    response = api_context.post("/api/dashboard", data={"test": True})
    assert response.status == 404


def test_put_alert_status_updates_and_restores_record(api_context: APIRequestContext):
    alerts_response = api_context.get("/api/alerts")
    assert alerts_response.status == 200
    alert = alerts_response.json()[0]
    original_status = alert.get("status", "resolved")
    next_status = "active" if original_status == "resolved" else "resolved"

    update_response = api_context.put(
        "/api/alerts/status",
        data={"datetime": alert["datetime"], "status": next_status},
    )
    assert update_response.status == 200
    assert update_response.json()["alert"]["status"] == next_status

    restore_response = api_context.put(
        "/api/alerts/status",
        data={"datetime": alert["datetime"], "status": original_status},
    )
    assert restore_response.status == 200


def test_delete_to_read_only_dashboard_returns_404(api_context: APIRequestContext):
    response = api_context.delete("/api/dashboard")
    assert response.status == 404
