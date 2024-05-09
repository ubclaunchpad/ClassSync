import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../BookingModal";
import "./index.css";
import { MainContentLayout } from "../MainContentLayout";
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

const URL = process.env.REACT_APP_API_URL
export default function AdminCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startDate, setStartDate] = useState(startOfWeek(new Date()));
  const [isLoaded, setIsLoaded] = useState(false);
  const [openSlots, setOpenSlots] = useState({});
  const [title, setTitle] = useState("");
  const [students, setStudents] = useState([]);
  const [bookingError, setBookingError] = useState(null);
  const [tutorIDs, setTutorIDS] = useState({})

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
  const [availabilityHashmap, setAvailabilityHashmap] = useState({});
  const [availablePeople, setAvailablePeople] = useState([])
  const [bookingChange, setBookingChange] = useState(0)

  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);
  const loadData = async () => {


    try {

      let url = URL + `/appointments/all?date=${startDate.toISOString().split("T")[0]}`;
      const appointmentsResponse = await fetch(url);
      const appointmentsData = await appointmentsResponse.json();
      console.log("Appt ", appointmentsData)

      url = URL + "/student";
      const studentsResponse = await fetch(url);
      const studentsData = await studentsResponse.json();
      setStudents(studentsData);

      url = URL + "/tutor/offerings";
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
          course_id: booking.course_id,
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


  const handleSelect = ({ start }) => {
    setBookingError(null); // Clear the error when selecting a new slot
    const end = moment(start).add(1, "hour").toDate();


    // Convert the start date to the format used in availableSlotsByDay.
    const startTime = moment(start).format("HH:mm");
    const nextTimeSlot = moment(start).add(30, "minutes").format("HH:mm");

    // Get the day of the week of the start date.
    const dayOfWeek = moment(start).day();

    // Get difference between start day and current day to create constraint. 
    const currentDate = new Date();
    const diffTime = start - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // setTutorIDS(tutorIDs)
    //     const filteredTutorIdNameMap = tutorIDs.forEach([key, value] => {

    // })
    // console.log(filteredTutorIdNameMap)
    const overlaps = eventsData.some(event =>
      (start < event.end && end > event.start)
    );
    // Check if the start time and the next time slot are in the array for the day of the week.
    const isSlotAvailable = openSlots[dayOfWeek] && openSlots[dayOfWeek].includes(startTime) && !overlaps && diffDays >= 7;

    if (isSlotAvailable) {
      setSelectedSlot({ start, end });

      const ids = availabilityHashmap[dayOfWeek][startTime];


      const selected = tutorIDs.filter(item => ids.includes(Number(item.value)));
      setAvailableTutors(selected)
    } else {
      setSelectedSlot(null);
      console.log("This slot is not available.");
    }
  };

  const fetchAppointmentInfo = async (id) => {
    try {
      const response = await fetch(URL + `/booking?id=${id}`);
      const appointmentData = await response.json();
      console.log("Appointment info ", appointmentData)
      setAppointmentInfo(appointmentData);
    } catch {
      console.log("cannot get appointment info");
    }
  };

  useEffect(() => {
    // This code will run whenever `startDate` changes
    console.log("Start date is ", eventsData)
    if (enrollmentId === null) {
      console.log("In here 1")
      setIsLoaded(false);

      loadData();
    } else {
      console.log("In here 2")
    }
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
  const handleSelectSlot = ({ start }) => {
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


    // setCourseId(event.course_id)
    fetchAppointmentInfo(event.id);

    getAvailableTutors(event, 0);
    setSelectedBooking(event);
  };

  const getAvailableTutors = async (event, newBooking) => {
    const selectedTime = event.start
      .toTimeString()
      .split(" ")[0]
      .substring(0, 5);
    const thirtyMinsLater = new Date(event.start.getTime() + 30 * 60000)
      .toTimeString()
      .split(" ")[0]
      .substring(0, 5);
    const times = [selectedTime, thirtyMinsLater];
    console.log("Event is ", event)
    console.log(courses)

    console.log(event.title);




    console.log("Course id is ", courseId)

    let cId;
    if (newBooking === 1) {
      cId = courseId.value
    } else {
      cId = event.course_id
    }
    // API call for tutor availability
    let response = await fetch(
      URL + `/tutor/courses?course_id=${cId}`
    );
    const data = await response.json();
    console.log(data)
    const ids = data.map(item => item.tutor_id);
    console.log("ids are ", ids)

    response = await fetch(URL + `/tutor/time?start_date=${startDate.toISOString().split('T')[0]}&tutor_ids=${ids}&day=${event.start.getDay()}&time1=${times[0]}&time2=${times[1]}`);
    const respData = await response.json()

    console.log("response is ", respData)


    const tutorsOptions = respData.map((course) => ({
      value: course.tutor_id,
      label: course.tutor_name,
      image: course.tutor_picture
    }));

    console.log("Available Tutors ", tutorsOptions)
    setAvailableTutors(tutorsOptions);
  };

  const changeTutor = async (event) => {
    console.log(event);
    // await deleteEvent(event);
    try {
      console.log('selectedBooking:', selectedBooking);
      console.log('changeNewTutor:', changeNewTutor);
      console.log('event:', event);

      await fetch(URL + "/availability", {
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

      console.log("Adding for ", event.tutor_id)
      console.log("Removing for ", changeNewTutor.value)


      let body = JSON.stringify({
        tutor_id: event.tutor_id,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endOfWeek(startDate).toISOString().split('T')[0],
        day: event.start.getDay(),
        times: times
      });

      console.log("Body is ", body)

      let URL = URL + "/availability/add"

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

      let url = URL + "/availability/remove"
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);

      let url = URL + `/appointments/student/${studentId.value}`;
      const appointmentsResponse = await fetch(url);
      const appointmentsData = await appointmentsResponse.json();
      console.log("Appt ", appointmentsData);

      let appts = [];
      appointmentsData.forEach((booking) => {
        const end = moment(booking.start)
          .add(booking.duration, "minute")
          .toDate();

        appts.push({
          start: new Date(booking.start),
          end: end,
          title: booking.title,
          id: booking.booking,
          tutor_id: booking.tutor,
          enrollment_id: booking.enrollment,
          course_id: booking.course_id,
        });
      });

      setEventsData(appts);
      setIsLoaded(true);
    };

    if (enrollmentId !== null) {
      fetchData();



    }
  }, [enrollmentId]);

  useEffect(() => {
    const getAvailabilities = async () => {
      let url = URL + `/tutor/enrollment?course_id=${enrollmentId}`

      const tutors = await fetch(url);
      const tutorsData = await tutors.json();
      const tutorsOptions = tutorsData.map(course => ({
        value: course.tutor_id,
        label: course.tutor_name
      }));


      // setFilterOptions(tutorsOptions)

      // let tutorIds = selectedTutors.map(tutor => tutor.value).join(',');
      // if (tutorIds === "") {
      const tutorIds = tutorsOptions.map(option => option.value).join(',');
      // }
      console.log("Tutor ids ", tutorsData);

      url = URL + `/tutor/select?start_date=${startDate.toISOString().split('T')[0]}&tutor_ids=${tutorIds}`;
      console.log("URL is ", url)
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        let openSlots = {}
        Object.entries(data.availabilityHashmap).forEach(([day, slots]) => {
          openSlots[day] = Object.keys(slots);
        });
        const tutorOptions = Object.entries(data.tutorIdNameMap).map(([value, label]) => ({ value, label }));
        setTutorIDS(tutorOptions)
        setAvailabilityHashmap(data.availabilityHashmap);



        setOpenSlots(openSlots)
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (enrollmentId !== null) {
      getAvailabilities();
    }
  }, [enrollmentId, startDate, bookingChange]);
  const deleteEvent = async (event) => {

    console.log(event);
    const response = await fetch(
      URL + `/availability/booking?id=${event.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("Deleted booking");
      setEventsData(eventsData.filter(e => e.id !== event.id));
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
        tutor_id: event.tutor_id,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endOfWeek(startDate).toISOString().split("T")[0],
        day: event.start.getDay(),
        times: times,
      });

      console.log("Body is ", body);

      let url = URL + "/availability/add";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (response.ok) {
        console.log("Added availability");
        // loadData();
        if (studentId && courseId) searchEnrollments();
        setBookingChange(bookingChange + 1)
      } else {
        console.log("Error adding availability");
      }
    } else {
      setBookingError("Failed to delete session");
    }
  };

  const handleBook = async (id) => {
    if (selectedSlot) {
      const response = await fetch(URL + "/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            enrollment_id: enrollmentId,
            tutor_id: id.value,
            session_duration: 60,
            start_time: selectedSlot.start,
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
            start: selectedSlot.start,
            end: new Date(selectedSlot.start.getTime() + 60 * 60000), // Add 60 minutes
            title: title,
            id: data,
            tutor_id: id.value,
          },
        ]);

        const selectedTime = selectedSlot.start
          .toTimeString()
          .split(" ")[0]
          .substring(0, 5);
        const thirtyMinsLater = new Date(
          selectedSlot.start.getTime() + 30 * 60000
        )
          .toTimeString()
          .split(" ")[0]
          .substring(0, 5);
        const times = [selectedTime, thirtyMinsLater];

        let body = JSON.stringify({
          tutor_id: id.value,
          start_date: startDate.toISOString().split("T")[0],
          end_date: endOfWeek(startDate).toISOString().split("T")[0],
          day: selectedSlot.start.getDay(),
          times: times,
        });

        let url = URL + "/availability/remove";
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        });

        if (response.ok) {
          console.log("Removed availability");
          setSelectingTutor(false)
          // await loadData();
          // await searchEnrollments();
          setBookingChange(bookingChange + 1)
        } else {
          console.log("Error removing availability");
        }

        console.log("Body is ", body);

        console.log("Events Data is ", eventsData);
        handleSelectedTutor();
      } else {
        console.log("Error adding booking");
        setBookingError(
          "Booking failed: You have exceeded the maximum limit of 5 bookings."
        );
        console.log(data);
      }
    }
    setSelectedSlot(null);
  };

  const slotPropGetter = (date) => {
    const dayOfWeek = moment(date).day(); // 0 for Sunday, 1 for Monday, etc.
    const timeFormat = "HH:mm";
    const currentTimeSlot = moment(date).format(timeFormat);

    const prevTimeSlot = moment(currentTimeSlot, "HH:mm").subtract(30, 'minutes').format("HH:mm");
    const currentDate = new Date();
    const diffTime = date - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (selectedSlot) {
      const selectedSlotStart = moment(selectedSlot.start, timeFormat);
      const selectedSlotDay = moment(selectedSlot.start).day();
      const selectedSlotStartPlus30 = selectedSlotStart.clone().add(30, 'minutes').format(timeFormat);

      if ((currentTimeSlot === selectedSlotStart.format(timeFormat) || currentTimeSlot === selectedSlotStartPlus30) && dayOfWeek === selectedSlotDay) {
        return {
          className: "active",
        };
      }
    }

    if (openSlots[dayOfWeek] && diffDays >= 7 && (openSlots[dayOfWeek].includes(currentTimeSlot) || openSlots[dayOfWeek].includes(prevTimeSlot))) {
      return {
        className: "available",
      };
    } else {
      return {
        className: "unavailable"
      }
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
    setTitle(courseId.label)
    let url = URL + `/bookings?student_id=${studentId.value}&course_id=${courseId.value}`;
    console.log("URL is ", url);
    const response = await fetch(url);
    const bookingsResponse = await response.json();

    let id = localStorage.getItem("userId");
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
          readOnly: false,
          tutor_id: booking.tutor_id,
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

  const clearSearch = () => {
    setStudentId(null)
    setCourseId(null)
    setEnrollmentId(null)
    setOpenSlots({})
    setBookings(false)
    loadData()
  }


  const selectSlot = (event) => {

    const dayOfWeek = moment(event.start).day(); // 0 for Sunday, 1 for Monday, etc.
    const timeFormat = "HH:mm";
    const currentTimeSlot = moment(event.start).format(timeFormat);
    const nextTimeSlot = moment(currentTimeSlot, "HH:mm")
      .add(30, "minutes")
      .format("HH:mm");

    if (
      openSlots[dayOfWeek] &&
      (openSlots[dayOfWeek].includes(currentTimeSlot) &&
        openSlots[dayOfWeek].includes(nextTimeSlot))
    ) {
      setSelectedSlot(event)
      getAvailableTutors(event, 1)
      setSelectingTutor(true)
    }
  }

  const handleSelectedTutor = async () => {
    setSelectingTutor(false);
    // await loadData();
    if (studentId && courseId) searchEnrollments();
  };

  return (
    <>
      {/* {selectingTutor ? (
     <TutorDashboardLayout
     rightColumnContent={  bookingError ? (
      <div style={{ color: "red", marginTop: "10px" }}>{bookingError} 
            <div className="back-enrollment-container">
            <button className="back-enrollment" 
            onClick={()=>{setSelectingTutor(false)
            setBookingError(null)
            }}
            >
              <img src={backArrow} width={20} />
              <span>Back</span>
            </button>
          </div></div>
    ) : (
      selectedSlot != null && (
        <div className="modal-container">
          <Modal
            selectedSlot={selectedSlot.start.toString()}
            availablePeople={availableTutors}
            onBook={handleBook}
            onClose={() => {
              setSelectedSlot(null);
              setBookingError(null); // Clear the error when closing the modal
            }}
          />
          <div className="back-enrollment-container">
            <button className="back-enrollment" 
            onClick={()=>{setSelectingTutor(false)}}
            >
              <img src={backArrow} width={20} />
              <span>Back</span>
            </button>
          </div>
        </div>
      )
    )}
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
           onSelectSlot={(event) => {
            setSelectedSlot(event)
            getAvailableTutors(event)
            setSelectingTutor(true)}}           
            slotPropGetter={slotPropGetter}
           onNavigate={(date) => {
             setSelectedSlot(null);
             setStartDate(startOfWeek(date));
           }}
         />
       )}
     </div>
   </TutorDashboardLayout>
        
      ) : (
        <TutorDashboardLayout key={availableTutors}
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
                  <p
    style={{
      color: "grey",
      marginLeft: "10px",
      cursor: "pointer",
      display: 'flex'
    }}
    onClick={clearSearch}
  >
    Clear Search
  </p>
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
                      <div style={{ color: "orange", marginTop: "8px" }}>
                        Notice: You already have 5 classes booked
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
                onSelectSlot={(event) => {
                  setSelectedSlot(event)

                getAvailableTutors(event)
                setSelectingTutor(true)}}
                slotPropGetter={slotPropGetter}
                onNavigate={(date) => {
                  setSelectedSlot(null);
                  setStartDate(startOfWeek(date));
                }}
              />
            )}
          </div>
        </TutorDashboardLayout>
      )} */}
      <MainContentLayout
        rightColumnContent={
          selectingTutor ? (
            bookingError ? (
              <div style={{ color: "red", marginTop: "10px" }}>{bookingError}

                <div className="back-enrollment-container">
                  <button className="back-enrollment"
                    onClick={() => {
                      setSelectingTutor(false)
                      setBookingError(null)
                    }}
                  >
                    <img src={backArrow} width={20} />
                    <span>Back</span>
                  </button>
                </div></div>
            ) : (
              selectedSlot != null && (
                <div className="modal-container">
                  <Modal
                    selectedSlot={selectedSlot.start.toString()}
                    availablePeople={availableTutors}
                    onBook={handleBook}
                    onClose={() => {
                      setSelectedSlot(null);
                      setBookingError(null); // Clear the error when closing the modal
                    }}
                  />
                  <div className="back-enrollment-container">
                    <button className="back-enrollment"
                      onClick={() => { setSelectingTutor(false) }}
                    >
                      <img src={backArrow} width={20} />
                      <span>Back</span>
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
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
                          console.log("Start date ", startDate.toISOString().split("T")[0])
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
              <div style={{ width: '90%', backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '20px', margin: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>

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
                <p
                  style={{
                    color: "grey",
                    marginLeft: "10px",
                    cursor: "pointer",
                    display: 'flex'
                  }}
                  onClick={clearSearch}
                >
                  Clear Search
                </p>
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
                      <div style={{ color: "orange", marginTop: "8px" }}>
                        Notice: You already have 5 classes booked
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          )
        }>
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
              onSelectSlot={selectSlot}
              slotPropGetter={slotPropGetter}
              onNavigate={(date) => {
                setSelectedSlot(null);
                setStartDate(startOfWeek(date));
              }}
            />
          )}
        </div>
      </MainContentLayout>

    </>
  );
}
