import Header from "../../components/Header";
import Banner from "../../components/Banner";
import { NavLink } from "react-router-dom";
import React, { useState } from 'react';

import AppointmentCalendar from "../booking";
import TutorCalendar from "../tutorBookings";
import AdminCalendar from "../adminBooking";

import "./index.css"; 


export const TutorDashboard = ({ name, rightColumnContent, ...props }) => {
  let displayName = name !== undefined ? " Back, " + name : "";

    // Function to toggle the visibility of the Courses sublinks
    const toggleCoursesDropdown = () => {
      const coursesSublinks = document.querySelector(".courses-sublinks");
      coursesSublinks.style.display = coursesSublinks.style.display === "block" ? "none" : "block";
    }; 

    const [activeLink, setActiveLink] = useState("Dashboard");
    const handleNavLinkClick = (link) => {
      setActiveLink(link);
    };

  return (
    <div className="page-container">
      <Header/>
      <Banner
        smallText={props.smallText || "Tutor Dashboard"}
        mainText={`Welcome ${displayName}!`}
        smallTextBelow={`Start date: July 20th, 2023${'\u00A0'.repeat(5)}End Date: July 20th, 2023`} //todo connect
      />
      <div class="main-tutor-row">
        <div class="column left">
            
            <div className="table-of-contents">
                <ul>
                    <li><a href="/parentDash">Dashboard</a></li>
                    <li><a href="/shop">Schedule</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Help</a></li>
                    <li>
                      <a href="#" onClick={toggleCoursesDropdown}>Courses</a>
                      <ul className="courses-sublinks">
                        <li><a href="#">Advanced Java</a></li>
                        <li><a href="#">Beginner Java</a></li>
                      </ul>
                    </li>
                </ul>


            </div>
        </div>

        <div className={rightColumnContent ? "column middle" : "column right-middle"}>
          <div className="nav-banner">
            {/* Dashboard link */}
            <a href="#" onClick={() => handleNavLinkClick("Dashboard")} className={activeLink === "Dashboard" ? "active" : ""}>Dashboard</a>
            {/* Schedule link */}
            <a href="#" onClick={() => handleNavLinkClick("Schedule")} className={activeLink === "Schedule" ? "active" : ""}>Schedule</a>
            {/* Curriculum link */}
            <a href="#" onClick={() => handleNavLinkClick("Curriculum")} className={activeLink === "Curriculum" ? "active" : ""}>Curriculum</a>
          </div>
          {/* Render different content based on the active link */}
          {activeLink === "Dashboard" && <AppointmentCalendar />}
          {activeLink === "Schedule" && <TutorCalendar />}
          {activeLink === "Curriculum" && <AdminCalendar />}
        </div>

        {rightColumnContent && (
          <div class="column right">{rightColumnContent}</div>
        )}
      </div>
    </div>
  );
};

export default TutorDashboard;