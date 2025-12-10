import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../service/authService";

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

  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const register = async (e) => {
    e.preventDefault(); // É boa prática colocar no início

    // ... VALIDAÇÕES (Mantive igual) ...
    if (name === "" || email === "" || password === "" || confirmPassword === "" || userType === "") {
      Swal.fire({ icon: "error", title: "Existe campos faltantes!", text: "Preencha todos os campos!" });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email.match(emailRegex)) {
      Swal.fire({ icon: "error", title: "Email inválido!", text: "Por favor, insira um email válido!" });
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({ icon: "error", title: "Senha fraca!", text: "A senha deve ter no mínimo 8 caracteres, incluindo letras e números." });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: "error", title: "Senhas não conferem!", text: "As senhas digitadas não são iguais." });
      return;
    }

    if (termsAccepted === false) {
      Swal.fire({ icon: "error", title: "Termos não aceitos!", text: "Você deve aceitar os termos e condições para continuar!" });
      return;
    }

    
    setLoading(true); 

    try {
      const result = await registerUser(email, name, userType, password);

      if (result.ok) {
        navigate("/email-verification", {
          state: {
            verificationEmail: email,
            resetPassword: false
          }
        });
      } else {
        console.error('Erro ao registrar usuário:', result);
        Swal.fire({ icon: "error", title: "Erro!", text: "Falha ao registrar usuário." });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Swal.fire({ icon: "error", title: "Erro!", text: "Erro de conexão." });
    } finally {
      // O finally roda independente se deu certo ou errado
      setLoading(false); // <--- DESATIVA O LOADING
    }
  }

  return (
    <div className="register-box">
      <form>
        <h2>Cadastro</h2>

        {/* ... Inputs (Mantive igual) ... */}
        
        <label className="register-desc"> Preencha os campos abaixo para criar sua conta</label>
        <input value={name} className="input-register" type="text" placeholder="Nome completo" onChange={(e) => setName(e.target.value)} disabled={loading} />
        <input value={email} className="input-register" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} disabled={loading} />

        <div className="password-item">
          <input value={password} className="input-register" type={showPassword ? "text" : "password"} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          <span className="password-toggle-cadastro" onClick={togglePasswordVisibility}>
            <img src={showPassword ? EyeClosedIcon : EyeOpenIcon} alt="Toggle Password" className="eye-icon" />
          </span>
        </div>

        <div className="password-item">
          <input value={confirmPassword} className="input-register" type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar senha" onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} />
          <span className="password-toggle-cadastro" onClick={toggleConfirmPasswordVisibility}>
            <img src={showConfirmPassword ? EyeClosedIcon : EyeOpenIcon} alt="Toggle Confirm Password" className="eye-icon" />
          </span>
        </div>

        <div className="roles">
            {/* Adicionei disabled={loading} nos radios também para evitar mudança durante o envio */}
          <input className="radio" type="radio" name="tipoUsuario" value="student" id="aluno" onChange={(e) => setUserType(e.target.value)} disabled={loading} />
          <label htmlFor="aluno" className="type-user">Aluno</label>

          <input className="radio" type="radio" name="tipoUsuario" value="professor" id="professor" onChange={(e) => setUserType(e.target.value)} disabled={loading} />
          <label htmlFor="professor" className="type-user">Professor</label>
        </div>

        <div className="termos-container">
          <input type="checkbox" id="termos" name="termos" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} disabled={loading} />
          <label htmlFor="termos" className="termos-label">Aceito os termos e condições</label>
        </div>

        <div className="pair-buttons">
          <Link to="/login">
             {/* Desativa o botão cancelar se estiver carregando */}
            <button type="button" className="cancelar" disabled={loading}>Cancelar</button>
          </Link>
          
          {/* 3. BOTÃO COM FEEDBACK VISUAL */}
          {/* Removi a tag <a> envolta do button pois não é necessário e pode causar bugs */}
          <button 
            type="button" 
            className="proximo" 
            onClick={register}
            disabled={loading} 
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} 
          >
            {loading ? "Carregando..." : "Próximo"} 
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterBox;