import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';

const TutorDashCal = ({ bookings }) => {
  moment.locale('en-GB');

  const navigate = useNavigate();

  const localizer = momentLocalizer(moment);
  const [eventsData, setEventsData] = useState([]);


  const fetchBookings = async () => {
    try {
      // const tutorId = localStorage.getItem('userID');
      const events = bookings.map(booking => ({
        start: moment(booking.start_time).toDate(),
        end: moment(booking.start_time)
          .add(booking.session_duration, 'minute')
          .toDate(),
        title: booking.title,
        color: booking.color,
        bookingId: booking.booking_id,
        link: booking.link
      }));
      setEventsData(events);

    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };


  useEffect(() => {
    fetchBookings();
  }, [bookings]);


  const handleSelectEvent = event => {
    // Assuming event.start and event.end are date-time strings
    const start = new Date(event.start);
    const end = new Date(event.end);

    // Calculate difference in milliseconds and convert to minutes
    const differenceInMinutes = (end - start) / 60000;

    if (differenceInMinutes === 60) {
      navigate(`/class/${event.bookingId}`);
    } else {
      window.location.href = event.link;

    }

  };

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        min={new Date(2020, 1, 0, 7, 0, 0)}
        max={new Date(2020, 1, 0, 19, 0, 0)}
        eventPropGetter={event => {
          const backgroundColor = event.color;
          return { style: { backgroundColor } };
        }}
        onSelectEvent={event => handleSelectEvent(event)}
      />
    </div>
  );
};

export default TutorDashCal;