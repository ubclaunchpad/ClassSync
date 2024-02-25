import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../BookingModal";
import "./index.css";
import { TutorDashboardLayout } from "../TutorDashboardLayout";
import { endOfWeek, set, startOfWeek } from "date-fns";
import Select from "react-select";
import AdminTutorCalendar from "../AdminTutorCalendar";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
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

  const [forceRender, setForceRerender] = useState(false);

  const loadData = async () => {
    console.log("Loading data for ", startDate.toISOString().split("T")[0]);
    let url = `http://localhost:8080/tutor/availability/schedule?userID=${localStorage.getItem(
      "userID"
    )}&startDate=${startDate.toISOString().split("T")[0]}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log("Failed to fetch data");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const filteredData = {};

      Object.entries(data[0]).forEach(([day, slots]) => {
        slots.sort(); // Ensure the slots are sorted in ascending order
        filteredData[day] = slots.filter((slot, index) => {
          const nextSlot = slots[index + 1];
          if (!nextSlot) return false; // If there's no next slot, exclude the current slot
          const currentSlotHour = parseInt(slot.split(":")[0]);
          const currentSlotMinute = parseInt(slot.split(":")[1]);
          const nextSlotHour = parseInt(nextSlot.split(":")[0]);
          const nextSlotMinute = parseInt(nextSlot.split(":")[1]);
          // If the next slot is within the same hour or the next half hour, include the current slot
          return (
            nextSlotHour === currentSlotHour ||
            (nextSlotHour === currentSlotHour + 1 &&
              nextSlotMinute < currentSlotMinute)
          );
        });
      });

      console.log("Filtered data is ", filteredData);

      setOpenSlots(filteredData);
      url = `http://localhost:8080/appointments?tutor_id=${localStorage.getItem(
        "userID"
      )}&date=${startOfWeek(new Date()).toISOString().split("T")[0]}`;
      const appointmentsResponse = await fetch(url);
      const appointmentsData = await appointmentsResponse.json();

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

      const offeringsResponse = await fetch(
        `http://localhost:8080/tutor/offering?id=${localStorage.getItem(
          "userID"
        )}`
      );
      const offeringsData = await offeringsResponse.json();

      // Filter selectedOptions based on offeringsData
      const filteredOptions = options.filter((option) =>
        offeringsData.includes(option.value)
      );

      setCourses(filteredOptions);

      let appointments = [];
      appointmentsData.forEach((booking) => {
        const end = moment(booking.start)
          .add(booking.duration, "minute")
          .toDate();
        console.log(end);

        appointments.push({
          start: new Date(booking.start),
          end: end,
          title: booking.title,
          id: booking.booking,
          tutor_id: booking.tutor,
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
  useEffect(() => {
    // This code will run whenever `startDate` changes
    console.log("Start date has changed:", startDate);
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

    if (enrollmentId === null) return  
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
      setSelectingTutor(true)
      // if (enrollmentId) handleBook(start, end);
    } else {
      setSelectedSlot(null);
      console.log("This slot is not available.");
    }
  };

  const deleteEvent = async (event) => {
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
      setEventsData(eventsData.filter((item) => item.id !== event.id));

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

  const handleBook = async (start, end) => {
    console.log("Selected Slot is ", selectedSlot);

    const response = await fetch("http://localhost:8080/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        booking: {
          enrollment_id: enrollmentId,
          tutor_id: localStorage.getItem("userID"),
          session_duration: 60,
          start_time: start,
        },
      }),
    });

    const data = await response.json();
    console.log("Success:", data);
    // console.log('Success:', data[0].insert_booking);

    if (response.status === 200) {
      // let events = []
      // const newEvents = data.map(booking => {
      //     const bookingSlot = booking.insert_booking;
      //     console.log("Booking is ", bookingSlot);

      //     const end = moment(bookingSlot[4]).add(bookingSlot[2], "minute").toDate();
      //     console.log(end);

      //     return {
      //         start: new Date(bookingSlot[4]),
      //         end: end,
      //         title: title,
      //     };
      // });
      // console.log("New Events ", newEvents);
      console.log("Events Data ", eventsData);
      // setUpdatedEvents(true)
      setEventsData([
        ...eventsData,
        {
          start: start,
          end: end,
          title: title,
          id: data,
          tutor_id: localStorage.getItem("userID"),
        },
      ]);

      const selectedTime = start.toTimeString().split(" ")[0].substring(0, 5);
      const thirtyMinsLater = new Date(start.getTime() + 30 * 60000)
        .toTimeString()
        .split(" ")[0]
        .substring(0, 5);
      const times = [selectedTime, thirtyMinsLater];

      let body = JSON.stringify({
        tutor_id: localStorage.getItem("userID"),
        start_date: startDate.toISOString().split("T")[0],
        end_date: endOfWeek(startDate).toISOString().split("T")[0],
        day: start.getDay(),
        times: times,
      });

      let url = "http://localhost:8080/availability/remove";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (response.ok) {
        console.log("Removed availability");
        loadData();
        searchEnrollments();
      } else {
        console.log("Error removing availability");
      }

      console.log("Body is ", body);

      console.log("Events Data is ", eventsData);
    } else {
      console.log("Error adding booking");
      setBookingError(
        "Booking failed: You have exceeded the maximum limit of 5 bookings."
      );
      console.log(data);
    }
  };

  // Array of available slots for each day of the week
  const availableSlotsByDay = {
    0: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
    ], // Sunday
    1: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
    ], // Monday
    2: ["09:00", "09:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Tuesday
    3: ["09:00", "09:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Wednesday
    4: ["09:00", "09:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Thursday
    5: ["09:00", "09:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], // Friday
    6: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
    ], // Saturday
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

  const appointments = [
    { date: "2022-03-01", startTime: "10:00", readOnly: false },
    { date: "2022-03-02", startTime: "11:00", readOnly: true },
    { date: "2022-03-03", startTime: "12:00", readOnly: false },
    // Add more appointments as needed
  ];
  const EventComponent = ({ event }) => (
    <div className="rbc-event" style={{ position: "relative" }}>
      <div className="event-content">{event.title}</div>
      <button
        className="delete-button"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ff6347", // Tomato color
          color: "white", // White text
          border: "none", // Remove border
          borderRadius: "5px", // Rounded corners
          padding: "10px 20px", // Padding
          fontSize: "1em", // Text size
          cursor: "pointer", // Cursor style on hover
        }}
        onClick={() => deleteEvent(event)}
      >
        Delete
      </button>
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
   setSelectingTutor(false)
   await loadData()
   if (studentId && courseId) searchEnrollments();

  }

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
            <div
              style={{
                width: "90%",
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                padding: "20px",
                marginRight: "12px",
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
                  <h2 style={{ color: "#333", marginTop: "30px" }}>Bookings</h2>
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
                            {!appointment.readOnly && (
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
                            )}
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
                onSelectEvent={deleteEvent}
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
