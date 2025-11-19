import { Link } from "react-router-dom";

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
        Já possui uma conta?{" "}
        <Link to="/login">
          Entrar
        </Link>
      </p>

    <dir className="buttons">
      <div className="pair-buttons">
        <Link to="/login">
          <button type="button" className="cancelar">Cancelar</button>
        </Link>
        <Link>
          <button type="button" className="proximo">Proximo</button>
        </Link>
        </div>
       </dir>
    </div>
  );
}

export default RegisterBox;
