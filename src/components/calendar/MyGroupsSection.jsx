import React, { useState } from "react";
import NewGroupModal from "../calendar/NewGroupModal.jsx"; // Ajuste o caminho conforme sua estrutura
import { FaPlus, FaChevronUp, FaChevronDown } from "react-icons/fa";

// Opcional: Componente simples para renderizar cada grupo
const GroupItem = ({ group }) => (
    <div className="group-item" style={{ padding: '8px 0', color: '#000000ff' }}>
        {group.name}
    </div>
);


export default function MyGroupsSection({ groups }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(true);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    return (
        <div className="groups-container">
            {/* Seção Meus Grupos: e o botão de "+" */}
            <div className="my-groups-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', margin: 0 }}>Meus Grupos:</h2>
                <div className="groups-actions" style={{ display: 'flex', gap: '10px' }}>
                    {/* Botão de Adicionar (+) que abre o modal */}
                    <button 
                        className="add-group-btn" 
                        onClick={openModal}
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
                        groups.map(group => <GroupItem key={group.id} group={group} />)
                    ) : (
                        <p style={{ fontSize: '14px', color: '#666' }}>Nenhum grupo encontrado.</p>
                    )}
                </div>
            )}

            {/* Renderização Condicional do Modal de Grupo */}
            {isModalOpen && <NewGroupModal closeModal={closeModal} />}
        </div>
    );
}