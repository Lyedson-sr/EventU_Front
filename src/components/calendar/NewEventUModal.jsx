import { useState, useRef } from "react";
import Field from "./Field";
import "./newEventU.css";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { createEvent } from "../../service/eventService";

function NewEventUModal({ closeModal }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [convidados, setConvidados] = useState("")
  
  const [touched, setTouched] = useState({
    title: false,
    date: false,
    time: false,
    reminderTime: false,
  });

  const dateInputRef = useRef(null); 
  const timeInputRef = useRef(null); 

  const isTitleValid = title.trim() !== "";
  const isDateValid = date !== "";
  const isTimeValid = time !== "";
  const isReminderValid = reminderTime !== ""; 

  const handleDateIconClick = () => {
    if (dateInputRef.current && dateInputRef.current.showPicker) {
        dateInputRef.current.showPicker();
    } else if (dateInputRef.current) {
        dateInputRef.current.focus();
    }
  };

  const handleTimeIconClick = () => {
    if (timeInputRef.current && timeInputRef.current.showPicker) {
        timeInputRef.current.showPicker();
    } else if (timeInputRef.current) {
        timeInputRef.current.focus();
    }
  };

  const showTitleError = touched.title && !isTitleValid;
  const showDateError = touched.date && !isDateValid;
  const showTimeError = touched.time && !isTimeValid;
  const showReminderError = touched.reminderTime && !isReminderValid;

  async function handleCreate(){
    setTouched({ 
        title: true, 
        date: true, 
        time: true,
        reminderTime: true 
    });

    if (isTitleValid && isDateValid && isTimeValid && isReminderValid) {
      const start_datetime = `${date}T${time}:00-03:00`;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const convidadosList = convidados
        .split(",")
        .map(email => email.trim())
        .filter(email => emailRegex.test(email));      
      
        const response = await createEvent(title, description, location, typeEvent, start_datetime, start_datetime, recurrence, null, color, convidadosList);
        
        console.log(response)
        if(response.ok){
          window.location.reload();
        }
      closeModal();
    } else {
      console.log("Preencha os campos obrigatórios.");
    }
  };
  return (
    <div className="modal-overlay-n">
      <div className="modal-container-n">
        <button className="modal-close-btn-n" onClick={closeModal}>✕</button>

        <h2 className="modal-title-n">Novo EventU</h2>

        <div className="modal-grid-n">
          {/* Título (Coluna 1) */}
          <Field
            label="Título"
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, title: true }))}
            error={showTitleError}
            errorMsg="Título é obrigatório."
          />

          {/* Descrição (Coluna 2) - **REMOVIDO 'large'** para ficar ao lado do Título */}
          <Field
            label="Descrição"
            placeholder="Descrição do evento"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          {/* Data */}
          <Field
            label="Data"
            placeholder="dd/mm/aaaa"
            type="date-icon"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, date: true }))}
            error={showDateError}
            errorMsg="Data é obrigatória."
            icon={<FaRegCalendarAlt />} 
            inputRef={dateInputRef} 
            handleIconClick={handleDateIconClick} 
          />

          {/* Hora */}
          <Field
            label="Hora"
            placeholder="-- : --"
            type="time-icon"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, time: true }))}
            error={showTimeError}
            errorMsg="Horário é obrigatório."
            icon={<FaRegClock />} 
            inputRef={timeInputRef} 
            handleIconClick={handleTimeIconClick} 
          />

          {/* Tipo */}
          <Field 
            label="Tipo" 
            type="select"
            value={typeEvent}
            onChange={(e) => setTypeEvent(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Group">Grupo</option>
          </Field>


          {/* Local */}
          <Field 
            label="Local" 
            placeholder="Local do evento" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Convidados (Ocupa as duas colunas) */}
          <Field
            label="Convidados"
            placeholder="Emails separados por vírgula"
            large
            value={convidados}
            onChange={(e) => setConvidados(e.target.value)}
          />
          
          {/* Lembrete */}
          <Field
            label="Lembrete"
            placeholder="Ex: 10 minutos antes"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, reminderTime: true }))}
            error={showReminderError}
            errorMsg="Lembrete é obrigatório."
          />

          {/* Recorrência recurrence, setRecurrence */}
          <Field label="Recorrência" type="select" value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
            <option value="Não se repete">Não se repete</option>
            <option value="Diariamente">Diariamente</option>
            <option value="Semanalmente">Semanalmente</option>
            <option value="Mensalmente">Mensalmente</option>
            <option value="Anualmente">Anualmente</option>
          </Field>

          {/* Cor do evento (Ocupa as duas colunas) */}
          <div className="field-n color-field-n large-n"> 
            <label>Cor do evento</label>
            <div className="color-picker-n">
              <button className="color-n red-n"   onClick={() => setColor("#e63946")}/>
              <button className="color-n gray-n"  onClick={() => setColor("#d9d9d9")}/>
              <button className="color-n blue-n"  onClick={() => setColor("#74b3ff")}/>
              <button className="color-n green-n" onClick={() => setColor("#2a9d8f")}/>
              <button className="add-color-btn-n">
                +
                <input type="color" className="color-picker" onChange={(e) => setColor(e.target.value)}/>
              </button>
            </div>
          </div>
          
        </div>

        <div className="modal-footer-n">
          <button className="cancel-btn-n" onClick={closeModal}>
            Cancelar
          </button>
          <button className="create-btn-n" onClick={handleCreate}>
            Criar EventU
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewEventUModal;