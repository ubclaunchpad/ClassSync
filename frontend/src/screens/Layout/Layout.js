import React from 'react';
import Sidebar from '../../components/Sidebar';
import Banner from '../../components/Banner';
import "./index.css";
import Header from '../../components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from '../signup';
import { useAuth } from '../../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink, useNavigate } from "react-router-dom";


const Layout = ({ children }) => {
  // const { name } = location.state;
  const { user, logout } = useAuth()
  const toggleCoursesDropdown = () => {
    const coursesSublinks = document.querySelector(".courses-sublinks");
    coursesSublinks.style.display = coursesSublinks.style.display === "block" ? "none" : "block";
  };

  const navigate = useNavigate();

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

  return (
    <div className="page-container">
      <Header />
      {user ? <Banner role='guardian' user={user} /> : <Banner />}

      {/* <Banner
          smallText={ "Tutor Dashboard"}
          mainText={`Welcome ${user && user.name}!`}
          smallTextBelow={`Start date: July 20th, 2023${'\u00A0'.repeat(5)}End Date: July 20th, 2023`} //todo connect
        /> */}
      <div class="main-tutor-row">
        {user && <Sidebar toggleCoursesDropdown={toggleCoursesDropdown} class="sidenav" />}
        {children}


      </div>
      <div className="bottom-bar mb" style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw' }}>
        <a href="/parentDash" className="bottom-bar-link"> <DashboardIcon />Dashboard</a>
        <a href="/shop" className="bottom-bar-link"> <MenuBookIcon />Courses</a>
        <a href="/alltutors" className="bottom-bar-link"><PersonSearchIcon />Tutors</a>
        <a href="/help" className="bottom-bar-link"><HelpIcon />Help</a>
        <a href="/help" className="bottom-bar-link" onClick={LogOut}><LogoutIcon />Log Out</a>


      </div>

    </div>
  );
};

export default Layout;