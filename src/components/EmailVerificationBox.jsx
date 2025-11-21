import {useState } from "react";
import { useLocation } from "react-router-dom";

function EmailVeridicationBox() {
    const location = useLocation();
    const email = location.state?.verificationEmail;

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

  return (
    <div className="email-verification-box">
      <h2>Insira o código de verificação</h2>
      <p className="reset-password-desc">Digite o código de 4 números enviado ao email: {email}</p>

      <form className="otp-container">
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

        <button className="enter-btn">Confirmar Email</button>

      </form>
    </div>
  );
}

export default EmailVeridicationBox;
