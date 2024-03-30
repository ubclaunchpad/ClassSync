import React from 'react';
import ProfilePic from "../../assets/parentProfile.png"

const Sidebar = ({ toggleCoursesDropdown, role }) => (
    <div className="column left">
        <div className="left-header">
            <img className="profile-pic" src={ProfilePic} alt="Profile" />
            <p>Jasmin May</p>
        </div>

        <div className="table-of-contents">
            <ul>
                
            {role === 'guardian' && (
                <>
                    <li><a href="/parentDash">Dashboard</a></li>
                    <li>
                    <a href="#" onClick={toggleCoursesDropdown}>Children</a>
                    <ul className="courses-sublinks">
                        <li><a href="#">Kat B.</a></li>
                        <li><a href="#">Sue Lee</a></li>
                    </ul>
                </li>
                    <li><a href="/shop">Courses</a></li>
                    <li><a href="/shop">Tutors</a></li>
                    <li><a href="/shop">Help</a></li>
                </>
            )}


                {role === 'tutor' && (
                    <>
                        <li><a href="/parentDash">Dashboard</a></li>
                        <li><a href="/shop">Profile</a></li>
                        <li>
                    <a href="#" onClick={toggleCoursesDropdown}>Courses</a>
                    <ul className="courses-sublinks">
                        <li><a href="#">Advanced Java</a></li>
                        <li><a href="#">Beginner Java</a></li>
                    </ul>
                </li>                        <li><a href="/shop">Availability</a></li>
                        <li><a href="/shop">Appointments</a></li>
                    </>
                )}


                {role === 'admin' && (
                    <>
                        <li><a href="/parentDash">Dashboard</a></li>                
                        <li><a href="/shop">Curriculum</a></li>
                        <li><a href="/shop">Courses</a></li>
                        <li><a href="/shop">Tutors</a></li>
                        <li><a href="/shop">Registrations</a></li>
                        <li><a href="/shop">Change Logs</a></li>
                    </>
                )}








                


                {/* <li><a href="#">Settings</a></li>
                <li><a href="#">Help</a></li> */}
                {/* <li>
                    <a href="#" onClick={toggleCoursesDropdown}>Courses</a>
                    <ul className="courses-sublinks">
                        <li><a href="#">Advanced Java</a></li>
                        <li><a href="#">Beginner Java</a></li>
                    </ul>
                </li> */}
            </ul>
        </div>
    </div>
);

export default Sidebar;