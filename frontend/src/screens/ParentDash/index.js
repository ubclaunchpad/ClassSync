import "./index.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { useState, useEffect } from "react";
import { ParentDashboardLayout } from "../../components/ParentDashboardLayout";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import AddReviewForm from '../../components/AddReviewForm';

const localizer = momentLocalizer(moment);
const events = [
    {
        start: moment().toDate(),
        end: moment()
            .add(1, "days")
            .toDate(),
        title: "Some title"
    }
]

const ParentDash = (props) => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [guardian_id, setGuardianId] = useState(-1);

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
            setStudents(data); // Assuming the response is the array of students
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

    const handleReviewClick = (id) => {
        setGuardianId(id)
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <ParentDashboardLayout
            rightColumnContent={
                <div style={{ textAlign: "left", marginTop: "20px", marginRight: "15px" }}>
                    <button style={{
                        padding: "10px",
                        backgroundColor: "#007BFF", // Change this to match your theme color
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "all 0.3s ease"
                    }}
                        onClick={handleReviewClick}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#0069d9"} // Darker shade on hover
                        onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"} // Original color on mouse out
                    >
                        Add Tutor Review
                    </button>
                    <AddReviewForm showModal={showModal} handleCloseModal={handleCloseModal} guardianId={guardian_id} />

                </div>
            }>
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
                                <div className="student-tile" onClick={() => handleTileClick(student.student_id)}>
                                    <div className="colour"></div>
                                    {student.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="student-info-container">
                <div className="App">
                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={events}
                        style={{ height: "100vh" }}
                    />
                </div>
            </div>

        </ParentDashboardLayout>
    );
};

export default ParentDash;