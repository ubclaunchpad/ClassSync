import React from 'react';
import ProfilePic from "../../assets/parentProfile.png"
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import "./index.css";
import { useAuth } from '../../contexts/AuthContext';


const Sidebar = ({ toggleCoursesDropdown }) => {

    const { user } = useAuth()

    const [isOpen, setIsOpen] = React.useState(true);
    return (
        <div className="column left" style={{
            backgroundColor: isOpen ? '#103DA2' : 'initial',
            transition: 'background-color 0.5s ease, transform 0.5s ease'
        }}>


            <button
                style={{
                    position: 'absolute',
                    left: 0,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '24px',
                    padding: '10px'
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <MenuIcon style={{ color: 'white' }} /> : <MenuOpenIcon style={{ color: '#103da2' }} />}
            </button>
            {isOpen && <div className='open'>
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
                                <li><a href="/tutorDash">Dashboard</a></li>
                                <li><a href="/tutorprofile">Profile</a></li>
                                <li>
                                    <a href="/curriculum" onClick={toggleCoursesDropdown}>Courses</a>
                                    <ul className="courses-sublinks">
                                        {user.courses.map((course) => (
                                            <li key={course.course_id}>
                                                <a href={`/course/${course.course_id}`}>{course.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li><a href="/tutor/availability">Availability</a></li>
                                <li><a href="/tutor/appointments">Appointments</a></li>
                                <li><a href="/help">Help</a></li>
                            </>
                        )}

                        {user.role === 'admin' && (
                            <>
                                <li><a href="/adminDash">Dashboard</a></li>
                                <li><a href="/curriculum">Curriculum</a></li>
                                <li><a href="/courses">Courses</a></li>
                                <li><a href="/tutors">Tutors</a></li>
                                <li><a href="/registrations">Registrations</a></li>
                                <li><a href="/admin/appointments">Appointments</a></li>

                                <li><a href="/logs">Change Logs</a></li>
                                <li><a href="/help">Help</a></li>

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
            </div>}
        </div>
    )
};

export default Sidebar;