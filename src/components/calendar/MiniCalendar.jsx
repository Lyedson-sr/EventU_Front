import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./mini-calendar.css";
export default function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        height="auto"   
        expandRows={true}           
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        titleFormat={{ year: "numeric", month: "long" }}
        dateClick={(info) => setSelectedDate(info.dateStr)}
        dayCellClassNames={(arg) =>
          arg.dateStr === selectedDate ? ["selected-day"] : []
        }
        events={[]} 
      />
    </div>
  );
}
