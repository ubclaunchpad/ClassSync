import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { useState, useEffect } from "react";
import TutorDashCal from "../TutorDashCal";
import { useNavigate } from "react-router-dom";



const URL = process.env.REACT_APP_API_URL

const TutorDashSchedule = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const tutorId = localStorage.getItem('userID');
      const url = URL + `/availability/bookings/${tutorId}`;
      const response = await fetch(url);
      if (response.ok) {
        const bookings = await response.json();
        console.log("Bookings are ", bookings)
        setBookings(bookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const filterUpcomingBookings = bookings => {
    const now = new Date();
    const upcoming = bookings
      .filter(booking => new Date(booking.start_time) > now)
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
      .slice(0, 3); // Select the first five upcoming bookings
    setFilteredBookings(upcoming);
    console.log("upcoming", upcoming);
    console.log("filtered bookings", filteredBookings);
  };

  const handleTileClick = (booking) => {
    if (booking.session_duration === 60) {

      navigate(`/class/${booking.booking_id}`);
    } else {
      window.location.href = booking.link;

    }
  };



  useEffect(() => {
    fetchBookings();
  }, [])

  useEffect(() => {
    filterUpcomingBookings(bookings);
  }, [bookings])


  return (
    <div>
      <div className="student-info-container">
        <TutorDashCal bookings={bookings}></TutorDashCal>
      </div>
      <div className="student-info-container">
        <div className="upcoming-classes"><h2>Upcoming Classes</h2></div>
        <div className="existing-students-row">
          {filteredBookings.map((booking) => {
            console.log(booking.color);
            const tileStyle = { backgroundColor: booking.color };
            return (
              <div style={tileStyle} className={"course-tile"} onClick={() => handleTileClick(booking)}>
                <div className="rectangle"></div>
                <div className="name">
                  {booking.title}
                  <div className="student-name">{booking.f_name} {booking.l_name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default TutorDashSchedule;



