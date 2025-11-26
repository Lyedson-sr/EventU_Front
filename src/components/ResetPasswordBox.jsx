import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import EyeOpenIcon from "../assets/show.png";
import EyeClosedIcon from "../assets/hide.png";
import { Link, useNavigate } from "react-router-dom";

function ResetPasswordBox(){
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //const email = location.state?.verificationEmail;
    const email = "kayquemts@gmail.com";
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [startRedirect, setStartRedirect] = useState(false); // <--- novo estado
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const verificarSenhas = async () => {
        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Senhas não conferem!",
                text: "As senhas digitadas não são iguais.",
            });
            return; 
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; 
        if(!passwordRegex.test(password)){
            Swal.fire({
                icon: "error",
                title: "Senha fraca!",
                text: "A senha deve ter no mínimo 8 caracteres, incluindo letras e números.",
            });
            return; 
        }

        const response = await fetch("http://localhost:8000/api/v1/auth/forgot-password/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, new_password: password })
        });

        if (response.ok) {
            setStartRedirect(true);
            Swal.fire({
                icon: "success",
                title: "Redefinição de senha realizado com sucesso!",
                text: "Voce sera redirencionado para a pagina de login em 5 segundos...",
                footer: 'Clique <a href="/login">aqui</a> se nao for redirecionado automaticamente.',
                showConfirmButton: false,
                timer: 5000
            });
        }else{
            console.log("Erro ao redefinir a senha");
            console.log(await response.text());
            Swal.fire({
                icon: "error",
                title: "Erro ao redefinir a senha!",
                text: "Por favor, tente novamente mais tarde.",
            });
        }
        

    }
    useEffect(() => {
        if (!startRedirect) return;

        const timer = setTimeout(() => {
            navigate("/login");
        }, 5000);

        return () => clearTimeout(timer);
    }, [startRedirect, navigate]);

    return(
        <div className="reset-password-box"> 
            <h2>Insira a nova senha</h2>
            <p className="reset-password-desc"> 
                Sua nova senha deve ter no mínimo 8 caracteres
                incluindo letras e números.
            </p>
            <form>
                <div className="password-item">
                    <input value={password} className="input-reset-passwor" type={showPassword ? "text" : "password"} placeholder="Nova senha" onChange={(e) => setPassword(e.target.value)} />
                    <span className="password-toggle" onClick={togglePasswordVisibility}>
                        <img 
                        src={showPassword ? EyeClosedIcon : EyeOpenIcon} 
                        alt="Toggle Confirm Password Visibility"
                        className="eye-icon"
                        />
                    </span>
                </div>

                <div className="password-item">
                    <input value={confirmPassword} className="input-reset-passwor" type={showConfirmPassword ? "text" : "password"} placeholder="Confirme sua nova senha" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                        <img 
                        src={showConfirmPassword ? EyeClosedIcon : EyeOpenIcon} 
                        alt="Toggle Confirm Password Visibility"
                        className="eye-icon"
                        />
                    </span>
                </div>

                <div className="pair-buttons">
                    <Link to="/login">
                        <button type="button" className="cancelar">Cancelar</button>
                    </Link>
                
                    <Link>  
                        <button type="button" className="proximo" onClick={verificarSenhas}>
                            <input type="submit"/> Proximo
                        </button>
                    </Link>
                </div>
            </form>

            
        </div>
    );
}

export default ResetPasswordBox;