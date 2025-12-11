import { useState, useEffect, useRef } from "react";
import Field from "./Field";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { deleteEvent, editEvent } from "../../service/eventService";

function DisplayEvent({ closeModal, event }) {

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [dateStart, setDateStart] = useState(""); // Renomeado para dateStart para clareza
  const [dateEnd, setDateEnd] = useState("");     // Novo estado para Data Fim
  const [time, setTime] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [convidados, setConvidados] = useState("");

  // --- REFS SEPARADOS ---
  const dateStartInputRef = useRef(null);
  const dateEndInputRef = useRef(null);
  const timeInputRef = useRef(null);

  // --- HANDLERS SEPARADOS ---
  const handleDateStartIconClick = () => {
    if (isEditing) dateStartInputRef.current?.showPicker?.();
  };

  const handleDateEndIconClick = () => {
    if (isEditing) dateEndInputRef.current?.showPicker?.();
  };

  const handleTimeIconClick = () => {
    if (isEditing) timeInputRef.current?.showPicker?.();
  };

  async function deletedEvent (){
    const response = await deleteEvent(event.id);
    if(response.ok){
        console.log("Deletado!!")
    }
    closeModal()
    window.location.reload();
  }
  
  async function handleEditEvent () {
    if (!isEditing) {
        setIsEditing(true); 
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const convidadosList = convidados
            .split(",")
            .map(email => email.trim())
            .filter(email => emailRegex.test(email));      

        // --- Monta as datas completas (Start e End) ---
        const start_datetime = `${dateStart}T${time}:00-03:00`;
        
        const end_datetime = `${dateEnd}T${time}:00-03:00`; 

        // Atualizei a chamada para passar start_datetime e end_datetime
        // Verifique se seu service 'editEvent' aceita esses parâmetros nessa ordem
        const response = await editEvent(event.id, title, description, location, typeEvent, start_datetime, end_datetime, recurrence, null, color, convidadosList)
        
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
    setDescription(event.description || "");
    setLocation(event.location || "");
    
    if(event.event_type === "personal"){
        setTypeEvent('personal');
    }
    
    console.log(event.recurrence_rrule)
    if (event.recurrence_rrule.includes("RRULE:FREQ=DAILY")) {
    setRecurrence("Diariamente");
    } else if (event.recurrence_rrule.includes("RRULE:FREQ=WEEKLY")) {
        setRecurrence("Semanalmente");
    } else if (event.recurrence_rrule.includes("RRULE:FREQ=MONTHLY")) {
        setRecurrence("Mensalmente");
    } else if (event.recurrence_rrule.includes("RRULE:FREQ=YEARLY")) {
        setRecurrence("Anualmente");
    } else {
        setRecurrence("Não se repete");
    }

    // Procura por "UNTIL=" seguido de números, T e Z
    const match = (event.recurrence_rrule || "").match(/UNTIL=(\d{4})(\d{2})(\d{2})/);
    if (match) {
      setDateEnd(`${match[1]}-${match[2]}-${match[3]}`);
    }

    setColor(event.backgroundColor || event.color || "");
    
    // --- Lógica para Data Inicio ---
    if (event.start_datetime) {
      const isoStart = event.start_datetime; 
      const cleanStart = isoStart.replace(/([-+]\d{2}:\d{2})$/, ""); // remove timezone
      setDateStart(cleanStart.substring(0, 10));        
      setTime(cleanStart.substring(11, 16));       
    }

    setReminderTime(event.reminderTime || "");
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

          {/* Data Início */}
          <Field
            label="Data Início"
            type="date-icon"
            value={dateStart}
            disabled={!isEditing}
            onChange={(e) => setDateStart(e.target.value)}
            icon={<FaRegCalendarAlt />}
            inputRef={dateStartInputRef}      // Ref Específico
            handleIconClick={handleDateStartIconClick} // Handler Específico
          />

          {/* Hora */}
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

           {/* Data Fim (NOVO) */}
           <Field
            label="Data Fim"
            type="date-icon"
            value={dateEnd}
            disabled={!isEditing}
            onChange={(e) => setDateEnd(e.target.value)}
            icon={<FaRegCalendarAlt />}
            inputRef={dateEndInputRef}        // Ref Específico
            handleIconClick={handleDateEndIconClick} // Handler Específico
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

          {/* COR DO EVENTO */}
          <div className="field-n color-field-n">
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
          <button 
            className="cancel-btn-n"
            onClick={deletedEvent}
          >
            Excluir
          </button>

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