import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "../../assets/EventU-logo.png";
import MiniCalendar from "../../components/calendar/MiniCalendar.jsx";
import "./home.css";
import CalendarEventU from "../../components/calendar/CalendarEventU.jsx";
import NewEventU from "../../components/NewEventU.jsx";
import UserPanel from "../../components/UserPanel.jsx";
import avatar from "../../assets/Avatar.svg";
import { useState } from "react";

function Home() {
  const { auth, setAuth } = useAuth();
  const [openPanel, setOpenPanel] = useState(false);

  
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

        <div className="mini-calendaio">
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

      <CalendarEventU />

      {openPanel && <UserPanel onClose={() => setOpenPanel(false)} />}
    </div>
    </div>
  );
}

export default Home;
