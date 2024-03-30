import Header from "../Header";
import Banner from "../Banner";
import { NavLink } from "react-router-dom";
import ProfilePic from "../../assets/parentProfile.png"
import React, {useState} from 'react'
import Sidebar from '../Sidebar';

import "./index.css"; 
import LogModal from "../LogModal";


export const TutorDashboardLayout = ({ name, rightColumnContent, ...props }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  let displayName = name !== undefined ? " Back, " + name : "";

    // Function to toggle the visibility of the Courses sublinks
    const toggleCoursesDropdown = () => {
      const coursesSublinks = document.querySelector(".courses-sublinks");
      coursesSublinks.style.display = coursesSublinks.style.display === "block" ? "none" : "block";
    }; 

  return (

    <div className="page-container">
      <Header nav={< ul className="navbar">
        <li><NavLink to="">Dashboard</NavLink></li>
        <li><NavLink to="/tutorProfile">Profile</NavLink></li>
        <li><NavLink to="/tutor/availability/recurring">Availability</NavLink></li>
        <li><NavLink to="/schedule/12-31-2023">Schedule</NavLink></li>
        <li><NavLink to="/tutor/appointments">Appointments</NavLink></li>
        <li>
          <NavLink 
            to="#" 
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
          >
            Open Log
          </NavLink>
        </li>
        <LogModal isOpen={modalOpen} onRequestClose={handleCloseModal} />
      </ul>} />
      <Banner
        smallText={props.smallText || "Tutor Dashboard"}
        mainText={`Welcome ${displayName}!`}
        smallTextBelow={`Start date: July 20th, 2023${'\u00A0'.repeat(5)}End Date: July 20th, 2023`} //todo connect
      />
      <div class="main-tutor-row">
      <Sidebar toggleCoursesDropdown={toggleCoursesDropdown} role='guardian' />

        <div class={rightColumnContent ? "column middle" : "column right-middle"}>{props.children}</div>

        {rightColumnContent && (
          <div class="column right">{rightColumnContent}</div>
        )}
      </div>
    </div>
  );
};
