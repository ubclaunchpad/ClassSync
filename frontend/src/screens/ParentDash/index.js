import "./index.css";
import ParentDashCalendar from "../../components/ParentDashCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { useState, useEffect } from "react";
import { ParentDashboardLayout } from "../../components/ParentDashboardLayout";
import { useNavigate } from "react-router-dom";
import { MainContentLayout } from "../../components/MainContentLayout";
import { NavLink } from 'react-router-dom';



const ParentDash = (props) => {
  const navigate = useNavigate();
  const[students, setStudents] = useState([]);


  const handleTileClick = async (studentId) => {
      const url = `http://localhost:8080/student/${studentId}/courses`;
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
        if (data.length == 0) {
          navigate(`/shop`);
        } else {
          navigate(`/student/${studentId}`);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
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
    <MainContentLayout>
      <div className="student-info-container">
        <div className="student-info-header">
          <h2>Student</h2>
          <button class="header-button">

<NavLink to="/addStudent" className="header-button">Add a New Student</NavLink>          </button>
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
      
    </MainContentLayout>
  );
};

export default ParentDash;