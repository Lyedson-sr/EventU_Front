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
function Home() {
  const { auth, setAuth } = useAuth();
  const [openPanel, setOpenPanel] = useState(false);

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    loadEvents();
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
      </div>

      <div className="index-container">
        <img 
          src={avatar}
          alt="Avatar"
          className="imagem-botao"
          onClick={() => setOpenPanel(true)}
        />

        {/* 🔥 agora SEM ERROS */}
        <CalendarEventU events={eventos} />

        {openPanel && <UserPanel onClose={() => setOpenPanel(false)} />}
      </div>
    </div>
  );
}

export default Home;
