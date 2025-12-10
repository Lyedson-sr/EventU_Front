import React, { useState, useEffect } from "react";
import { FaSearch, FaBold, FaItalic, FaUnderline, FaListUl, FaAlignLeft, FaAlignRight, FaAlignCenter } from "react-icons/fa";
import "./newGroup.css";

// --- SIMULAÇÃO: Componente RichTextEditor Simples com Toolbar ---
const RichTextEditor = ({ value, onChange, placeholder, error }) => (
    <div className={`field-n field-textarea large-n ${error ? 'field-error' : ''}`}>
        <label>Descrição</label>
        <div className="rich-text-editor-simulated">
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={4}
                style={{ resize: 'vertical' }}
                className={error ? 'input-error-n' : ''}
            />
            <div className="editor-toolbar">
                <button type="button" aria-label="Negrito"><FaBold /></button>
                <button type="button" aria-label="Itálico"><FaItalic /></button>
                <button type="button" aria-label="Sublinhado"><FaUnderline /></button>
                <button type="button" aria-label="Lista não ordenada"><FaListUl /></button>
                <button type="button" aria-label="Alinhar à esquerda"><FaAlignLeft /></button>
                <button type="button" aria-label="Alinhar ao centro"><FaAlignCenter /></button>
                <button type="button" aria-label="Alinhar à direita"><FaAlignRight /></button>
            </div>
        </div>
        {error && <p className="error-msg-n">{error}</p>}
    </div>
);

// Recebe initialGroup (se for edição) e os handlers de ação
export default function NewGroupModal({ closeModal, initialGroup, onGroupCreated, onGroupEdited }) {
    
    // Define se o modal está em modo de edição
    const isEditing = !!initialGroup;
    const modalTitle = isEditing ? "Grupo" : "Novo Grupo";
    const submitButtonText = isEditing ? "Editar" : "Criar Grupo";

    // --- ESTADOS PARA OS CAMPOS DE GRUPO ---
    const [groupName, setGroupName] = useState(initialGroup ? initialGroup.name : "");
    // Assumimos que a lista de membros está em uma string separada por vírgula para edição
    const initialMembersString = initialGroup && initialGroup.members ? initialGroup.members.join(", ") : "";
    const [convidados, setConvidados] = useState(initialMembersString);
    const [description, setDescription] = useState(initialGroup ? initialGroup.description : "");

    // Validação
    const [touched, setTouched] = useState({ groupName: false });
    const isGroupNameValid = groupName.trim() !== "";
    const showGroupNameError = touched.groupName && !isGroupNameValid;

    // Handler para submissão (Criação ou Edição)
    function handleSubmit(){
        setTouched({ groupName: true });

        if (!isGroupNameValid) {
            console.log("Nome do grupo é obrigatório.");
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const convidadosList = convidados 
            .split(",") 
            .map(email => email.trim()) 
            .filter(email => emailRegex.test(email)); 

        const groupData = { 
            name: groupName, 
            description: description, 
            members: convidadosList,
            // Mantém o ID e a cor se estiver editando
            ...(isEditing && { id: initialGroup.id, color: initialGroup.color }) 
        };

        if (isEditing) {
            // Chama a função de edição (PATCH na API)
            onGroupEdited(initialGroup.id, groupData);
        } else {
            // Chama a função de criação (POST na API)
            onGroupCreated(groupData);
        }
        
        closeModal();
    }

    return (
        <div className="modal-overlay-group" onClick={closeModal}>
            <div className="modal-container-group" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn-group" onClick={closeModal}>✕</button>
                
                <h2 className="modal-title-group">{modalTitle}</h2>
                
                <div className="modal-content-group">
                    
                    {/* 1. Nome do Grupo */}
                    <div className={`field-n large-n ${showGroupNameError ? 'field-error' : ''}`}>
                        <label>Nome do Grupo</label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, groupName: true }))}
                            className={showGroupNameError ? 'input-error-n' : ''}
                        />
                        {showGroupNameError && (
                            <p className="error-msg-n">Nome do grupo é obrigatório.</p>
                        )}
                    </div>
                    
                    {/* 2. Participantes / Convidados */}
                    <div className="field-n large-n field-with-icon">
                        <label>Participantes</label>
                        <div className="input-icon-wrapper">
                            <input
                                type="search"
                                value={convidados}
                                onChange={(e) => setConvidados(e.target.value)}
                                placeholder="Emails separados por vírgula"
                            />
                            <FaSearch className="input-icon-right" />
                        </div>
                    </div>
                    
                    {/* 3. Descrição (Rich text editor) */}
                    <RichTextEditor
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Rich text editor."
                    />
                </div>

                {/* Rodapé com botões */}
                <div className="modal-footer-group">
                    <button className="cancel-btn-group" onClick={closeModal}>
                        Cancelar
                    </button>
                    <button className={`create-btn-group ${isEditing ? 'edit-mode' : ''}`} onClick={handleSubmit}>
                        {submitButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}