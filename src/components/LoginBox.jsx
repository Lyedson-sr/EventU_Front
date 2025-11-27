import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userType, setUserType] = useState("");


  const efetuarLogin = async () => {

    if(userType === ""){
      Swal.fire({
        icon: "error",
        title: "Selecione um tipo de usuário!",
        text: "Por favor, selecione um tipo de usuário para continuar.",
      });
      return;
    }
    
    const response = await fetch("http://localhost:8000/api/v1/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password, role: userType })
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
        <input className="radio" type="radio" name="tipoUsuario" value="student" id="aluno" onChange={(e) => setUserType(e.target.value)} />
        <label htmlFor="aluno" className="type-user">Aluno</label>

        <input className="radio" type="radio" name="tipoUsuario" value="professor" id="professor" onChange={(e) => setUserType(e.target.value)} />
        <label htmlFor="professor" className="type-user">Professor</label>

        <input className="radio" type="radio" name="tipoUsuario" value="admin" id="admin" onChange={(e) => setUserType(e.target.value)}/>
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
