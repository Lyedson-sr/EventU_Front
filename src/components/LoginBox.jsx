import { Link } from "react-router-dom";

function LoginBox() {
  return (
    <div className="login-box">
      <h2>Login</h2>

      <p className="login-desc">
        Digite seu nome de usuário e senha<br />para fazer login
      </p>

      <input className="input" type="email" placeholder="Email" />
      <input className="input" type="password" placeholder="Senha" />

      <Link to="/forgot-password" className="forgot">
        Esqueceu sua senha?
      </Link>

      <div className="roles">
        <button className="role-btn">Aluno</button>
        <button className="role-btn">Professor</button>
        <button className="role-btn">Administrador</button>
      </div>

      <button className="enter-btn">Entrar</button>

  <p className="signup">
      Não tem uma conta?{" "}
        <Link to="/register">
          Cadastre-se
        </Link>
</p>
    </div>
  );
}

export default LoginBox;
