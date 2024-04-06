import Header from "../Header";
import Banner from "../Banner";
import { NavLink } from "react-router-dom";
import ProfilePic from "../../assets/parentProfile.png"
import React, {useState} from 'react'
import Sidebar from '../Sidebar';

import "./index.css"; 


export const MainContentLayout = ({ name, rightColumnContent, ...props }) => {

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
<>

        <div class={ "column middle"}>{props.children}</div>

        {rightColumnContent && (
          <div class="column right">{rightColumnContent}</div>
        )}
        </>
  );
};
