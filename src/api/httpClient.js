const baseURL = "http://localhost:8000/api/v1";

export async function httpClientAuth(url, options = {}) {
  console.log("Auth")
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
  console.log("No Auth")
  const response = await fetch(baseURL + url, {
    headers: {
      "Content-Type": "application/json",

      ...(options.headers || {})
    },
    ...options
  });

  return response;
}