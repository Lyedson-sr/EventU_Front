import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "../../assets/EventU-logo.png";
import MiniCalendar from "../../components/calendar/MiniCalendar.jsx";
import "./home.css";
import CalendarEventU from "../../components/calendar/CalendarEventU.jsx";
import NewEventU from "../../components/calendar/NewEventU.jsx";
import UserPanel from "../../components/UserPanel.jsx";
import avatar from "../../assets/Avatar.svg";
import { useState, useEffect } from "react";
import { getAllEvents } from "../../service/eventService.js";
import MyGroupsSection from "../../components/calendar/MyGroupsSection.jsx";


function Home() {

    const { auth, setAuth } = useAuth();
    const [openPanel, setOpenPanel] = useState(false);

    const [eventos, setEventos] = useState([]);
    const [grupos, setGrupos] = useState([]); // Estado central para os grupos

    useEffect(() => {
        loadEvents();
        loadGroups(); 
    }, []);

    async function loadEvents() {
        try {
            const resp = await getAllEvents();
            setEventos(resp.results || []);
        } catch (error) {
            console.error("Erro ao carregar eventos:", error);
            setEventos([]); 
        }
    }

    // LISTAR GRUPOS (GET /api/v1/groups/)
    async function loadGroups() {
        try {
            // DADOS SIMULADOS INICIAIS, adaptados para o formato que suporta cor e membros
            setGrupos([
                { id: 1, name: "Grupo de Trabalho A", color: '#00D1B2', description: "Trabalhos e estudos.", members: ["a@mail.com"] },
                { id: 2, name: "Fim de Semana Futebol", color: '#EE1515', description: "Jogos de sábado.", members: ["b@mail.com", "c@mail.com"] },
                { id: 3, name: "Reunião Diretoria", color: '#4A90E2', description: "Reuniões administrativas.", members: ["d@mail.com"] },
            ]);
        } catch (error) {
            console.error("Erro ao carregar grupos (simulação falhou):", error);
            setGrupos([]);
        }
    }

    // 1. ➕ CRIAR GRUPO (POST /api/v1/groups/)
    async function handleAddGroup(newGroupData) {
        try {
            // ** CHAMADA REAL À API: Ex: const response = await createGroup(newGroupData); **
            
            // SIMULAÇÃO: Gera ID e cor
            const newId = grupos.length > 0 ? Math.max(...grupos.map(g => g.id)) + 1 : 1;
            const corAleatoria = ['#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 3)];
            
            const novoGrupoFinal = {
                id: newId, 
                color: corAleatoria, 
                ...newGroupData
            };

            setGrupos(prevGrupos => [...prevGrupos, novoGrupoFinal]);
            console.log("Grupo Criado:", novoGrupoFinal);
            
        } catch (error) {
            console.error("Erro ao criar grupo:", error);
        }
    }
    
    // 2. ✏️ EDITAR GRUPO (PATCH /api/v1/groups/{id})
    async function handleEditGroup(groupId, updatedData) {
        try {
            // ** CHAMADA REAL À API: Ex: await updateGroup(groupId, updatedData); **
            
            // Atualiza o estado: Mapeia e substitui o grupo
            setGrupos(prevGrupos => prevGrupos.map(group => 
                group.id === groupId 
                    ? { ...group, ...updatedData } 
                    : group
            ));
            console.log(`Grupo ID ${groupId} editado com sucesso.`, updatedData);
            
        } catch (error) {
            console.error("Erro ao editar grupo:", error);
        }
    }


    // 3. ❌ EXCLUIR GRUPO (DELETE /api/v1/groups/{id})
    async function handleDeleteGroup(groupId) {
        try {
            // ** CHAMADA REAL À API: Ex: await deleteGroup(groupId); **

            // Atualiza o estado: Remove o grupo com o ID fornecido
            setGrupos(prevGrupos => prevGrupos.filter(g => g.id !== groupId));
            console.log(`Grupo ID ${groupId} excluído.`);
        } catch (error) {
            console.error("Erro ao excluir grupo:", error);
        }
    }

    return (
        <div className="main">
            <div className="left-container">
                <div className="logo-section">
                    <img src={Logo} alt="EventU Logo" className="mini-logo" />
                    <h1>EventU</h1>
                </div>

                <div className="button-novo-eventu">
                    <NewEventU />
                </div>

                <div className="mini-calendario">
                    <MiniCalendar />
                </div>

                {/* PASSA TODAS AS PROPS DE GRUPO PARA O MyGroupsSection */}
                <MyGroupsSection 
                    groups={grupos} 
                    onGroupCreated={handleAddGroup} 
                    onGroupEdited={handleEditGroup} 
                    onGroupDeleted={handleDeleteGroup} 
                />  

            </div>

            <div className="index-container">
                <img 
                    src={avatar}
                    alt="Avatar"
                    className="imagem-botao"
                    onClick={() => setOpenPanel(true)}
                />

                <CalendarEventU events={eventos} />

                {openPanel && <UserPanel onClose={() => setOpenPanel(false)} />}
            </div>
        </div>
    );
}

export default Home;