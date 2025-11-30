import "./UserPanel.css";
import avatar from "../assets/Avatar.svg";
import { FiSettings, FiBell, FiAlertCircle } from "react-icons/fi";

export default function UserPanel({ onClose }) {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="user-panel-overlay" onClick={onClose}>
      <div
        className="user-panel-sidebar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-header">
          <img src={avatar} alt="Avatar" className="avatar-img" />
          <div>
            <h3>{user.name || "Usuário"}</h3>
            <p>
              {user.role === "student"
                ? "Aluno"
                : user.role === "teacher"
                ? "Professor"
                : user.role || "Cargo indefinido"}
            </p>
          </div>
        </div>

        <div className="section">
          <FiSettings className="icon" size={20} />
          <h2>Configurações</h2>
        </div>

        <div className="section">
          <FiBell className="icon" size={20} />
          <h2>Notificações</h2>
        </div>

        <div className="section">
          <FiAlertCircle className="icon alert-icon" size={20} />
          <h2>Alertas</h2>
        </div>

        <div className="notifications">
          <p className="highlight">Você recebeu um convite para Reunião!</p>
        </div>
      </div>
    </div>
  );
}
