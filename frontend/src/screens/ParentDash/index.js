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
    // const data = [
    //   {
    //     id: 1,
    //     fname: "Alice", 
    //     lname: "Lee",
    //     age: 20,
    //   }, 
    //   {
    //     id: 2,
    //     fname: "Bob", 
    //     lname: "Smith",
    //     age: 22
    //   }, 
    //   {
    //     id: 3,
    //     fname: "Charlie",
    //     lname: "Brown", 
    //     age: 24
    //   }
    // ];
    // setStudents(data);
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
              return (
                <div className="student-tile" onClick={() => handleTileClick(student.id)}>
                  <div className="colour"></div>
                  {student.name}
                </div>
              )
            })
          }
          </div>
      </div>
      <div className="student-info-container">
        <ParentDashCalendar></ParentDashCalendar>
        </div>
      
    </ParentDashboardLayout>
  );
};

export default ParentDash;