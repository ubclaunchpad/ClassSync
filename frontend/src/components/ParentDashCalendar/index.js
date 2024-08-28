import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment-timezone";
import { redirect } from 'react-router-dom';

const URL = process.env.REACT_APP_API_URL
const ParentDashCalendar = ({ students, defaultView = "month", views = ["month", "week", "day", "agenda"] }) => {
  // moment.tz.setDefault('America/Los_Angeles');
  moment.locale("en-GB");

  const events = [];

  const ColorEnum = {
    pink: "#FF7AAC",
    purple: "#737EDE",
    green: "#70B32C",
    yellow: "#FFCD00",
    orange: "#FF914D"
    // Add more colors here as needed
  };
  moment.locale("en-GB");

  const localizer = momentLocalizer(moment);
  const [eventsData, setEventsData] = useState([]);
  const fetchStudentEvents = async () => {

    try {
      await Promise.all(students.map(async (student) => {
        const url = URL + `/students/classes/${student.student_id}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log(data)

          data.map(booking => {

            events.push({
              start: moment(booking.start_time).toDate(),
              end: moment(booking.start_time)
                .add(booking.session_duration, "minute")
                .toDate(),
              title: booking.title,
              studentName: student.name,
              color: student.color,
              link: booking.link
            })
          })
        }
      }))
      setEventsData(events);

    } catch (err) {
      throw new Error("Network response was not ok", err);
    }
  }

  useEffect(() => {
    fetchStudentEvents();
  }, [students])


  return (
    <div className="student-info-container">
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView={defaultView}
          views={views}
          events={eventsData}
          style={{ height: "100vh" }}
          min={new Date(2020, 1, 0, 7, 0, 0)}
          max={new Date(2020, 1, 0, 19, 0, 0)}
          eventPropGetter={(event) => {
            const backgroundColor = ColorEnum[event.color];
            return { style: { backgroundColor } };
          }}
          onSelectEvent={(event) => window.open(event.link, '_blank')} />


      </div>
    </div>
  );
};
export default ParentDashCalendar;