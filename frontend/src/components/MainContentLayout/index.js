import Header from "../Header";
import Banner from "../Banner";
import { NavLink, useNavigate } from "react-router-dom";
import ProfilePic from "../../assets/parentProfile.png"
import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import HelpIcon from '@mui/icons-material/Help';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import "./index.css";
import { Menu } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '../../contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { width } from "@mui/system";
export const MainContentLayout = ({ name, rightColumnContent, ...props }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const { logout, user } = useAuth()

  const navigate = useNavigate();


  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const LogOut = () => {
    logout()
    if (user && user.role === 'tutor') {
      navigate("/tutor/login")

    } else if (user && user.role === 'admin') {
      navigate("/admin/login")
    } else {
      navigate("/")

    }
  }


  let displayName = name !== undefined ? " Back, " + name : "";

  // Function to toggle the visibility of the Courses sublinks
  const toggleCoursesDropdown = () => {
    const coursesSublinks = document.querySelector(".courses-sublinks");
    coursesSublinks.style.display = coursesSublinks.style.display === "block" ? "none" : "block";
  };

  return (
    <div className="grid-container">
      <div class={"column middle"}>{props.children}</div>

      {rightColumnContent && (
        <div class="column right pc">{rightColumnContent}</div>
      )}


    </div>
  );
};
