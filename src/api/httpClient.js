export async function httpClient(url, options = {}) {

  const baseURL = "http://localhost:8000/api/v1";

  const response = await fetch(baseURL + url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  return response;
}
