import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="forgot-password-box">
        <h2>Esqueceu a senha? </h2>

        <p className="forgot-password-desc">
            Redefinir sua senha usando seu email cadastrado
        </p>

        <input className="input-forgot-password" type="email" placeholder="Email" />
        
        <div className="pair-buttons">
          <Link to="/login">
            <button type="button" className="cancelar">Cancelar</button>
          </Link>
          <Link to="/reset-password">
            <button type="button" className="proximo" >Proximo</button>
          </Link>
        </div>

    </div>
  );
}

export default ForgotPassword;
