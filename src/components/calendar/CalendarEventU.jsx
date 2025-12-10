import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "./calendarEventu.css"
import DisplayEvent from "./DisplayEvent";
import { getAllEvents, getOccurrences } from "../../service/eventService";

export default function CalendarEventU({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mapEventos, setMapEventos] = useState([]);
  let eventosFormatados = null

  const handleDateClick = (info) => {
    console.log("Data clicada: " + info.dateStr);
  };

  function verInfoEvent(info) {
    setSelectedEvent(info.event);
  }

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        const allEvents = await getAllEvents();
        setMapEventos(allEvents); 
        console.log("Detalhes carregados:", allEvents);
      } catch (error) {
        console.error("Erro ao carregar detalhes", error);
      }
    };
    carregarDetalhes();
  }, []);

  const fetchEvents = async (fetchInfo, successCallback, failureCallback) => {
    try {
      const startStr = fetchInfo.startStr.split("T")[0];
      const endStr = fetchInfo.endStr.split("T")[0];

      const response = await getOccurrences(startStr, endStr)
      
      const listaDeEventos = Array.isArray(response) 
        ? response 
        : Object.values(response);

      eventosFormatados = listaDeEventos.map((item) => ({
        id: item.event_id,
        title: item.event_title,
        start: item.occurrence_start,
        end: item.occurrence_end,
        backgroundColor: item.event_color || '#3788d8',
        borderColor: item.event_color || '#3788d8',
        textColor: "#fff",

        extendedProps: {
          description: item.event_description,
          location: item.event_location,
          event_type: item.event_type,
          recurrence: item.recurrence_rrule,
          color: item.color,
          start_datetime: item.occurrence_start
        }
      }));

      successCallback(eventosFormatados);
    }catch (error) {
      failureCallback(error);
    }
  };

  const getEventForModal = () => {
    if (!selectedEvent || mapEventos.length == 0) return null;
    console.log(mapEventos[selectedEvent.id])
    return mapEventos[selectedEvent.id];
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
          events={fetchEvents}
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

        {selectedEvent && mapEventos &&(
        <DisplayEvent
          event={getEventForModal()}
          closeModal={() => setSelectedEvent(null)}
          onEdit={(updatedData) => suaFuncaoDeEditar(updatedData)}
          onDelete={(ev) => suaFuncaoDeExcluir(ev)}
        />
      )}
      </div>
    </div>
  );
}
