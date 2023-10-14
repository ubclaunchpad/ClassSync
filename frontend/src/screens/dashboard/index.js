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
    </div>
  );
}
