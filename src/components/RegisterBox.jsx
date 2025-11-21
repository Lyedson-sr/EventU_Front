import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import EyeOpenIcon from "../assets/show.png";
import EyeClosedIcon from "../assets/hide.png";

function RegisterBox() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // NOVOS ESTADOS para controlar a visibilidade das senhas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // FUNÇÕES para alternar a visibilidade
  const togglePasswordVisibility = () => {
    console.log("Toggling password visibility");
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    console.log("Toggling password visibility2");
    setShowConfirmPassword(prev => !prev);
  };

  function register() {
      // 1. **VERIFICAÇÃO DE CAMPOS VAZIOS (PRIORIDADE)**
      if (name === "" || email === "" || password === "" || confirmPassword === "" || userType === "") {
        Swal.fire({
          icon: "error",
          title: "Existe campos faltantes!",
          text: "Preencha todos os campos!",
        });
        return; 
      }

      // 2. **VERIFICAÇÃO DO EMAIL**
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!email.match(emailRegex)) {
        Swal.fire({
          icon: "error",
          title: "Email inválido!",
          text: "Por favor, insira um email válido!",
        });
        return; 
      }

      // 3. **VERIFICAÇÃO DE COMPLEXIDADE DA SENHA**
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; 
      if(!passwordRegex.test(password)){
        Swal.fire({
          icon: "error",
          title: "Senha fraca!",
          text: "A senha deve ter no mínimo 8 caracteres, incluindo letras e números.",
        });
        return; 
      }
      
      // 4. **VERIFICAÇÃO DE SENHAS CORRESPONDENTES**
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Senhas não conferem!",
          text: "As senhas digitadas não são iguais.",
        });
        return; 
      }

      // 5. **VERIFICAÇÃO DE TERMOS**
      if (termsAccepted === false) {
        Swal.fire({
          icon: "error",
          title: "Termos não aceitos!",
          text: "Você deve aceitar os termos e condições para continuar!",
        });
        return; 
      }

      // 6. **SE TUDO ESTIVER OK, PROSSEGUE COM O CADASTRO**
      Swal.fire({
        icon: "success",
        title: "Dados Válidos!",
        text: "Pronto para enviar o cadastro para o backend.",
      });
  }
  return (
    <div className="register-box">
      <form>
        <h2>Cadastro</h2>

        <label className="register-desc"> Preencha os campos abaixo para criar sua conta</label>

        <input value={name} className="input-register" type="text" placeholder="Nome completo" onChange={(e) => setName(e.target.value)} />
        <input value={email} className="input-register" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <div className="password-item">
          <input value={password} className="input-register" type={showPassword ? "text" : "password"} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
              <img 
              src={showPassword ? EyeClosedIcon : EyeOpenIcon} 
              alt="Toggle Confirm Password Visibility"
              className="eye-icon"
            />
          </span>
        </div>

        <div className="password-item">
          <input value={confirmPassword} className="input-register" type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar senha" onChange={(e) => setConfirmPassword(e.target.value)} />
          <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
            <img 
              src={showConfirmPassword ? EyeClosedIcon : EyeOpenIcon} 
              alt="Toggle Confirm Password Visibility"
              className="eye-icon"
            />
          </span>
        </div>
        
        <div className="roles">
          <input className="radio" type="radio" name="tipoUsuario" value="aluno" id="aluno" onChange={(e) => setUserType(e.target.value)} />
          <label htmlFor="aluno" className="type-user">Aluno</label>

          <input className="radio" type="radio" name="tipoUsuario" value="professor" id="professor" onChange={(e) => setUserType(e.target.value)} />
          <label htmlFor="professor" className="type-user">Professor</label>
        </div>

        <div className="termos-container">
          <input type="checkbox" id="termos" name="termos" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
          <label htmlFor="termos" className="termos-label">Aceito os termos e condições</label>
        </div>

        <div className="pair-buttons">
          <Link to="/login">
            <button type="button" className="cancelar">Cancelar</button>
          </Link>
          <Link>
            <button type="button" className="proximo" onClick={register}>Proximo</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterBox;
