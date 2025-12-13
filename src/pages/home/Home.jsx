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
import { deleteGroup, getGroup } from "../../service/groupService.js";


function Home() {
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

    async function loadGroups() {
        try {
            const grupos = await getGroup()
            console.log("Aqui", grupos.results)
            setGrupos(grupos.results);
        } catch (error) {
            console.error("Erro ao carregar grupos (simulação falhou):", error);
            setGrupos([]);
        }
    }

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
            window.location.reload();           
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


    async function handleDeleteGroup(groupId) {
        console.log(groupId)
        const response = await deleteGroup(groupId)
        if(response.ok){
            window.location.reload();
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
                {/*
                <div className="mini-calendario">
                    <MiniCalendar />
                </div>
                */}
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