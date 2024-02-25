import Header from "../Header";
import Banner from "../Banner";
import { NavLink } from "react-router-dom";
import ProfilePic from "../../assets/parentProfile.png"

import "./index.css"; 


export const TutorDashboardLayout = ({ name, rightColumnContent, ...props }) => {
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
      </ul>} />
      <Banner
        smallText={props.smallText || "Tutor Dashboard"}
        mainText={`Welcome ${displayName}!`}
        smallTextBelow={`Start date: July 20th, 2023${'\u00A0'.repeat(5)}End Date: July 20th, 2023`} //todo connect
      />
      <div class="main-row">
        <div class="column left">
          <div class="left-header">
                <img className="profile-pic"
                    src={ProfilePic} />
                <p>Jasmine May</p>
            </div>
            
            <div className="table-of-contents">
                <ul>
                    <li><a href="/parentDash">Dashboard</a></li>
                    <li><a href="/shop">Schedule</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Help</a></li>
                    <li>
                      <a href="#" onClick={toggleCoursesDropdown}>Courses</a>
                      <ul className="courses-sublinks">
                        <li><a href="#">Advanced Java</a></li>
                        <li><a href="#">Beginner Java</a></li>
                      </ul>
                    </li>
                </ul>


            </div>
        </div>

        <div class={rightColumnContent ? "column middle" : "column right-middle"}>{props.children}</div>

        {rightColumnContent && (
          <div class="column right">{rightColumnContent}</div>
        )}
      </div>
    </div>
  );
};
