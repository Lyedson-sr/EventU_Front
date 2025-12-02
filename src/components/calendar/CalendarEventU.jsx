import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "./calendarEventu.css"

export default function CalendarEventU() {
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    alert("Data clicada: " + info.dateStr);
  };

  return (
    <div className="calendar-wrapper">
  <div style={{ padding: "20px" }}>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            multiMonthPlugin,
          ]}
          locale={ptBrLocale} 
          initialView="dayGridMonth"
          height="80vh"
          selectable={true}
          dateClick={handleDateClick}
          events={events}

          headerToolbar={{
            left: "prev,title,next",
            center: "today",
            right: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear",
          }}
titleFormat={{
            month: "long",
            year: "numeric",
          }}
          contentHeight="80vh"

          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}

          views={{
            timeGridDay: { buttonText: "Dia" },
            timeGridWeek: { buttonText: "Semana" },
            dayGridMonth: { buttonText: "Mês" },

            // 📌 View anual
            multiMonthYear: {
              type: "multiMonthYear",
              buttonText: "Ano",
            },
          }}
        />
      </div>
    </div>
  );
}
