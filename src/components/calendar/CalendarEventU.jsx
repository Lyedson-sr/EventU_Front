import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import YearView from "./YearView.jsx";

export default function CalendarEventU() {
  const [currentView, setCurrentView] = useState("dayGridMonth");

  return (
    <div className="calendar-wrapper">

      {/* 🔹 TOP BAR */}
      <div className="calendar-header">
        <h2><span>{"<"}</span> Outubro 2025 <span>{">"}</span></h2>

        <div className="view-buttons">
          <button onClick={() => setCurrentView("timeGridDay")}>DIA</button>
          <button onClick={() => setCurrentView("timeGridWeek")}>SEMANA</button>
          <button onClick={() => setCurrentView("dayGridMonth")}>MÊS</button>
          <button onClick={() => setCurrentView("yearView")}>ANO</button>
        </div>
      </div>

      {/* 🔹 RENDERIZAÇÃO */}
      {currentView !== "yearView" ? (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          height="auto"
          headerToolbar={false}
        />
      ) : (
        <YearView />
      )}
    </div>
  );
}
