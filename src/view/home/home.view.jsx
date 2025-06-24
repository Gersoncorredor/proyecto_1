import "../../App.css";
import styles from "./home.module.css";
import "@fullcalendar/common/main.css";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useEffect } from "react";
import Modal from "../../components/modal/modal.jsx";


function Home() {
  const calendarEl = useRef(null);
  const today = new Date();

  const formatDate = (date) => date.toISOString().split("T")[0];

  //calendario
  useEffect(() => {
    const calendar = new Calendar(calendarEl.current, {
      locale: "es",
      selectable: true,
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      validRange: {
        start: formatDate(today),
      },

      select: function (info) {
        handleSelect(info);
      },
    });
    calendar.render();
  }, []);

  const handleSelect = (info) => {
    alert(info.startStr);
  };

  return (
    <div className="app">
      <div className="home">
        <div className={styles.homeCalendar} ref={calendarEl} />
      </div>
    </div>
  );
}

export default Home;
