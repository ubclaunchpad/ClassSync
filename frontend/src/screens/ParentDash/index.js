import "./index.css";
import ParentDashCalendar from "../../components/ParentDashCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { useState, useEffect } from "react";
import { ParentDashboardLayout } from "../../components/ParentDashboardLayout";
import { useNavigate } from "react-router-dom";


const ParentDash = (props) => {
  const navigate = useNavigate();
  const[students, setStudents] = useState([]);

  const handleTileClick = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const fetchStudents = async () => {
    const url = `http://localhost:8080/guardian/students`;
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStudents(data); 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }


  useEffect(() => {
    fetchStudents();
  }, [])


  return (
    <ParentDashboardLayout>
      <div className="student-info-container">
        <div className="student-info-header">
          <h2>Student</h2>
          <button class="header-button">
            <a href="/addStudent" class="header-button">Add a New Student</a>
          </button>
        </div>
        <div className="existing-students-row">
          {
            students.map((student) => {
              const tileColorClass = `student-tile ${student.color}-tile`;
              return (
                <div className={tileColorClass} onClick={() => handleTileClick(student.student_id)}>
                  <div className="rectangle"></div>
                  <div className="name">{student.name}</div>
              </div>
              )
            })
          }
          </div>
      </div>
      <div className="student-info-container">
        <ParentDashCalendar students={students}></ParentDashCalendar>
        </div>
      
    </ParentDashboardLayout>
  );
};

export default ParentDash;