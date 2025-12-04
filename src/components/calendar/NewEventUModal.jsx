import { useState, useRef, useEffect } from "react";
import "./newEventU.css";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { createEvent, getAllEvents } from "../../service/eventService";

// --- DEFINIÇÃO DO CAMPO (MOVIDO PARA FORA PARA CORRIGIR O FOCO) ---
const Field = ({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    errorMsg,
    large = false,
    icon = null,
    children = null,
    inputRef = null, 
    handleIconClick = null, 
  }) => {
      return (
        <div className={`field-n ${large ? "large-n" : ""}`}>
            <label>{label}</label>
            
            {/* Estrutura para Data/Hora com ícone */}
            {type === "date-icon" || type === "time-icon" ? (
                <div className="input-with-icon-n">
                    <input
                        ref={inputRef} 
                        type={type === "date-icon" ? "date" : "time"} 
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        className={error ? "input-error-n" : ""}
                    />
                    <span className="icon-n" onClick={handleIconClick}> 
                        {icon}
                    </span>
                </div>
            ) : type === "select" ? (
                <select value={value} onChange={onChange} className={error ? "input-error-n" : ""}>
                    {children}
                </select>
            ) : type === "textarea" ? (
                <textarea // Este é o componente usado pela Descrição
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={error ? "input-error-n" : ""}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={error ? "input-error-n" : ""}
                />
            )}

            {error && <span className="error-msg-n">{errorMsg}</span>}
        </div>
    );
  };

function NewEventUModal({ closeModal }) {
  // Estados para os campos
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [description, setDescription] = useState(""); // Novo estado para descrição
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("")
  const [typeEvent, setTypeEvent] = useState("")
  const [recurrence, setRecurrence] = useState("")
  
  const [touched, setTouched] = useState({
    title: false,
    date: false,
    time: false,
    reminderTime: false,
  });

  // Refs para inputs de Data e Hora
  const dateInputRef = useRef(null); 
  const timeInputRef = useRef(null); 

  // Funções de validação básica (mantidas)
  const isTitleValid = title.trim() !== "";
  const isDateValid = date !== "";
  const isTimeValid = time !== "";
  const isReminderValid = reminderTime !== ""; 

  // Handlers para abrir o seletor nativo
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

  const handleCreate = () => {
    
    setTouched({ 
        title: true, 
        date: true, 
        time: true,
        reminderTime: true 
    });

    if (isTitleValid && isDateValid && isTimeValid && isTimeValid && isReminderValid) {
      alert("Evento Criado com sucesso! (Simulação)");
      const start_datetime = `${date}T${time}:00.000Z`;

      createEvent(title, description, location, typeEvent, start_datetime, start_datetime, recurrence, null, color)
      
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
            // 'large' foi removido daqui para que fique lado a lado
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
            <option value="Trabalho">Trabalho</option>
            <option value="Outro">Outro</option>
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