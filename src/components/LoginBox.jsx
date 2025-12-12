import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EyeOpenIcon from "../assets/show.png";
import EyeClosedIcon from "../assets/hide.png";
import { efetuarLogin } from "../service/authService";
import { useAuth } from "../context/AuthContext";


function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userType, setUserType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();


  const { auth, setAuth } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };


  const handleLogin = async () => {

    if(userType === ""){
      Swal.fire({
        icon: "error",
        title: "Selecione um tipo de usuário!",
        text: "Por favor, selecione um tipo de usuário para continuar.",
      });
    }
    setLoading(true)
    const result = await efetuarLogin(email, password, userType);
    setLoading(false)
    if (result.ok) {

      const { data, tokens } = result;

      Swal.fire({
        icon: "success",
        title: "Login realizado com sucesso! - Em breve você será redirecionado.",
      });

      setAuth({
        access: tokens.access,
        user: data,
      });

      navigate("/main")    
    }else{
      Swal.fire({
        icon: "error",
        title: "Erro no login!",
        text: "Email ou senha incorretos. Por favor, tente novamente.",
      });
    }
  }  

  useEffect(() => {
    console.log("Auth mudou:", auth);
  }, [auth]);

  return (
    <div className="login-box">
      <h2>Login</h2>

      <p className="login-desc">
        Digite seu nome de usuário e senha<br />para fazer login
      </p>

      <form>
        <input value={email} className="input-login" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <div className="password-item">
          <input value={password} className="input-register" type={showPassword ? "text" : "password"} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
          <span className="password-toggle-cadastro" onClick={togglePasswordVisibility}>
            <img src={showPassword ? EyeClosedIcon : EyeOpenIcon} alt="Toggle Confirm Password Visibility" className="eye-icon" />
            </span>
          </div>
        <Link to="/forgot-password" className="forgot">
          Esqueceu sua senha?
        </Link>

        <div className="roles">
          <input className="radio" type="radio" name="tipoUsuario" value="student" id="aluno" onChange={(e) => setUserType(e.target.value)} checked={userType === "student"} />
          <label htmlFor="aluno" className="type-user">Aluno</label>

          <input className="radio" type="radio" name="tipoUsuario" value="professor" id="professor" onChange={(e) => setUserType(e.target.value)} checked={userType === "professor"} />
          <label htmlFor="professor" className="type-user">Professor</label>

          <input className="radio" type="radio" name="tipoUsuario" value="admin" id="admin" onChange={(e) => setUserType(e.target.value)} checked={userType === "admin"} />
          <label htmlFor="admin" className="type-user">Admin</label>
        </div>

        <Link to="">
          <button 
            className="enter-btn" 
            onClick={handleLogin} 
            disabled={loading} 
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
                <input type="submit" /> Entrar
          </button>
        </Link>
      </form>
    

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
