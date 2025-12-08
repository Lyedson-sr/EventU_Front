import React, { useState } from "react";
import "./UserPanel.css";
import avatar from "../assets/Avatar.svg";
import { FiSettings, FiBell, FiAlertCircle } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";



export default function UserPanel({ onClose }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  
  // Estado para controlar qual seção está expandida (null, 'settings' ou 'notifications')
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();


  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const logout = ()=>{
    localStorage.clear();
    navigate("/login")

  }
  return (
    <div className="user-panel-overlay" onClick={onClose}>
      <div
        className="user-panel-sidebar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-header">
          <div className="user-info">
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
          <div>
            <CiLogout className="icon logout" size={40} onClick={logout} />
          </div>
        </div>

        {/* --- SEÇÃO CONFIGURAÇÕES --- */}
        <div 
          className={`section ${activeSection === 'settings' ? 'active' : ''}`} 
          onClick={() => toggleSection('settings')}
        >
          <FiSettings className="icon" size={0} />
          <h2>Configurações</h2>
        </div>

        {activeSection === 'settings' && (
          <div className="section-content settings-content">
            <h3>Acessibilidade</h3>
            
            <div className="input-group">
              <label>Escolher tamanho da fonte</label>
              <select className="custom-select" defaultValue="Medio">
                <option value="Pequeno">Pequeno</option>
                <option value="Medio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            <div className="input-group">
              <label>Mudar tema</label>
              <select className="custom-select" defaultValue="Claro">
                <option value="Claro">Claro</option>
                <option value="Escuro">Escuro</option>
              </select>
            </div>

            <div className="settings-buttons">
              <button className="btn-outline">Restaurar Padrões</button>
              <button className="btn-primary">Salvar</button>
            </div>
          </div>
        )}

        {/* --- SEÇÃO NOTIFICAÇÕES --- */}
        <div 
          className={`section ${activeSection === 'notifications' ? 'active' : ''}`} 
          onClick={() => toggleSection('notifications')}
        >
          <FiBell className="icon" size={20} />
          <h2>Notificações</h2>
        </div>

        {activeSection === 'notifications' && (
          <div className="section-content notifications-list">
            
            {/* Item 1 */}
            <div className="notif-item">
              <p className="notif-text"><strong>Convite aceito</strong> para participar do grupo Gesad</p>
            </div>

            {/* Item 2 */}
            <div className="notif-item">
              <h4>Reunião Gesad</h4>
              <span className="notif-date">Terça - 01/11</span>
              <div className="notif-alert">
                 <div className="red-badge">2</div> 
                 <span>Faltas registradas</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="notif-item">
              <h4>Sistemas Operacionais</h4>
              <span className="notif-date">Terça - 23/10</span>
              <div className="notif-alert">
                 <div className="red-badge">1</div> 
                 <span>Faltas registradas</span>
              </div>
            </div>

            {/* Item 4 */}
            <div className="notif-item">
              <p className="notif-text"><strong>Você recebeu</strong> um convite para Reunião!</p>
            </div>

          </div>
        )}


      </div>
    </div>
  );
}