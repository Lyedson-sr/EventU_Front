import React, { useState } from "react";
// Importa NewGroupModal (o nome desejado)
import NewGroupModal from "../calendar/NewGroupModal.jsx"; 
import { FaPlus, FaChevronUp, FaChevronDown, FaTimes } from "react-icons/fa";

// Componente simples para renderizar cada grupo
const GroupItem = ({ group, onDelete, onEdit }) => (
    <div className="group-item" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '5px 10px', 
        borderRadius: '5px',
        margin: '5px 0',
        backgroundColor: '#fff', 
        border: '1px solid #eee' 
    }}>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {/* Indicador de cor */}
            <div style={{ width: '15px', height: '15px', borderRadius: '4px', background: group.color, marginRight: '10px' }}></div>
            {/* Nome do grupo - Clicar ou Clicar no texto abre para edição */}
            <span 
                style={{ color: '#333', cursor: 'pointer', fontWeight: 500 }}
                onClick={() => onEdit(group)} // Chama a função de edição ao clicar no nome
            >
                {group.name}
            </span>
        </div>
        
        {/* Botão de Excluir ('X') */}
        <button 
            onClick={() => onDelete(group.id)} 
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '0 5px', opacity: 0.8 }}
            aria-label={`Excluir grupo ${group.name}`}
        >
            <FaTimes size={12} />
        </button>
    </div>
);


export default function MyGroupsSection({ groups, onGroupCreated, onGroupEdited, onGroupDeleted }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(true);
    const [groupToEdit, setGroupToEdit] = useState(null); // Estado para o grupo a ser editado

    // Fecha o modal e limpa o estado de edição
    const closeModal = () => {
        setIsModalOpen(false);
        setGroupToEdit(null);
    };

    // Abre o modal para criação
    const openCreateModal = () => {
        setGroupToEdit(null); // Garante modo de Criação
        setIsModalOpen(true);
    };
    
    // Abre o modal para edição
    const openEditModal = (group) => {
        setGroupToEdit(group); // Define o grupo para preencher o formulário
        setIsModalOpen(true);
    };

    return (
        <div className="groups-container">
            {/* Seção Meus Grupos: e o botão de "+" */}
            <div className="my-groups-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', margin: 0 }}>Meus Grupos:</h2>
                <div className="groups-actions" style={{ display: 'flex', gap: '10px' }}>
                    {/* Botão de Adicionar (+) que abre o modal de criação */}
                    <button 
                        className="add-group-btn" 
                        onClick={openCreateModal} // Alterado para openCreateModal
                        aria-label="Criar Novo Grupo"
                        style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', padding: '5px' }}
                    >
                        <FaPlus size={18} />
                    </button>
                    {/* Botão de Expansão/Recolhimento */}
                    <button 
                        className="toggle-groups-btn" 
                        onClick={() => setIsListOpen(!isListOpen)}
                        aria-label={isListOpen ? "Recolher Grupos" : "Expandir Grupos"}
                        style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', padding: '5px' }}
                    >
                        {isListOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                    </button>
                </div>
            </div>

            {/* Lista de Grupos */}
            {isListOpen && (
                <div className="group-list" style={{ marginTop: '10px' }}>
                    {(groups && groups.length > 0) ? (
                        groups.map(group => (
                            <GroupItem 
                                key={group.id} 
                                group={group} 
                                onDelete={onGroupDeleted}
                                onEdit={openEditModal} // Passa a função para abrir o modal de edição
                            />
                        ))
                    ) : (
                        <p style={{ fontSize: '14px', color: '#666' }}>Nenhum grupo encontrado.</p>
                    )}
                </div>
            )}

            {/* Renderização Condicional do Modal de Grupo (Criação ou Edição) */}
            {isModalOpen && (
                <NewGroupModal // Usando o nome NewGroupModal
                    closeModal={closeModal} 
                    initialGroup={groupToEdit} // Passa o grupo (ou null para criação)
                    onGroupCreated={onGroupCreated}
                    onGroupEdited={onGroupEdited}
                />
            )}
        </div>
    );
}