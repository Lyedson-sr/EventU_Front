export async function httpClient(url, options = {}) {
  const baseURL = "http://localhost:8000/api/v1";

  const token = localStorage.getItem("access");

  const response = await fetch(baseURL + url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  return response;
}
