import { useState } from "react";
import NewEventUModal from "./NewEventUModal";
import "./newEventU.css";

function NewEventU(grupos) {
  const [open, setOpen] = useState(false);

  return (
    <div className="button-novo-eventu">
      <button className="enter-btn" onClick={() => setOpen(true)}>
        Novo EventU
      </button>

      {open && <NewEventUModal grupos={grupos} closeModal={() => setOpen(false)} />}
    </div>
  );
}

export default NewEventU;
