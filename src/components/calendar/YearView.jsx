import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function YearView() {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <div className="year-grid">
      {months.map((m, index) => (
        <div key={index} className="year-month">
          <h4>{m}</h4>

          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={false}
            fixedWeekCount={false}
            contentHeight="auto"
            height="auto"
            dayHeaderFormat={{ weekday: "short" }}
          />
        </div>
      ))}
    </div>
  );
}
