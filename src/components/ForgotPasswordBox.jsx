import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ResetPassword from "../pages/login/ResetPassword";
import { forgotPassword } from "../service/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

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
    setLoading(true)
    const response = await forgotPassword(email);
    setLoading(false)

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
            <button 
              onClick={emailVeridication} 
              type="button" 
              className="proximo"
              disabled={loading} 
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} >Proximo</button>
          </a>
        </div>
    </div>
  );
}

export default ForgotPassword;
