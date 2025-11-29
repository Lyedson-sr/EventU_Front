import { 
    loginRequest, registerUserRequest, 
    resetCodeRequest, forgotPasswordRequest, 
    activateAccountRequest, resetPasswordRequest } from "../api/authApi";

export async function efetuarLogin(email, password, userType) {
  if (!userType) {
    return { ok: false, error: "Selecione um tipo de usuário!" };
  }

  try {
    const response = await loginRequest(email, password, userType);
    
    const responseData = await response.json();

    if (response.ok) {
        return {
            ok: true,
            data: responseData.data,       
            tokens: responseData.tokens,   
        };
    } else {
      return { ok: false, error: "Email ou senha incorretos." };
    }
  } catch (err) {
    console.error("Erro ao conectar com o servidor:", err);
    return { ok: false, error: "Erro ao conectar com o servidor." };
  }
}

export async function registerUser(email, name, role, password) {
    try {
        const response = await registerUserRequest(email, name, role, password);
    if (response.ok) {
        return { ok: true };
    } else {
        return { ok: false, error: "Erro ao registrar usuário." };
    } 
    }catch (err) {
        return { ok: false, error: "Erro ao conectar com o servidor." };
    }
}

export async function sendResetCode(email, code) {
    try {
        const response = await resetCodeRequest(email, code);
        console.log("Resposta: ");
        console.log(response);

        if (response.ok) {
            return { ok: true };
        } else {
            return { ok: false, error: "Código inválido." };
        }
    }catch (err) {
        return { ok: false, error: "Erro ao conectar com o servidor." };
    }
}

export async function forgotPassword(email) {
    try {
        const response = await forgotPasswordRequest(email);
        if (response.ok) {
            return { ok: true };
        } else {
            return { ok: false, error: "Erro ao processar solicitação." };
        }
    }catch (err) {
        return { ok: false, error: "Erro ao conectar com o servidor." };
    }
}

export async function activateAccount(email, code) {
    try {
        const response = await activateAccountRequest(email, code);
        if (response.ok) {
            return { ok: true };
        } else {
            return { ok: false, error: "Código inválido." };
        }
    }catch (err) {
        return { ok: false, error: "Erro ao conectar com o servidor." };
    }
}

export async function restarPassword(email, newPassword) {
    try {
        const response = await resetPasswordRequest(email, newPassword);
        if (response.ok) {
            return { ok: true };
        } else {
            return { ok: false, error: "Erro ao redefinir a senha." };
        }
    }catch (err) {
        return { ok: false, error: "Erro ao conectar com o servidor." };
    }
}