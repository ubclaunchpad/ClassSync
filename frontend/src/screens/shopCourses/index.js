import './index.css';
import { ParentDashboardLayout } from '../../components/ParentDashboardLayout';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
const ShopCourses = () => {
    const [courses, setCourses] = useState(null);
    const [students, setStudents] = useState(null);

    const fetchData = async () => {
        try {
            let url = "http://localhost:8080/tutor/offerings"
            const coursesResponse = await fetch(url);
            const coursesData = await coursesResponse.json();
            console.log("Courses Data", coursesData);
            setCourses(coursesData);

            url = `http://localhost:8080/guardian/students`
            const studentsResponse = await fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'), // replace 'yourToken' with your actual token
                },
            });
            let studentsData = await studentsResponse.json();
            setStudents(studentsData);

        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    Modal.setAppElement('#root');

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [registrationError, setRegistrationError] = useState(null);

    const [selectedCourse, setCourse] = useState(null); // Replace with actual course data

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setRegistrationError(null);
    };

    const handleRegister = async () => {
        setRegistrationError(null);
        console.log(`Registered ${selectedStudent.name} (id: ${selectedStudent.id}) for course with id: ${selectedCourse.course_id}`);
        let url = "http://localhost:8080/registrations";
        try {
            console.log("Trying to register student for course id: ", selectedCourse.course_id, " and student id: ", selectedStudent.id, " at url: ", url, " with method: POST");

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: selectedStudent.id,
                    course_id: selectedCourse.course_id,
                    registration_date: new Date().toISOString().slice(0, 10),
                }),
            });

            console.log("Response: ", response);

            // console.log(response.error)

            if (!response.ok) {
                const data = await response.json();

                setRegistrationError(data.error);
                return;
            }

            console.log("Registered student");
            closeModal();
        } catch (err) {
            console.error("Error registering student", err);
            setRegistrationError("An error occurred while registering.");
        }
    };

    useEffect(() => {
        setSelectedStudent(students && students[0]);
    }, [students]);

    const openPopUp = (id, title) => () => {
        console.log("Opening popup");
    }

    return (

        <ParentDashboardLayout>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Browse Courses</h2>
                {courses && courses.map((course, index) => (
                    <div key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            padding: '20px',
                            boxSizing: 'border-box',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#f9f9f9',
                        }}>
                        <img src='https://images.squarespace-cdn.com/content/v1/63b64f0411726e490366a3cb/1672892283063-R28O2XMQOO9VTVXFVAKM/class_covers_WEBSITE-Scratch-Bg-.jpg?format=1000w' alt="Course" style={{ width: '240px', height: '160px', marginRight: '20px', borderRadius: '10px' }} />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ color: '#103DA2', marginBottom: '10px' }}>{course.course_difficulty} {course.course_name}</h3>
                            <p style={{ color: 'grey', marginBottom: '10px' }}>Target Age: {course.target_age} | Prerequisites: {course.prerequisites}</p>
                        </div>
                        <button
                            style={{
                                backgroundColor: '#103DA2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                alignSelf: 'center',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }} onClick={() => {
                                setCourse(course);
                                openModal();
                            }}>Register</button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Register Modal"
                            style={{
                                content: {
                                    top: '50%',
                                    left: '50%',
                                    right: 'auto',
                                    bottom: 'auto',
                                    marginRight: '-50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '10px',
                                    padding: '20px',
                                    width: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                },
                            }}
                        >
                            {selectedCourse && (
                                <h2 style={{ marginBottom: '20px' }}>
                                    Register for {selectedCourse.course_difficulty} {selectedCourse.course_name}
                                </h2>
                            )}
                            {selectedStudent && <select
                                value={selectedStudent.id}
                                onChange={(e) => {
                                    const studentId = e.target.value;
                                    const selected = students.find(student => student.id === Number(studentId));
                                    setSelectedStudent(selected);
                                }}
                                style={{
                                    marginBottom: '20px',
                                    padding: '10px',
                                    width: '100%',
                                    fontSize: '16px',
                                }}
                            >
                                {students && students.map((student, index) => (
                                    <option key={index} value={student.id}>{student.name}</option>
                                ))}
                            </select>}
                            {registrationError && (
                                <div style={{ color: 'red', marginBottom: '10px' }}>
                                    {registrationError}
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <button
                                    onClick={closeModal}
                                    style={{
                                        backgroundColor: '#ddd',
                                        color: '#333',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 20px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRegister}
                                    style={{
                                        backgroundColor: '#103DA2',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 20px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        </Modal>
                    </div>

                ))}
            </div>
        </ParentDashboardLayout>
    );
}
export default ShopCourses;