const API_URL = 'http://localhost:3000/api';

export const fetchDashboard = async () => {
  try {
    const response = await fetch(`${API_URL}/dashboard`);
    if (!response.ok) throw new Error('Failed to fetch dashboard');
    return response.json();
  } catch (error) {
    console.error('Dashboard API error:', error);
    throw error;
  }
};

export const fetchAlerts = async () => {
  try {
    const response = await fetch(`${API_URL}/alerts`);
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return response.json();
  } catch (error) {
    console.error('Alerts API error:', error);
    throw error;
  }
};

export const fetchForecast = async () => {
  try {
    const response = await fetch(`${API_URL}/forecast`);
    if (!response.ok) throw new Error('Failed to fetch forecast');
    return response.json();
  } catch (error) {
    console.error('Forecast API error:', error);
    throw error;
  }
};

export const fetchRecommendations = async () => {
  try {
    const response = await fetch(`${API_URL}/recommendations`);
    if (!response.ok) throw new Error('Failed to fetch recommendations');
    return response.json();
  } catch (error) {
    console.error('Recommendations API error:', error);
    throw error;
  }
};

export const updateAlertStatus = async (datetime: string, status: "active" | "resolved") => {
  try {
    const response = await fetch(`${API_URL}/alerts/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ datetime, status }),
    });
    if (!response.ok) throw new Error('Failed to update alert');
    return response.json();
  } catch (error) {
    console.error('Update alert API error:', error);
    throw error;
  }
};
