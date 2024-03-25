import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../BookingModal";
import "./index.css";
import { TutorDashboardLayout } from "../TutorDashboardLayout";
import { differenceInHours, endOfWeek, set, startOfWeek } from "date-fns";
import Select from "react-select";
import AdminTutorCalendar from "../AdminTutorCalendar";
import backArrow from "../../assets/leftArrow.svg";
import timeIcon from "../../assets/time.svg";
import studentIcon from "../../assets/student.svg";
import tutorIcon from "../../assets/tutor.svg";
import courseIcon from "../../assets/course.svg";
import trashIcon from "../../assets/trashBin.svg";
import editIcon from "../../assets/edit.svg";
import saveIcon from "../../assets/save.svg";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function AdminCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startDate, setStartDate] = useState(startOfWeek(new Date()));
  const [isLoaded, setIsLoaded] = useState(false);
  const [openSlots, setOpenSlots] = useState({});
  const [title, setTitle] = useState("");
  const [students, setStudents] = useState([]);
  const [bookingError, setBookingError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [bookings, setBookings] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [selectingTutor, setSelectingTutor] = useState(false);
  const [changeNewTutor, setChangeNewTutor] = useState();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const [editting, setEditting] = useState(false);
  const [forceRender, setForceRerender] = useState(false);
  const [availableTutors, setAvailableTutors] = useState([]);

  const loadData = async () => {
    // let url = `http://localhost:8080/tutor/availability/schedule?userID=${localStorage.getItem(
    //   "userID"
    // )}&startDate=${startDate.toISOString().split("T")[0]}`;

    try {
      // const response = await fetch(url);

      // if (!response.ok) {
      //   console.log("Failed to fetch data");
      //   throw new Error("Network response was not ok");
      // }

      // const data = await response.json();
      // console.log("Response is ", data);

      // const filteredData = {};

      // Object.entries(data[0]).forEach(([day, slots]) => {
      //   slots.sort(); // Ensure the slots are sorted in ascending order
      //   filteredData[day] = slots.filter((slot, index) => {
      //     const nextSlot = slots[index + 1];
      //     if (!nextSlot) return false; // If there's no next slot, exclude the current slot
      //     const currentSlotHour = parseInt(slot.split(":")[0]);
      //     const currentSlotMinute = parseInt(slot.split(":")[1]);
      //     const nextSlotHour = parseInt(nextSlot.split(":")[0]);
      //     const nextSlotMinute = parseInt(nextSlot.split(":")[1]);
      //     // If the next slot is within the same hour or the next half hour, include the current slot
      //     return (
      //       nextSlotHour === currentSlotHour ||
      //       (nextSlotHour === currentSlotHour + 1 &&
      //         nextSlotMinute < currentSlotMinute)
      //     );
      //   });
      // });

      // setOpenSlots(filteredData);
      let url = `http://localhost:8080/appointments/all?date=${startDate.toISOString().split("T")[0]}`;
      const appointmentsResponse = await fetch(url);
      const appointmentsData = await appointmentsResponse.json();
      console.log("Appt " ,appointmentsData)

      url = "http://localhost:8080/students";
      const studentsResponse = await fetch(url);
      const studentsData = await studentsResponse.json();
      setStudents(studentsData);

      url = "http://localhost:8080/tutor/offerings";
      const coursesResponse = await fetch(url);
      const coursesData = await coursesResponse.json();

      // Transform coursesData into options format
      const options = coursesData.map((course) => ({
        value: course.course_id,
        label: `${course.course_difficulty} ${course.course_name}`,
        color: course.color,
      }));

   
      // Filter selectedOptions based on offeringsData


      setCourses(options);
      console.log(appointmentsData);

      let appointments = [];
      appointmentsData.forEach((booking) => {
        const end = moment(booking.start)
          .add(booking.duration, "minute")
          .toDate();

        appointments.push({
          start: new Date(booking.start),
          end: end,
          title: booking.title,
          id: booking.booking,
          tutor_id: booking.tutor,
          enrollment_id: booking.enrollment,
        });
      });

      console.log("Appointments are ", appointments);

      setEventsData(appointments);

      setIsLoaded(true);

      // Use the data here
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const fetchAppointmentInfo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/booking?id=${id}`);
      const appointmentData = await response.json();
      console.log("Appointment info ", appointmentData)
      setAppointmentInfo(appointmentData);
    } catch {
      console.log("cannot get appointment info");
    }
  };

  useEffect(() => {
    // This code will run whenever `startDate` changes
    console.log("Start date is ", startDate)
    setIsLoaded(false);
    loadData();
  }, [startDate]); // Add `startDate` as a dependency

  useEffect(() => {
    const handleResize = () => {
      setForceRerender((prev) => !prev);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleSelect = ({ start }) => {
    if (enrollmentId === null) return;
    setBookingError(null); // Clear the error when selecting a new slot
    const end = moment(start).add(1, "hour").toDate();

    // Convert the start date to the format used in availableSlotsByDay.
    const startTime = moment(start).format("HH:mm");

    // Get the day of the week of the start date.
    const dayOfWeek = moment(start).day();

    const overlaps = eventsData.some(
      (event) => start < event.end && end > event.start
    );
    // Check if the start time and the next time slot are in the array for the day of the week.
    const isSlotAvailable =
      openSlots[dayOfWeek] &&
      openSlots[dayOfWeek].includes(startTime) &&
      !overlaps;

    if (isSlotAvailable) {
      setSelectedSlot({ start, end });
      setSelectingTutor(true);
      // if (enrollmentId) handleBook(start, end);
    } else {
      setSelectedSlot(null);
      console.log("This slot is not available.");
    }
  };

  const editEvent = async (event) => {
 
    fetchAppointmentInfo(event.id);
    const selectedTime = event.start
    .toTimeString()
    .split(" ")[0]
    .substring(0, 5);
  const thirtyMinsLater = new Date(event.start.getTime() + 30 * 60000)
    .toTimeString()
    .split(" ")[0]
    .substring(0, 5);
  const times = [selectedTime, thirtyMinsLater];
console.log(times);
    getAvailableTutors(event, times);
    setSelectedBooking(event);
  };

  const getAvailableTutors = async (event, times) => {
    console.log("Event is ", event)
    console.log(courses)

console.log(event.title);
const changeCourseId = courses.find(
  (course) => course.label === event.title
)?.value;

console.log("Course id is ", changeCourseId)


    // API call for tutor availability
    let response = await fetch(
      `http://localhost:8080/tutor/courses?course_id=${changeCourseId}`
    );
    const data = await response.json();
    console.log(data)
    const ids = data.map(item => item.tutor_id);
    console.log("ids are ", ids)

    response = await fetch(`http://localhost:8080/tutor/time?start_date=${startDate.toISOString().split('T')[0]}&tutor_ids=${ids}&day=${event.start.getDay()}&time1=${times[0]}&time2=${times[1]}`);    
    const respData = await response.json()

    console.log("response is ", respData)

    
    const tutorsOptions = respData.map((course) => ({
      value: course.tutor_id,
      label: course.tutor_name,
    }));

    setAvailableTutors(tutorsOptions);
  };

  const changeTutor = async (event) => {
    console.log(event);
    // await deleteEvent(event);
    try {
      console.log('selectedBooking:', selectedBooking);
      console.log('changeNewTutor:', changeNewTutor);
      console.log('event:', event);

      await fetch("http://localhost:8080/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            enrollment_id: selectedBooking.enrollment_id,
            tutor_id: changeNewTutor.value,
            session_duration: 60,
            start_time: event.start,
          },
        }),
      });

      const selectedTime = event.start.toTimeString().split(' ')[0].substring(0, 5);
      const thirtyMinsLater = new Date(event.start.getTime() + 30 * 60000).toTimeString().split(' ')[0].substring(0, 5);
      const times = [selectedTime, thirtyMinsLater];

      console.log('selectedTime:', selectedTime);
      console.log('thirtyMinsLater:', thirtyMinsLater);
      console.log('times:', times);

      console.log("Adding for " ,event.tutor_id)
      console.log("Removing for " ,changeNewTutor.value)


      let body = JSON.stringify({
          tutor_id: event.tutor_id,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endOfWeek(startDate).toISOString().split('T')[0],
          day: event.start.getDay(),
          times: times
      });

      console.log("Body is ", body)

      let URL = "http://localhost:8080/availability/add"

      await fetch(URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body
      });

      body = JSON.stringify({
          tutor_id: changeNewTutor.value,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endOfWeek(startDate).toISOString().split('T')[0],
          day: event.start.getDay(),
          times: times
      });

      console.log("New body is ", body)

      let url = "http://localhost:8080/availability/remove"
      await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body
      });

      setAppointmentInfo({ ...appointmentInfo, tutor: changeNewTutor.label });

      console.log('appointmentInfo after setAppointmentInfo:', appointmentInfo);

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const deleteEvent = async (event) => {
    console.log(event);
    const response = await fetch(
      `http://localhost:8080/availability/booking?id=${event.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("Deleted booking");
      setEventsData(eventsData);

      const selectedTime = event.start
        .toTimeString()
        .split(" ")[0]
        .substring(0, 5);
      const thirtyMinsLater = new Date(event.start.getTime() + 30 * 60000)
        .toTimeString()
        .split(" ")[0]
        .substring(0, 5);
      const times = [selectedTime, thirtyMinsLater];

      let body = JSON.stringify({
        tutor_id: localStorage.getItem("userID"),
        start_date: startDate.toISOString().split("T")[0],
        end_date: endOfWeek(startDate).toISOString().split("T")[0],
        day: event.start.getDay(),
        times: times,
      });

      console.log("Body is ", body);

      let url = "http://localhost:8080/availability/add";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (response.ok) {
        console.log("Added availability");
        loadData();
        if (studentId && courseId) searchEnrollments();
      } else {
        console.log("Error adding availability");
      }
    } else {
      setBookingError("Failed to delete session");
    }
  };

  const slotPropGetter = (date) => {
    const dayOfWeek = moment(date).day(); // 0 for Sunday, 1 for Monday, etc.
    const timeFormat = "HH:mm";
    const currentTimeSlot = moment(date).format(timeFormat);
    const prevTimeSlot = moment(currentTimeSlot, "HH:mm")
      .subtract(30, "minutes")
      .format("HH:mm");

    if (
      openSlots[dayOfWeek] &&
      (openSlots[dayOfWeek].includes(currentTimeSlot) ||
        openSlots[dayOfWeek].includes(prevTimeSlot))
    ) {
      return {
        className: "available",
      };
    } else {
      return {
        className: "unavailable",
      };
    }
  };

  const EventComponent = ({ event }) => (
    <div className="rbc-event" style={{ position: "relative" }}>
      <div className="event-content">{event.title}</div>
    </div>
  );

  const searchEnrollments = async () => {
    console.log(studentId);
    console.log(courseId);

    setBookings(false);
    setBookingError(null);
    let url = `http://localhost:8080/bookings?student_id=${studentId.value}&course_id=${courseId.value}`;
    console.log("URL is ", url);
    const response = await fetch(url);
    const bookingsResponse = await response.json();

    let id = localStorage.getItem("userID");
    if (response.ok) {
      let appointments = [];

      console.log("Bookings Response is ", bookingsResponse[0]);

      setEnrollmentId(bookingsResponse[0].search_enrollments.id);

      for (let booking of bookingsResponse[0].search_enrollments.bookings) {
        console.log("Booking is ", booking);
        let bookingDate = new Date(booking.start_time);
        appointments.push({
          id: booking.booking_id,
          start: new Date(booking.start_time),
          time:
            bookingDate.getHours().toString().padStart(2, "0") +
            ":" +
            bookingDate.getMinutes().toString().padStart(2, "0"),
          readOnly: booking.tutor_id !== Number(id),
        });
      }
      setAppointmentInfo(bookings)
      console.log(enrollmentId);
      console.log("Appointments are ", appointments);
      setLessons(appointments);
      setBookings(true);
      // setSelectingTutor(true);
    } else {
      setBookingError("No enrollment found for this student and course");
    }
    console.log("URL is ", url);
  };

  const handleSelectedTutor = async () => {
    setSelectingTutor(false);
    await loadData();
    if (studentId && courseId) searchEnrollments();
  };

  return (
    <div>
      {selectingTutor ? (
        <AdminTutorCalendar
          selectedSlot={selectedSlot}
          handleSelectedTutor={handleSelectedTutor}
          enrollmentId={enrollmentId}
        />
      ) : (
        <TutorDashboardLayout
          rightColumnContent={
            selectedBooking ? (
              appointmentInfo && (
                <div
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    padding: "12px",
                    marginTop: "16px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div className="admin-calendar__course-info-header">
                    Appointment
                  </div>
                  <div className="admin-calendar__course-info-body">
                    <img src={timeIcon} alt="time icon" />
                    {selectedBooking.start.toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                    {" -"}
                    <br />
                    {selectedBooking.end.toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}{" "}
                    (
                    {differenceInHours(
                      selectedBooking.end,
                      selectedBooking.start
                    )}{" "}
                    hour
                    {differenceInHours(
                      selectedBooking.end,
                      selectedBooking.start
                    ) > 1 && "s"}
                    )
                  </div>
                  <div className="admin-calendar__course-info-body">
                    <img src={studentIcon} alt="student icon" />
                    {appointmentInfo.student}
                  </div>
                  <div className="admin-calendar__course-info-body">
                    <img src={tutorIcon} alt="tutor icon" width={24} />
                    {editting ? (
                      <Select
                        options={availableTutors}
                        className="admin-calendar__tutor-select"
                        onChange={(e) => {
                          setChangeNewTutor(e);
                        }}
                      />
                    ) : changeNewTutor ? (
                      changeNewTutor.label
                    ) : (
                      appointmentInfo.tutor
                    )}
                  </div>
                  <div className="admin-calendar__course-info-body">
                    <img src={courseIcon} alt="course icon" width={24} />
                    {selectedBooking.title}
                  </div>
                  <div className="admin-calendar__course-numbers-list">
                    {[...Array(5)].map((x, index) => (
                      <div
                        className="admin-calendar__course-number"
                        style={
                          index < appointmentInfo.class
                            ? { backgroundColor: "#103da2" }
                            : { backgroundColor: "#B3DEFC" }
                        }
                      ></div>
                    ))}
                  </div>
                  <div className="admin-calendar__back-container">
                    <div className="admin-calendar__change-appointment-container">
                      <button
                        className="admin-calendar__change"
                        onClick={() => {
                          editting && setChangeNewTutor(null);
                          console.log("Start date " ,startDate.toISOString().split("T")[0])
                          setEditting(!editting);
                        }}
                      >
                        <img src={editIcon} alt="edit" width={18} />
                        <span>{editting ? "Stop Edit" : "Edit"}</span>
                      </button>
                      {editting ? (
                        <button
                          className="admin-calendar__change"
                          onClick={() => {
                            changeTutor(selectedBooking);
                            setEditting(false);
                          }}
                        >
                          <img src={saveIcon} alt="delete" width={20} />
                          <span>Save</span>
                        </button>
                      ) : (
                        <button
                          className="admin-calendar__change"
                          onClick={() => {
                            deleteEvent(selectedBooking);
                            setSelectedBooking(null);
                            setEditting(false);
                          }}
                        >
                          <img src={trashIcon} alt="delete" width={20} />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>

                    <button
                      className="admin-calendar__back"
                      onClick={() => {
                        setSelectedBooking(null);
                        setEditting(false);
                      }}
                    >
                      <img src={backArrow} width={20} />
                      <span>Back</span>
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "16px",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                <h4 style={{ color: "#333", marginBottom: "10px" }}>
                  Select student
                </h4>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  name="color"
                  value={studentId}
                  onChange={setStudentId}
                  options={students.map((student) => ({
                    value: student._id,
                    label: student._name,
                    guardian: student._guardian,
                  }))}
                  formatOptionLabel={({ label, guardian }) => (
                    <div>
                      <div>{label}</div>
                      <small
                        style={{ fontSize: "0.8em", color: "gray" }}
                      >{`Guardian: ${guardian}`}</small>
                    </div>
                  )}
                />

                <h4
                  style={{
                    color: "#333",
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Select course
                </h4>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  name="color"
                  value={courseId}
                  onChange={setCourseId}
                  options={courses}
                />

                <input
                  type="submit"
                  value="Search Enrollments"
                  onClick={searchEnrollments}
                  style={{
                    display: "block",
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                />
                {bookingError && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "10px",
                      backgroundColor: "#DC3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {bookingError}
                  </div>
                )}
                {bookings && (
                  <div>
                    <h2 style={{ color: "#333", marginTop: "30px" }}>
                      Bookings
                    </h2>
                    <table
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        textAlign: "left",
                        borderCollapse: "collapse",
                        fontFamily: "Arial, sans-serif",
                        border: "1px solid #ddd",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <tbody key={lessons}>
                        {lessons.map((appointment, index) => (
                          <tr
                            key={index}
                            style={{
                              borderBottom: "1px solid #ddd",
                            }}
                          >
                            <td
                              style={{
                                padding: "10px",
                                fontSize: "16px",
                                color: "#333",
                              }}
                            >
                              {new Date(appointment.start).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "2-digit" }
                              )}{" "}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                fontSize: "16px",
                                color: "#333",
                              }}
                            >
                              {appointment.time}
                            </td>
                            <td
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <button
                                style={{
                                  border: "none",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontFamily: "Arial, sans-serif",
                                  fontSize: "16px",
                                  padding: "5px 10px",
                                }}
                                onClick={() => deleteEvent(appointment)}
                              >
                                ❌
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {lessons.length < 5 ? (
                      <div style={{ marginTop: "8px", color: "green" }}>
                        Select a time and book a lesson!
                      </div>
                    ) : (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        Warning: you have over 5 bookings
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          }
        >
          <div className="calendar-container">
            {isLoaded && (
              <Calendar
                key={eventsData + openSlots}
                views={["week"]}
                selectable
                localizer={localizer}
                defaultDate={startDate}
                defaultView="week"
                components={{ event: EventComponent }}
                events={eventsData}
                min={new Date(2020, 1, 0, 7, 0, 0)}
                max={new Date(2020, 1, 0, 19, 0, 0)}
                style={{ height: "75vh", width: "90vw" }}
                onSelectEvent={editEvent}
                onSelectSlot={handleSelect}
                slotPropGetter={slotPropGetter}
                onNavigate={(date) => {
                  setSelectedSlot(null);
                  setStartDate(startOfWeek(date));
                }}
              />
            )}
          </div>
        </TutorDashboardLayout>
      )}
    </div>
  );
}
