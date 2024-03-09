import {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";

const ParentDashCalendar = ({students}) => {
const localizer = momentLocalizer(moment);
const [eventsData, setEventsData] = useState([]);
const events = [];

  const fetchStudentEvents = async () => {

      try {
        await Promise.all(students.map(async (student) => {
        const url = `http://localhost:8080/student-profile/bookings/${student.id}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
            data[0].search_enrollments_by_student_id.enrollments.map(enrollment => {
            if (enrollment.bookings != null) {
              enrollment.bookings.map(booking => {
                events.push({
                  start: new Date(booking.start_time),
                  end: moment(booking.start_time)
                  .add(booking.session_duration, "minute")
                  .toDate(),
                  title: `${student.name} Tutoring Session with Tutor ${booking.tutor_id}`,
                  studentName: student.name,
                  color: "green",
                })
              })
            }
          })
        }}))
        setEventsData(events);

      } catch (err) {
        throw new Error("Network response was not ok", err);
      }}

  useEffect(() => {
    fetchStudentEvents();
  }, [students])


  return (
    <div className="student-info-container">
      <div className="App">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={eventsData}
            style={{ height: "100vh" }}
            eventPropGetter={(event) => {
              const backgroundColor = event.color;
              return { style: { backgroundColor } };
            }}
          />
      </div>
    </div>
  );
};
export default ParentDashCalendar;