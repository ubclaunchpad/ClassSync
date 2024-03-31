import React from 'react';
import ProfilePic from "../../assets/parentProfile.png"
import "./index.css";


const Sidebar = ({ toggleCoursesDropdown, user }) => {

    return (
        <div className="column left">
        <div className="left-header">
            <img className="profile-pic" src={user.picture} alt="Profile" />
            <p>{user.name}</p>
        </div>

        <div className="table-of-contents">
            <ul>
                
            {user.role === 'guardian' && (
                <>
                    <li><a href="/parentDash">Dashboard</a></li>
                    <li>
                    <a href="#" onClick={toggleCoursesDropdown}>Children</a>
                    <ul className="courses-sublinks">
                        {user.children.map((child) => (
                            <li key={child.student_id}>
                                <a href={`/student/${child.student_id}`}>{child.name}</a>
                            </li>
                        ))}
                    </ul>
                </li>
                    <li><a href="/shop">Courses</a></li>
                    <li><a href="/alltutors">Tutors</a></li>
                    <li><a href="/help">Help</a></li>
                </>
            )}


                {user.role === 'tutor' && (
                    <>
                        <li><a href="/tutor">Dashboard</a></li>
                        <li><a href="/tutorprofile">Profile</a></li>
                        <li>
                    <a href="#" onClick={toggleCoursesDropdown}>Courses</a>
                    <ul className="courses-sublinks">
                        {user.courses.map((course) => (
                            <li key={course.course_id}>
                                <a href={`/course/${course.course_id}`}>{course.name}</a>
                            </li>
                        ))}
                    </ul>
                </li>                        <li><a href="/tutor/availability/recurring">Availability</a></li>
                        <li><a href="/tutor/appointments">Appointments</a></li>
                    </>
                )}


                {user.role === 'admin' && (
                    <>
                        <li><a href="/">Dashboard</a></li>                
                        <li><a href="/curriculum">Curriculum</a></li>
                        <li><a href="/courses">Courses</a></li>
                        <li><a href="/tutors">Tutors</a></li>
                        <li><a href="/registrations">Registrations</a></li>
                        <li><a href="/logs">Change Logs</a></li>
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
)};

export default Sidebar;