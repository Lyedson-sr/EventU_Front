import { useState, useRef} from "react";
import Field from "./Field";
import "./newEventU.css";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { createEvent } from "../../service/eventService";
import Swal from "sweetalert2";

function NewEventUModal({ closeModal }) {
  const [title, setTitle] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [time, setTime] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [convidados, setConvidados] = useState("");
  const [dateEnd, setDateEnd] = useState(""); // Estado do fim
  const user = JSON.parse(localStorage.getItem('user'));

  const [touched, setTouched] = useState({
    title: false,
    dateStart: false,
    time: false,
    reminderTime: false,
    dateEnd: false, 
    typeEvent: false
  });

  const dateStartInputRef = useRef(null); 
  const dateEndInputRef = useRef(null);   
  const timeInputRef = useRef(null); 

  const isTitleValid = title.trim() !== "";
  const isDateValid = dateStart !== "";
  const isTimeValid = time !== "";
  const isReminderValid = reminderTime !== ""; 
  const isTypeEventValid = typeEvent !== "";

  const handleDateStartIconClick = () => {
    if (dateStartInputRef.current?.showPicker) {
        dateStartInputRef.current.showPicker();
    } else if (dateStartInputRef.current) {
        dateStartInputRef.current.focus();
    }
  };

  const handleDateEndIconClick = () => {
    if (dateEndInputRef.current?.showPicker) {
        dateEndInputRef.current.showPicker();
    } else if (dateEndInputRef.current) {
        dateEndInputRef.current.focus();
    }
  };

  const handleTimeIconClick = () => {
    if (timeInputRef.current?.showPicker) {
        timeInputRef.current.showPicker();
    } else if (timeInputRef.current) {
        timeInputRef.current.focus();
    }
  };

  const showTitleError = touched.title && !isTitleValid;
  const showDateError = touched.dateStart && !isDateValid;
  const showTimeError = touched.time && !isTimeValid;
  const showReminderError = touched.reminderTime && !isReminderValid;
  const showTypeError = touched.typeEvent && !isTypeEventValid;

  async function handleCreate(){
    setTouched({ 
        title: true, 
        dateStart: true, 
        time: true,
        reminderTime: true,
        dateEnd: true,
        typeEvent: true
    });

    if (isTitleValid && isDateValid && isTimeValid && isReminderValid && isTypeEventValid) {

      const start_datetime = `${dateStart}T${time}:00-03:00`;
      const end_datetime = `${dateEnd}T${time}:00-03:00`; 
      
      const diffDias = (new Date(dateEnd) - new Date(dateStart)) / (1000 * 60 * 60 * 24);

      if(diffDias < 0){
        Swal.fire({
                icon: "error",
                title: "Datas invalidas!",
                text: "Por favor, digite data de inicio e fim validas.",
              });
        return
      }else if(diffDias <= 7 && recurrence == "Semanalmente"){
        Swal.fire({
                icon: "error",
                title: "Datas invalidas!",
                text: "Eventos semanais devem durar mais de 7 dias",
              });
        return
      }else if(diffDias <= 31 && recurrence == "Mensalmente"){
        Swal.fire({
                icon: "error",
                title: "Datas invalidas!",
                text: "Eventos mensais devem durar mais de 31 dias",
              });
        return
      }else if(diffDias <= 365 && recurrence == "Anualmente"){
        Swal.fire({
                icon: "error",
                title: "Datas invalidas!",
                text: "Eventos anuais devem durar mais de 365 dias",
              });
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const convidadosList = convidados
        .split(",")
        .map(email => email.trim())
        .filter(email => emailRegex.test(email));      
      
      const response = await createEvent(title, description, location, typeEvent, start_datetime, end_datetime, recurrence, null, color, convidadosList);
      
      if(response.ok){
        window.location.reload();
      }
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
          {/* Título */}
          <Field
            label="Título"
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, title: true }))}
            error={showTitleError}
            errorMsg="Título é obrigatório."
          />

          {/* Descrição */}
          <Field
            label="Descrição"
            placeholder="Descrição do evento"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          {/* Data Inicio */}
          <Field
            label="Data de início"
            placeholder="dd/mm/aaaa"
            type="date-icon"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, dateStart: true }))}
            error={showDateError}
            errorMsg="Data é obrigatória."
            icon={<FaRegCalendarAlt />} 
            inputRef={dateStartInputRef} // REFERÊNCIA CORRETA
            handleIconClick={handleDateStartIconClick} // HANDLER CORRETO
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

          {/* Data do fim */}
          <Field
            label="Data do fim"
            placeholder="dd/mm/aaaa"
            type="date-icon"
            value={dateEnd}
            onChange={(e)=>setDateEnd(e.target.value)}
            icon={<FaRegCalendarAlt />} 
            inputRef={dateEndInputRef} // REFERÊNCIA CORRETA
            handleIconClick={handleDateEndIconClick} // HANDLER CORRETO
          />

          {/* ... Restante do código (Tipo, Local, etc) permanece igual ... */}
          <Field 
            label="Tipo" 
            type="select"
            value={typeEvent}
            onChange={(e) => setTypeEvent(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, typeEvent: true }))} 
            error={showTypeError}
            errorMsg="Tipo do evento é obrigatório"
          >
            <option value="">Selecione...</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Group">Grupo</option>
            {user && user.role === "admin" && (
              <option value="institutional">Institucional</option>
            )}
          </Field>


          <Field 
            label="Local" 
            placeholder="Local do evento" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
          />

          <Field label="Recorrência" type="select" value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
            <option value="Não se repete">Não se repete</option>
            <option value="Diariamente">Diariamente</option>
            <option value="Semanalmente">Semanalmente</option>
            <option value="Mensalmente">Mensalmente</option>
            <option value="Anualmente">Anualmente</option>
          </Field>

          <Field
            label="Convidados"
            placeholder="Emails separados por vírgula"
            large
            value={convidados}
            onChange={(e) => setConvidados(e.target.value)}
          />
          
          <Field
            label="Lembrete"
            placeholder="Ex: 10 minutos antes"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, reminderTime: true }))}
            error={showReminderError}
            errorMsg="Lembrete é obrigatório."
          />

          <div className="field-n color-field-n"> 
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