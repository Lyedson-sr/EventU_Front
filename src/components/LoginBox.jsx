import { Link } from "react-router-dom";

function LoginBox() {
  return (
    <div className="login-box">
      <h2>Login</h2>

      <p className="login-desc">
        Digite seu nome de usuário e senha<br />para fazer login
      </p>

      <input className="input-login" type="email" placeholder="Email" />
      <input className="input-login" type="password" placeholder="Senha" />

      <Link to="/forgot-password" className="forgot">
        Esqueceu sua senha?
      </Link>

      <div className="roles">
        <input className="radio" type="radio" name="tipoUsuario" value="aluno" id="aluno"/>
        <label htmlFor="aluno" className="type-user">Aluno</label>

        <input className="radio" type="radio" name="tipoUsuario" value="professor" id="professor"/>
        <label htmlFor="professor" className="type-user">Professor</label>

        <input className="radio" type="radio" name="tipoUsuario" value="admin" id="admin" />
        <label htmlFor="admin" className="type-user">Admin</label>
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
