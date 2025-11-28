import {useState } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import {sendResetCode} from "../service/authService";
import { activateAccount } from "../service/authService";

function EmailVeridicationBox() {
    const location = useLocation();

    const email = location.state?.verificationEmail;
    const resetPassword = location.state?.resetPassword;

    const navigate = useNavigate();

    const [code, setCode] = useState(new Array(4).fill(""));

    const handleChange = (value, index) => {
      if (!/^\d*$/.test(value)) return;

      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    };

    const verificarCodigo = async () => {
      
      if(resetPassword){
        const result = await sendResetCode(email, code.join(""));
        console.log("Resultado: ");
        console.log(result);

        if (result.ok) {
          navigate("/reset-password", {
            state: { verificationEmail: email}
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "Código inválido!",
            text: "O código de verificação inserido é inválido. Por favor, tente novamente.",
          });
        }

      }else{

        const result = await activateAccount(email, code.join(""));

        if (result.ok){
          Swal.fire({
            icon: "success",
            title: "Registro realizado com sucesso!",
            text: "Voce sera redirencionado para a pagina de login em 5 segundos...",
            footer: 'Clique <a href="/login">aqui</a> se nao for redirecionado automaticamente.',
            showConfirmButton: false,
            timer: 5000
          });
          navigate("/login");
        }
      
    }
  }

  return (
    <div className="email-verification-box">
      <h2>Insira o código de verificação</h2>
      <p className="reset-password-desc">Digite o código de 4 números enviado ao email: {email}</p>

      <div className="gourp-otp-inputs">
          {code.map((num, index) => (
          <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={num}
              onChange={(e) => handleChange(e.target.value, index)}
              className="otp-input"
          />
          ))}
      </div>

      <button className="enter-btn" onClick={verificarCodigo}>Confirmar Email</button>
    </div>
  );
}

export default EmailVeridicationBox;
