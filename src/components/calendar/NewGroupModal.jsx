import React, { useState } from "react";
// Importe o componente Field se você o estiver usando em outros lugares.
// Aqui, vamos usar tags nativas para ser autocontido.
// import Field from "./Field"; 
import { FaSearch } from "react-icons/fa"; 
import "./newGroup.css"; // Você deve criar este arquivo CSS

// --- SIMULAÇÃO: Componente RichTextEditor Simples para a Descrição ---
// Mantido aqui, pois é parte integrante do formulário de grupo
const RichTextEditor = ({ value, onChange, placeholder, error }) => (
    <div className="field-n field-textarea large-n"> 
        <label style={{ display: 'block', marginBottom: '5px' }}>Descrição</label>
        <div className="rich-text-editor-simulated">
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={4}
                style={{ width: '100%', resize: 'vertical', border: error ? '1px solid red' : '1px solid #ccc' }}
            />
        </div>
    </div>
);


export default function NewGroupModal({ closeModal }) {
  
  // --- ESTADOS PARA OS CAMPOS DE GRUPO ---
  const [groupName, setGroupName] = useState("");
  const [convidados, setConvidados] = useState("");
  const [description, setDescription] = useState("");

  // Validação
  const [touched, setTouched] = useState({ groupName: false });
  const isGroupNameValid = groupName.trim() !== "";
  const showGroupNameError = touched.groupName && !isGroupNameValid;

  // Handler para a criação do grupo
  function handleCreateGroup(){
    setTouched({ groupName: true });

    if (isGroupNameValid) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const convidadosList = convidados 
        .split(",") 
        .map(email => email.trim()) 
        .filter(email => emailRegex.test(email)); 

      // ** Substitua este console.log pela sua função createGroup() **
      console.log("Chamando createGroup com:", { name: groupName, description: description, members: convidadosList });

      // Resetar campos e fechar
      setGroupName("");
      setConvidados("");
      setDescription("");
      setTouched({ groupName: false });
      closeModal();
    } else {
      console.log("Nome do grupo é obrigatório.");
    }
  }

  return (
    // Utilize as classes definidas no seu CSS (newGroup.css)
     
    <div className="modal-overlay-group" onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div className="modal-container-group" onClick={(e) => e.stopPropagation()} style={{ background: '#f8f0fc', padding: '40px', borderRadius: '8px', width: '90%', maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <button className="modal-close-btn-n" onClick={closeModal}>✕</button>
        <h2 className="modal-title-group" style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Novo Grupo</h2>
        
        <div className="modal-content-group" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            {/* 1. Nome do Grupo */}
            <div className={`field-n ${showGroupNameError ? 'field-error' : ''}`}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Nome do Grupo</label>
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, groupName: true }))}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: `1px solid ${showGroupNameError ? 'red' : '#ccc'}` }}
                />
                {showGroupNameError && (
                    <p className="error-msg" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        Nome do grupo é obrigatório.
                    </p>
                )}
            </div>
            
            {/* 2. Convidados */}
            <div className="field-n field-with-icon">
                <label style={{ display: 'block', marginBottom: '5px' }}>Convidados</label>
                <div className="input-icon-wrapper" style={{ position: 'relative' }}>
                    <input
                        type="search"
                        value={convidados}
                        onChange={(e) => setConvidados(e.target.value)}
                        placeholder=""
                        style={{ width: '100%', padding: '10px', paddingRight: '35px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <FaSearch className="input-icon-right" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                </div>
            </div>
            
            {/* 3. Descrição (Rich text editor) */}
            <RichTextEditor
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do grupo."
            />
        </div>

        {/* Rodapé com botões */}
        <div className="modal-footer-group" style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
          <button className="cancel-btn-group" onClick={closeModal} style={{ padding: '10px 20px', border: '1px solid #ccc', background: '#fff', color: '#333', borderRadius: '6px', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button className="create-btn-group" onClick={handleCreateGroup} style={{ padding: '10px 20px', border: 'none', background: '#4a5568', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Criar Grupo
          </button>
        </div>
      </div>
    </div>
  );
}