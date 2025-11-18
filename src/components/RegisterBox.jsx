import React from "react";

function RegisterBox() {
  return (
    <div className="register-box">
      <h2>Cadastro</h2>

      <p className="register-desc">
        Preencha os campos abaixo para criar sua conta
      </p>

      <input className="input" type="text" placeholder="Nome completo" />
      <input className="input" type="email" placeholder="Email" />
      <input className="input" type="password" placeholder="Senha" />
      <input className="input" type="password" placeholder="Confirmar senha" />
      <div className="roles">
        <button className="role-btn">Aluno</button>
        <button className="role-btn">Professor</button>
      </div>

      <button className="register-btn">Cadastrar</button>

      <p className="login-link">
        Já possui uma conta? <a href="/login">Entrar</a>
      </p>
    </div>
  );
}

export default RegisterBox;
