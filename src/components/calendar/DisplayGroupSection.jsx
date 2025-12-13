import React, { useState, useEffect } from "react";
import { FaSearch, FaBold, FaItalic, FaUnderline, FaListUl, FaAlignLeft, FaAlignRight, FaAlignCenter } from "react-icons/fa";
import "./newGroup.css";
import { createGroup, deleteGroup, editGroup } from "../../service/groupService";
import Field from "./Field";
import Swal from "sweetalert2";

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

export default function DisplayGroupSection({ closeModal, initialGroup }) {
    const [isEditing, setIsEditing] = useState(false);


    const modalTitle = isEditing ? "Editar Grupo" : "Grupo";
    const submitButtonText = !isEditing ? "Editar" : "Salvar";

    const [groupName, setGroupName] = useState(initialGroup ? initialGroup.name : "");
    const initialMembersString = initialGroup && initialGroup.members ? initialGroup.members.join(", ") : "";
    const [convidados, setConvidados] = useState(initialMembersString);
    const [description, setDescription] = useState(initialGroup ? initialGroup.description : "");
    const [touched, setTouched] = useState({ groupName: false });


    const isGroupNameValid = groupName.trim() !== "";
    const showGroupNameError = touched.groupName && !isGroupNameValid;

    useEffect(() => {

        setIsEditing(!initialGroup)

        if (initialGroup && initialGroup.members) {
            const convidadosString = initialGroup.members
                .map(membro => membro.email) // Extraímos o e-mail de cada membro
                .join(", "); // Criamos uma string separada por vírgulas
            setConvidados(convidadosString); // Atualizamos o estado com a string dos e-mails
        }
    }, [initialGroup]);


    const handleSubmit = async () => {
        setTouched({ groupName: true });

        console.log(isEditing)
        if(!isEditing){
            setIsEditing(true)
            return
        }

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
            cor: initialGroup.color,
            id: initialGroup.id

        };
        console.log(initialGroup)

        const respone = await editGroup(groupData);
        if(respone.ok){
            window.location.reload();
        }
        
        if(respone.statusCode == 403){
            Swal.fire({
                icon: "error",
                title: "Sem permissão!",
                text: "Você não tem permissão para editar esse evento",
            });
            return
        }
        
        closeModal();
    }

    return (
        <div className="modal-overlay-group">
            <div className="modal-container-group">
                <button className="modal-close-btn-group" onClick={closeModal} aria-label="Fechar modal">✕</button>

                <h2 className="modal-title-group">{modalTitle}</h2>

                <div className="modal-content-group">
                    <Field
                        label="Nome do Grupo"
                        placeholder="Digite o nome do grupo"
                        value={groupName}
                        disabled={!isEditing}
                        onChange={(e) => setGroupName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, groupName: true }))}
                        error={showGroupNameError}
                        errorMsg="Nome do grupo é obrigatório."
                        large
                    />

                    <Field
                        label="Participantes"
                        placeholder="Emails separados por vírgula"
                        type="search"
                        value={convidados}
                        disabled={!isEditing}
                        onChange={(e) => setConvidados(e.target.value)}
                        icon={<FaSearch />}
                        large
                    />

                    <Field
                        label="Descrição"
                        type="textarea"
                        placeholder="Descrição do grupo"
                        value={description}
                        disabled={!isEditing}
                        onChange={(e) => setDescription(e.target.value)}
                        large
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
