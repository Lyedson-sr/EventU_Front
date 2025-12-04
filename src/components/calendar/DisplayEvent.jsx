import { useState, useEffect, useRef } from "react";
import Field from "./Field";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

function DisplayEvent({ closeModal, event }) {

  // Preenche os campos automaticamente com base no "event" recebido
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [recurrence, setRecurrence] = useState("");

  // Refs necessários para o Field de ícone
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const handleDateIconClick = () => {
    dateInputRef.current?.showPicker?.() || dateInputRef.current?.focus();
  };

  const handleTimeIconClick = () => {
    timeInputRef.current?.showPicker?.() || timeInputRef.current?.focus();
  };

  // ⬇ Preenche os dados quando o modal abre
  useEffect(() => {
    if (!event) return;

    setTitle(event.title || "");
    setDescription(event.extendedProps?.description || "");
    setLocation(event.extendedProps?.location || "");
    setTypeEvent(event.extendedProps?.typeEvent || "");
    setRecurrence(event.extendedProps?.recurrence || "");
    setColor(event.backgroundColor || event.extendedProps?.color || "");

    // Data e hora do FullCalendar
    if (event.start) {
      const iso = event.start.toISOString();
      setDate(iso.substring(0, 10));     // yyyy-mm-dd
      setTime(iso.substring(11, 16));    // hh:mm
    }

    setReminderTime(event.extendedProps?.reminderTime || "");

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
            onChange={(e) => setTitle(e.target.value)}
          />

          <Field
            label="Descrição"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Field
            label="Data"
            type="date-icon"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            icon={<FaRegCalendarAlt />}
            inputRef={dateInputRef}
            handleIconClick={handleDateIconClick}
          />

          <Field
            label="Hora"
            type="time-icon"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            icon={<FaRegClock />}
            inputRef={timeInputRef}
            handleIconClick={handleTimeIconClick}
          />

          <Field 
            label="Tipo" 
            type="select"
            value={typeEvent}
            onChange={(e) => setTypeEvent(e.target.value)}
          >
            <option value="Pessoal">Pessoal</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Outro">Outro</option>
          </Field>

          <Field
            label="Local"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Field
            label="Convidados"
            placeholder="Emails separados por vírgula"
            large
          />

          <Field
            label="Lembrete"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />

          <Field 
            label="Recorrência" 
            type="select" 
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
          >
            <option value="Não se repete">Não se repete</option>
            <option value="Diariamente">Diariamente</option>
            <option value="Semanalmente">Semanalmente</option>
            <option value="Mensalmente">Mensalmente</option>
            <option value="Anualmente">Anualmente</option>
          </Field>

          <div className="field-n color-field-n large-n">
            <label>Cor do evento</label>

            <div className="color-picker-n">
              <button className="color-n red-n"   onClick={() => setColor("#e63946")}/>
              <button className="color-n gray-n"  onClick={() => setColor("#d9d9d9")}/>
              <button className="color-n blue-n"  onClick={() => setColor("#74b3ff")}/>
              <button className="color-n green-n" onClick={() => setColor("#2a9d8f")}/>
              <button className="add-color-btn-n">
                +
                <input type="color" className="color-picker" onChange={(e)=>setColor(e.target.value)}/>
              </button>
            </div>
          </div>

        </div>

        <div className="modal-footer-n">
          <button className="cancel-btn-n" onClick={closeModal}>
            Fechar
          </button>
          <button className="create-btn-n">
            Salvar alterações
          </button>
        </div>

      </div>
    </div>
  );
}

export default DisplayEvent;
