import "@fullcalendar/common/main.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import "./calendario.css";

const Calendario = ({ handleSelect }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formatDate = (date) => date.toISOString().split("T")[0];


  return (
    <div className="C-calendario">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="es"
        selectable={true}
        validRange={{ start: formatDate(today) }}
        selectAllow={(seleccInfo) => {
          const selectedDate = new Date(seleccInfo.start);
          selectedDate.setHours(0, 0, 0, 0);
          return selectedDate.getTime() !== today.getTime();
        }}
        select={(info) => {
          handleSelect(info);
        }}
      />
    </div>
  );
};

export default Calendario;
