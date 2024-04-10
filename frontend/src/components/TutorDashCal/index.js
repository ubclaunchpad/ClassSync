import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment-timezone";
import "./index.css"; 

const TutorDashCal = () => {
  const localizer = momentLocalizer(moment);

  return (
    <div className="tutor-cal-container">
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          style={{ height: "100vh" }}
          min={new Date(2020, 1, 0, 7, 0, 0)}
          max={new Date(2020, 1, 0, 19, 0, 0)}
        />
      </div>
    </div>
  );
};

export default TutorDashCal;
