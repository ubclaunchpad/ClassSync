import "./index.css";

import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Student from "../../components/Student";
import { ParentDashboardLayout } from "../../components/ParentDashboardLayout";

import add from "../../assets/add.svg";
import notifyClass from "../../assets/notify-bell.svg";
import shop from "../../assets/shop.svg";

export default function Dashboard() {
  const students = [
    "Alexander Bannet",
    "John Doe",
    "Jane Doe",
    "Random Person",
    "Hi Me",
  ];

  return (
    <div className="screen-container">
      <ParentDashboardLayout>
        <div className="students">
          <div className="students-header">
            <div className="students-title">Students ({})</div>
            <div className="add-student">
              <img src={add} alt="add class" />
              <div className="add-student-text">Add a New Student</div>
            </div>
          </div>
          <div className="all-students">
            {students.map((name) => (
              <Student name={name} />
            ))}
          </div>
        </div>
      </ParentDashboardLayout>
      {/* <div className="main-screen">
        <div className="left-bar">
          <div className="upcoming-classes-header">
            <div className="upcoming-classes-title">Upcoming Classes</div>
            <div className="upcoming-classes-icon-group">
              <div className="upcoming-classes-icon">
                <img src={add} alt="add class" />
              </div>
              <div className="upcoming-classes-icon">
                <img src={notifyClass} alt="notify class" />
              </div>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="students">
            <div className="students-header">
              <div className="students-title">Students ({})</div>
              <div className="add-student">
                <img src={add} alt="add class" />
                <div className="add-student-text">Add a New Student</div>
              </div>
            </div>
            <div className="all-students">
              {students.map((name) => (
                <Student name={name} />
              ))}
            </div>
          </div>
        </div>
        <div className="right-bar">
          <div className="right-bar-section">
            <div className="right-bar-header">
              <div className="right-bar-title">Shop for Courses</div>
              <img src={shop} alt="shop" />
            </div>
            <input type="text" className="course-search" />
          </div>
          <div className="right-bar-section">
            <div className="right-bar-header">
              <div className="right-bar-title">Recommended Courses</div>
            </div>
          </div>
          <div className="right-bar-section">
            <div className="right-bar-header">
              <div className="right-bar-title">Available Tutors</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
