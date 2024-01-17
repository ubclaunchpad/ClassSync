import './index.css';
import Modal from 'react-modal';
import React, { useState } from 'react';
const ShopCourses = () => {
    Modal.setAppElement('#root');

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const students = [
        { id: 8, name: 'John Doe' },
        { id: 9, name: 'Jane Smith' },
        { id: 3, name: 'Charlie Brown' },
    ];
    const [selectedStudent, setSelectedStudent] = useState(students[0]);
    const [registrationError, setRegistrationError] = useState(null);

    const [course, setCourse] = useState(null); // Replace with actual course data

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setRegistrationError(null);
    };

    const handleRegister = async () => {
        setRegistrationError(null);
        console.log(`Registered ${selectedStudent.name} (id: ${selectedStudent.id}) for course with id: ${course.id}`);
        let url = "localhost:8080/registrations";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: selectedStudent.id,
                    course_id: course,
                }),
            });

            if (!response.ok) {
                setRegistrationError("This registration already exists.");
                return;
            }

            console.log("Registered student");
            closeModal();
        } catch (err) {
            console.error("Error registering student", err);
            setRegistrationError("An error occurred while registering.");
        }
    };
    const courses = [
        {
            title: 'Beginner Scratch',
            targetAge: '12-15',
            id: 4,
            prerequisites: 'none',
            // Add image URL here
            image: 'https://via.placeholder.com/100',
        },

        {
            title: 'Intermediate Scratch',
            id: 1,
            targetAge: '12-15',
            prerequisites: 'none',
            // Add image URL here
            image: 'https://via.placeholder.com/150',
        },

        {
            title: 'Advanced Java',
            id: 5,
            targetAge: '12-15',
            prerequisites: 'none',
            // Add image URL here
            image: 'https://via.placeholder.com/150',
        },
        // Add more courses as needed
    ];

    const openPopUp = (id, title) => () => {
        console.log("Opening popup");
    }

    return (


        <div>
            <h2>Browse Courses</h2>
            {courses.map((course, index) => (
                <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '60%',
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
                    <img src={course.image} alt="Course" style={{ width: '200px', height: '100px', marginRight: '20px', borderRadius: '10px' }} />
                    <div style={{ flex: 1 }}>
                        <h3 style={{ color: '#103DA2', marginBottom: '10px' }}>{course.title}</h3>
                        <p style={{ color: 'grey', marginBottom: '10px' }}>Target Age: {course.targetAge} | Prerequisites: {course.prerequisites}</p>
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
                        <h2 style={{ marginBottom: '20px' }}>Register for {course.title}</h2>

                        <select
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
                            {students.map((student, index) => (
                                <option key={index} value={student.id}>{student.name}</option>
                            ))}
                        </select>
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
    );
}
export default ShopCourses;