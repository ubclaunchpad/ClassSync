import "./index.css";
import ParentDashCalendar from "../../components/ParentDashCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { useState, useEffect } from "react";
import { ParentDashboardLayout } from "../../components/ParentDashboardLayout";
import { useNavigate } from "react-router-dom";
import { MainContentLayout } from "../../components/MainContentLayout";
import { NavLink } from 'react-router-dom';
import { AddReviewForm } from "../../components/AddReviewForm";
import { useAuth } from "../../contexts/AuthContext";

const URL = process.env.REACT_APP_API_URL

const ParentDash = (props) => {
    const navigate = useNavigate();
    const guardian_id = localStorage.getItem('userId');
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { user, login } = useAuth()


    const handleTileClick = async (studentId) => {
        const url = URL + `/student/${studentId}/courses`;
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
        const url = URL + `/guardian/students`;
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



            const updatedUser = user
            updatedUser.children = data

            login(updatedUser)
            setStudents(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }


    useEffect(() => {
        fetchStudents();
    }, [])

    const handleReviewClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <MainContentLayout
            rightColumnContent={
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                    marginRight: "15px"

                }}>
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
                    <h2>Student(s)</h2>
                    <button className="header-button">

                        <NavLink to="/addStudent" className="header-button">Add a New Student</NavLink>          </button>
                </div>
                <div>
                    <div className="pc existing-students-row">
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
                    <div className="mb student-container">

                        {students.map((student) => {
                            const tileColorClass = `stripe ${student.color}-tile`;

                            return (

                                <div className="name-card" onClick={() => handleTileClick(student.student_id)}>
                                    <div className={tileColorClass}></div>
                                    <div className="content">
                                        {student.name}
                                    </div>
                                </div>

                            )
                        })}
                    </div>

                </div>


            </div >
            <div className="mb">
                <ParentDashCalendar students={students} defaultView="agenda" views={["day", "agenda"]}></ParentDashCalendar>
            </div>
            <div className="pc">
                <ParentDashCalendar students={students}></ParentDashCalendar>
            </div>
        </MainContentLayout >
    );
};

export default ParentDash;