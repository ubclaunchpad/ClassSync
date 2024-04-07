import { NavLink } from "react-router-dom";
import React, { useState } from 'react';

import TutorDashCal from "../../components/TutorDashCal";
import TutorAnalytics from "../../components/tutorAnalytics";
import Curriculum from "../Curriculum";

import "./index.css"; 


export const TutorDashboard = ({ name, ...props }) => {
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
          <div className="nav-banner">
            {/* Dashboard link */}
            <a href="#" onClick={() => handleNavLinkClick("Dashboard")} className={activeLink === "Dashboard" ? "active" : ""}>Dashboard</a>
            {/* Schedule link */}
            <a href="#" onClick={() => handleNavLinkClick("Schedule")} className={activeLink === "Schedule" ? "active" : ""}>Schedule</a>
            {/* Curriculum link */}
            <a href="#" onClick={() => handleNavLinkClick("Curriculum")} className={activeLink === "Curriculum" ? "active" : ""}>Curriculum</a>
          </div>
          <div className="tutor-content-container">
            {activeLink === "Dashboard" && <TutorAnalytics />}
            {activeLink === "Schedule" && <TutorDashCal />}
            {activeLink === "Curriculum" && <Curriculum />}
          </div>
      </div>
  );
};

export default TutorDashboard;