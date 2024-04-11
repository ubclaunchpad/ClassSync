import React from 'react';
import Sidebar from '../../components/Sidebar';
import Banner from '../../components/Banner';
import "./index.css";
import Header from '../../components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from '../signup';
import { useAuth } from '../../contexts/AuthContext';


const Layout = ({children}) => {
    // const { name } = location.state;
    const {user} = useAuth()
    const toggleCoursesDropdown = () => {
        const coursesSublinks = document.querySelector(".courses-sublinks");
        coursesSublinks.style.display = coursesSublinks.style.display === "block" ? "none" : "block";
      }; 
  

    return (
        <div className="page-container">
        <Header />
    {user ? <Banner role='guardian' user={user}/> : <Banner />}

        {/* <Banner
          smallText={ "Tutor Dashboard"}
          mainText={`Welcome ${user && user.name}!`}
          smallTextBelow={`Start date: July 20th, 2023${'\u00A0'.repeat(5)}End Date: July 20th, 2023`} //todo connect
        /> */}
        <div class="main-tutor-row">
          {user && <Sidebar toggleCoursesDropdown={toggleCoursesDropdown} user={user} />}
        {children}
 
        </div>
      </div>
    );
};

export default Layout;