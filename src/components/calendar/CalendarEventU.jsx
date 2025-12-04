import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "./calendarEventu.css"

export default function CalendarEventU({ events }) {

  const handleDateClick = (info) => {
    console.log("Data clicada: " + info.dateStr);
    console.log(eventos[0])
    console.log(events)
  };

  function verInfoEvent(info) {
    console.log(info.event)
    console.log(info.event.extendedProps);     // dados extras vindos da API
  }


  // Se não vier nada, vira array vazio
  const eventos = Array.isArray(events)
  ? events.map((evt) => ({
      id: evt.id,
      title: evt.title,
      start: evt.start_datetime,
      end: evt.end_datetime,
      backgroundColor: evt.color,
      borderColor: evt.color,
      textColor: "#fff",

      // 🔥 Aqui vão todos os dados originais
      extendedProps: {
        ...evt
      }
    }))
  : [];



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
          events={eventos}
          eventDidMount={(info) => {
            info.el.style.backgroundColor = info.event.backgroundColor;
            info.el.style.borderColor = info.event.borderColor;
            info.el.style.color = info.event.textColor;
          }}
          eventClick={(info) => {verInfoEvent(info)}}

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
