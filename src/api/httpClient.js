const baseURL = "http://localhost:8000/api/v1";

export async function httpClientAuth(url, options = {}) {
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

export async function httpClient(url, options = {}) {
  const response = await fetch(baseURL + url, {
    headers: {
      "Content-Type": "application/json",

      ...(options.headers || {})
    },
    ...options
  });

  return response;
}