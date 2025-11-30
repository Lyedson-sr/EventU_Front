import { httpClient } from "./httpClient";

export function loginRequest(email, password, role) {
  return httpClient("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password, role })
  });
}

export function registerUserRequest(email, name, role, password) {
  return httpClient("/auth/register/", {
    method: "POST",
    body: JSON.stringify({ email, name, role, password })
  });
}

export function resetCodeRequest(email, code) {
    return httpClient("/auth/reset-code/", {
      method: "POST",
      body: JSON.stringify({ email, code })
    });
}

export function forgotPasswordRequest(email) {
    return httpClient("/auth/forgot-password/", {
      method: "POST",
      body: JSON.stringify({ email })
    });
}

export function activateAccountRequest(email, code) {
    return httpClient('/auth/activate-account/', {
      method: "POST",
      body: JSON.stringify({ email, code })
    });
}

export async function resetPasswordRequest(email, password) {
    return httpClient('/auth/reset-password/', {
        method: "POST",
        body: JSON.stringify({ email: email, new_password: password })
    });
}

