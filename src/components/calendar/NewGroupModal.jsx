import React, { useState, useEffect } from "react";
import { FaSearch, FaBold, FaItalic, FaUnderline, FaListUl, FaAlignLeft, FaAlignRight, FaAlignCenter } from "react-icons/fa";
import "./newGroup.css";
import { createGroup, deleteGroup } from "../../service/groupService";

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
        </div>
        {error && <p className="error-msg-n">{error}</p>}
    </div>
);

export default function NewGroupModal({ closeModal, initialGroup, onGroupCreated, onGroupEdited }) {
    const isEditing = !!initialGroup;
    const modalTitle = isEditing ? "Grupo" : "Novo Grupo";
    const submitButtonText = isEditing ? "Editar" : "Criar Grupo";

    const [groupName, setGroupName] = useState(initialGroup ? initialGroup.name : "");
    const initialMembersString = initialGroup && initialGroup.members ? initialGroup.members.join(", ") : "";
    const [convidados, setConvidados] = useState(initialMembersString);
    const [description, setDescription] = useState(initialGroup ? initialGroup.description : "");
    const [touched, setTouched] = useState({ groupName: false });

    const isGroupNameValid = groupName.trim() !== "";
    const showGroupNameError = touched.groupName && !isGroupNameValid;

    useEffect(() => {
        if (initialGroup && initialGroup.members) {
            const convidadosString = initialGroup.members
                .map(membro => membro.email) // Extraímos o e-mail de cada membro
                .join(", "); // Criamos uma string separada por vírgulas
            setConvidados(convidadosString); // Atualizamos o estado com a string dos e-mails
        }
    }, [initialGroup]);


    const handleSubmit = async () => {
        setTouched({ groupName: true });

        if (!isGroupNameValid) {
            console.log("Nome do grupo é obrigatório.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const convidadosList = convidados
            .split(",")
            .map((email) => email.trim())
            .filter((email) => emailRegex.test(email));

        const invalidEmails = convidados
            .split(",")
            .map((email) => email.trim())
            .filter((email) => !emailRegex.test(email));

        if (invalidEmails.length > 0) {
            console.log("E-mails inválidos: ", invalidEmails.join(", "));
            return;
        }

        const groupData = {
            name: groupName,
            description: description,
            members: convidadosList,
            ...(isEditing && { id: initialGroup.id, color: initialGroup.color }),
        };

        console.log(groupData);

        if (isEditing) {
            onGroupEdited(initialGroup.id, groupData);
        } else {
            const respone = await createGroup(groupData);
            if(respone.ok){
                window.location.reload();
            }
        }

        closeModal();
    }

    return (
        <div className="modal-overlay-group" onClick={closeModal}>
            <div className="modal-container-group" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn-group" onClick={closeModal} aria-label="Fechar modal">
                    ✕
                </button>

                <h2 className="modal-title-group">{modalTitle}</h2>

                <div className="modal-content-group">
                    <div className={`field-n large-n ${showGroupNameError ? 'field-error' : ''}`}>
                        <label htmlFor="group-name">Nome do Grupo</label>
                        <input
                            id="group-name"
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, groupName: true }))}
                            className={showGroupNameError ? 'input-error-n' : ''}
                        />
                        {showGroupNameError && <p className="error-msg-n">Nome do grupo é obrigatório.</p>}
                    </div>

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

                    <RichTextEditor
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição do grupo"
                    />
                </div>

                <div className="modal-footer-group">
                    <button className="cancel-btn-group" onClick={closeModal}>
                        Cancelar
                    </button>
                    <button
                        className={`create-btn-group ${isEditing ? 'edit-mode' : ''}`}
                        onClick={handleSubmit}
                    >
                        {submitButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
