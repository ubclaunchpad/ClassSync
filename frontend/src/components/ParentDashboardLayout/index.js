import Header from "../Header";
import Banner from "../Banner";
import ProfilePic from "../../assets/parentProfile.png"
import { NavLink } from "react-router-dom"; 

import "./index.css";

export const ParentDashboardLayout = (props) => { 
    // Function to toggle the visibility of the Children sublinks
    const toggleChildrenDropdown = () => {
        const childrenSublinks = document.querySelector(".children-sublinks");
        childrenSublinks.style.display = childrenSublinks.style.display === "block" ? "none" : "block";
        };

    // Function to toggle the visibility of the Courses sublinks
    const toggleCoursesDropdown = () => {
      const coursesSublinks = document.querySelector(".courses-sublinks");
      coursesSublinks.style.display = coursesSublinks.style.display === "block" ? "none" : "block";
    };

    // Function to toggle the visibility of the Tutor sublinks
    const toggleTutorSublinks = () => {
        const tutorSublinks = document.querySelector(".tutor-sublinks");
        tutorSublinks.style.display = tutorSublinks.style.display === "block" ? "none" : "block";
      };
    return (
        <div className="page-container">
            <Header/>
            <div class="main-row">

                <div class="column left-span">
                    <div class="left-header">
                        <img className="profile-pic"
                            src={ProfilePic} />
                        <p>Adam Bennett</p>
                    </div>
                    
                    <div className="table-of-contents">
                        <ul>
                            <li>
                            <a href="#" onClick={toggleChildrenDropdown}>Children</a>
                            <ul className="children-sublinks">
                                <li><a href="#">Alex Bennett</a></li>
                                <li><a href="#">Laura Bennett</a></li>
                            </ul>
                            </li>
                            <li>
                            <a href="#" onClick={toggleCoursesDropdown}>Courses</a>
                            <ul className="courses-sublinks">
                                <li><a href="#">Java</a></li>
                                <li><a href="#">Python</a></li>
                            </ul>
                            </li>
                            <li>
                            <a href="#" onClick={toggleTutorSublinks}>Tutors</a>
                            <ul className="tutor-sublinks">
                                <li><a href="#">Jasmine May</a></li>
                            </ul>
                            </li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>
                </div>

                <div class="column middle-right">
                    <Banner
                        smallText="Parent Dashboard"
                        mainText="Welcome Back!"
                    />
                    <div className="inner-row">
                        <div className="column inner-left">
                            {props.children}
                        </div>
                        <div className="column inner-right">
                            {props.rightColumnContent}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};