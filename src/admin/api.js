// Centralized resilient API fetch helper
export async function apiFetch(endpoint, options = {}) {
  const finalOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  };

  try {
    const res = await fetch(endpoint, finalOptions);
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
    // Fallback directly to port 5000 if relative request failed
    if (!endpoint.startsWith('http')) {
      try {
        const directUrl = `http://localhost:5000${endpoint}`;
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
        throw new Error('Server connection failed. Please ensure the backend server is running on port 5000.');
      }
    }
    throw err;
  }
}
