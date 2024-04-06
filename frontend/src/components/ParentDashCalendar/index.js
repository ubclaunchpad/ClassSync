import {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";

const ParentDashCalendar = ({students}) => {
 
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
        console.log(students);
        await Promise.all(students.map(async (student) => {
        const url = `http://localhost:8080/student-profile/bookings/${student.student_id}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
            data[0].search_enrollments_by_student_id.enrollments.map(enrollment => {
            if (enrollment.bookings != null) {
              enrollment.bookings.map(booking => {
                events.push({
                  start: moment(booking.start_time).toDate(),
                  end: moment(booking.start_time)
                  .add(booking.session_duration, "minute")
                  .toDate(),
                  title: `${student.name} Tutoring Session with Tutor ${booking.tutor_id}`,
                  studentName: student.name,
                  color: student.color,
                })

                console.log(new Date(booking.start_time))
              })
            }
          })
        }}))

        console.log("Pushing ", events)
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
            min={new Date(2020, 1, 0, 7, 0, 0)}
            max={new Date(2020, 1, 0, 19, 0, 0)}
            eventPropGetter={(event) => {
              const backgroundColor = ColorEnum[event.color];
              return { style: { backgroundColor } };
            }}
          />


      </div>
    </div>
  );
};
export default ParentDashCalendar;