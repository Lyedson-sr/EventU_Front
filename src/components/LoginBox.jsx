import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const efetuarLogin = async () => {
    
    const response = await fetch("http://localhost:8000/api/v1/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Login realizado com sucesso! - Em breve você será redirecionado.",
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Erro no login!",
        text: "Email ou senha incorretos. Por favor, tente novamente.",
      });
    }
  }  

  return (
    <div className="login-box">
      <h2>Login</h2>

      <p className="login-desc">
        Digite seu nome de usuário e senha<br />para fazer login
      </p>

      <input value={email} className="input-login" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input value={password} className="input-login" type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>

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

      <Link to="">
        <button className="enter-btn" onClick={efetuarLogin}>Entrar</button>
      </Link>
      

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
