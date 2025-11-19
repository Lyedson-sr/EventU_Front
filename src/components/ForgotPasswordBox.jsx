import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="forgot-password-box">
        <h2>Esqueceu a senha? </h2>

        <p className="forgot-password-desc">
            Redefinir sua senha usando seu email cadastrado
        </p>

        <input className="input" type="email" placeholder="Email" />
        
        <div className="buttons">
          <div className="pair-buttons">
            <Link to="/login">
              <button className="cancelar">Cancelar</button>
            </Link>
            <button className="reset">Enviar</button>
          </div>
        </div>

    </div>
  );
}

export default ForgotPassword;
