import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ResetPassword from "../pages/login/ResetPassword";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const emailVeridication = async () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email.match(emailRegex)) {
      Swal.fire({
        icon: "error",
        title: "Email inválido!",
        text: "Por favor, insira um email válido!",
      });
      return; 
    }
    console.log("Email para verificação:", email);

    const response = await fetch("http://localhost:8000/api/v1/auth/forgot-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
    });

    if (response.ok) {
      navigate("/email-verification", {
        state: { 
          verificationEmail: email,
          resetPassword: true}
      });
    }
  }

  return (
    <div className="forgot-password-box">
        <h2>Esqueceu a senha? </h2>

        <p className="forgot-password-desc">
            Redefinir sua senha usando seu email cadastrado
        </p>

        <input value={email} onChange={(e) => setEmail(e.target.value)}  className="input-forgot-password" type="email" placeholder="Email" />
        
        <div className="pair-buttons">
          <Link to="/login">
            <button type="button" className="cancelar">Cancelar</button>
          </Link>
          <a>
            <button onClick={emailVeridication} type="button" className="proximo" >Proximo</button>
          </a>
        </div>
    </div>
  );
}

export default ForgotPassword;
