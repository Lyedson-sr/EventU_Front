import { useState, useEffect, useRef } from "react";
import Field from "./Field";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { deleteEvent, editEvent } from "../../service/eventService";

function DisplayEvent({ closeModal, event }) {

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [convidados, setConvidados] = useState("");

  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const handleDateIconClick = () => {
    if (isEditing) dateInputRef.current?.showPicker?.();
  };

  const handleTimeIconClick = () => {
    if (isEditing) timeInputRef.current?.showPicker?.();
  };

  const deletedEvent = () => {
    const response = deleteEvent(event.extendedProps.id);
    if(response){
        console.log("Deletado!!")
    }
    closeModal()
    window.location.reload();

  }
  
  async function handleEditEvent () {
    

    if (!isEditing) {
        setIsEditing(true);  // habilita os campos
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const convidadosList = convidados
            .split(",")
            .map(email => email.trim())
            .filter(email => emailRegex.test(email));      


        const response = await editEvent(event.extendedProps?.id ,title, description, location, typeEvent, date, time, recurrence, null, color, convidadosList)
        if(response.ok){
            setIsEditing(false);
            closeModal()
            window.location.reload();
        
        }
        
        setIsEditing(false);
    }
  }
  useEffect(() => {
    if (!event) return;

    setTitle(event.title || "");
    setDescription(event.extendedProps?.description || "");
    setLocation(event.extendedProps?.location || "");
    
    if(event.extendedProps?.event_type == "personal"){
        setTypeEvent('personal');
    }
    
    setRecurrence(event.extendedProps?.recurrence || "");
    setColor(event.backgroundColor || event.extendedProps?.color || "");

    if (event.extendedProps?.start_datetime) {
      const iso = event.extendedProps.start_datetime; 

      // remove o timezone (-03:00)
      const clean = iso.replace(/([-+]\d{2}:\d{2})$/, "");

      setDate(clean.substring(0, 10));        // "2026-02-02"
      setTime(clean.substring(11, 16));       // "21:00"
    }

    setReminderTime(event.extendedProps?.reminderTime || "");
    setIsEditing(false);

  }, [event]);

  return (
    <div className="modal-overlay-n">
      <div className="modal-container-n">

        <button className="modal-close-btn-n" onClick={closeModal}>✕</button>

        <h2 className="modal-title-n">Detalhes do Evento</h2>

        <div className="modal-grid-n">

          <Field
            label="Título"
            value={title}
            disabled={!isEditing}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Field
            label="Descrição"
            type="textarea"
            disabled={!isEditing}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Field
            label="Data"
            type="date-icon"
            value={date}
            disabled={!isEditing}
            onChange={(e) => setDate(e.target.value)}
            icon={<FaRegCalendarAlt />}
            inputRef={dateInputRef}
            handleIconClick={handleDateIconClick}
          />

          <Field
            label="Hora"
            type="time-icon"
            value={time}
            disabled={!isEditing}
            onChange={(e) => setTime(e.target.value)}
            icon={<FaRegClock />}
            inputRef={timeInputRef}
            handleIconClick={handleTimeIconClick}
          />

          <Field 
            label="Tipo" 
            type="select"
            disabled={!isEditing}
            value={typeEvent}
            onChange={(e) => setTypeEvent(e.target.value)}
          >
            <option value="Pessoal">Pessoal</option>
            <option value="Group">Grupo</option>
          </Field>

          <Field
            label="Local"
            disabled={!isEditing}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Field
            label="Convidados"
            placeholder="Emails separados por vírgula"
            disabled={!isEditing}
            large
            value={convidados}
            onChange={(e) => setConvidados(e.target.value)}
          />

          <Field
            label="Lembrete"
            disabled={!isEditing}
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />

          <Field 
            label="Recorrência" 
            type="select" 
            disabled={!isEditing}
            value={recurrence}
            onChange={(e) => {setRecurrence(e.target.value)}}
          >
            <option value="Não se repete">Não se repete</option>
            <option value="Diariamente">Diariamente</option>
            <option value="Semanalmente">Semanalmente</option>
            <option value="Mensalmente">Mensalmente</option>
            <option value="Anualmente">Anualmente</option>
          </Field>

          {/* COR DO EVENTO */}
          <div className="field-n color-field-n large-n">
            <label>Cor do evento</label>

            <div className={`color-picker-n ${!isEditing ? "disabled-n" : ""}`}>
              <button className="color-n red-n"   disabled={!isEditing} onClick={() => setColor("#e63946")}/>
              <button className="color-n gray-n"  disabled={!isEditing} onClick={() => setColor("#d9d9d9")}/>
              <button className="color-n blue-n"  disabled={!isEditing} onClick={() => setColor("#74b3ff")}/>
              <button className="color-n green-n" disabled={!isEditing} onClick={() => setColor("#2a9d8f")}/>
              <button className="add-color-btn-n" disabled={!isEditing}>
                +
                <input type="color" disabled={!isEditing} className="color-picker" onChange={(e)=>setColor(e.target.value)}/>
              </button>
            </div>
          </div>

        </div>

        <div className="modal-footer-n">

          {/* EXCLUIR */}
          <button 
            className="cancel-btn-n"
            onClick={deletedEvent}
          >
            Excluir
          </button>

          {/* EDITAR */}
          <button 
            className="create-btn-n"
            onClick={handleEditEvent}
          >
            {isEditing ? "Salvar" : "Editar"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default DisplayEvent;
