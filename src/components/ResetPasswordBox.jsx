// ResetPasswordBox.jsx
import { Link } from "react-router-dom";
// ...

function ResetPasswordBox(){
    return(
        <div className="reset-password-box"> 
            <h2>Insira a nova senha</h2>
            <p className="reset-password-desc"> 
                Sua nova senha deve ter no mínimo 8 caracteres
                incluindo letras e números.
            </p>

            <input className="input-login" type="password" placeholder="Nova senha" />        
            <input className="input-login" type="password" placeholder="Confirme sua nova senha" />        

            <div className="pair-buttons">
                <Link to="/forgot-password">
                    <button type="button" className="cancelar">Cancelar</button>
                </Link>
              
                <Link to="/login"> 
                    <button type="button" className="proximo" >Enviar</button>
                </Link>
            </div>
        </div>
    );
}

export default ResetPasswordBox;