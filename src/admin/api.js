// Centralized resilient API fetch helper
export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function getApiUrl(endpoint) {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return API_BASE_URL ? `${API_BASE_URL}${formattedEndpoint}` : formattedEndpoint;
}

export async function apiFetch(endpoint, options = {}) {
  const finalOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  };

  const targetUrl = getApiUrl(endpoint);

  try {
    const res = await fetch(targetUrl, finalOptions);
    const text = await res.text();
    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Unexpected non-JSON response from server');
      }
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    // Fallback directly to port 5000 if relative request failed in local dev
    if (!targetUrl.startsWith('http')) {
      try {
        const directUrl = `http://localhost:5000${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
        const res = await fetch(directUrl, finalOptions);
        const text = await res.text();
        let data = {};
        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            throw new Error('Unexpected non-JSON response from server');
          }
        }
        return { ok: res.ok, status: res.status, data };
      } catch (fallbackErr) {
        throw new Error('Server connection failed. Please ensure the backend server is running and accessible.');
      }
    }
    throw err;
  }
}

