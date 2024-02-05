import './index.css';
import { ParentDashboardLayout } from '../../components/ParentDashboardLayout';
// import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
const TutorsList = () => {
    const [tutors, setTutors] = useState(null);

    const fetchData = async () => {
        try {
            let url = "http://localhost:8080/tutors"
            const teacherListResponse = await fetch(url);
            // console.log("Tutors Response", teacherListResponse);

            const teacherListData = await teacherListResponse.json();
            // console.log("Tutors Data", teacherListResponse);
            setTutors(teacherListData);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    // Modal.setAppElement('#root');

    // const [modalIsOpen, setModalIsOpen] = useState(false);

    // const [selectedTutor, setTutor] = useState(null); // Replace with actual course data

    // const openModal = () => {
    //     setModalIsOpen(true);
    // }; 

    // const closeModal = () => {
    //     setModalIsOpen(false);
    // };

    // const handleSeeMore = async () => {
    //     let url = "http://localhost:8080/registrations";
    //     try {

    //     } catch (err) {
    //     }
    // };

    // const openPopUp = (id, title) => () => {
    //     console.log("Opening popup");
    // }

    return (

        <ParentDashboardLayout>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>All Tutors</h2>
                {tutors && tutors.map((tutor, index) => (
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
                        <img src='https://images.squarespace-cdn.com/content/v1/63b64f0411726e490366a3cb/1672892283063-R28O2XMQOO9VTVXFVAKM/class_covers_WEBSITE-Scratch-Bg-.jpg?format=1000w' alt="tutorPicture" style={{ width: '240px', height: '160px', marginRight: '20px', borderRadius: '10px' }} />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ color: '#103DA2', marginBottom: '10px' }}>{tutor.f_name} {tutor.l_name}</h3>
                            <p style={{ color: 'grey', marginBottom: '10px' }}>{tutor.bio}</p>
                        </div>
                        {/* <button
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
                                setTutor(tutors[index]);
                                handleSeeMore();
                            }}>SeeMore</button> */}
                        {/* <Modal
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
                        </Modal> */}
                    </div>

                ))}
            </div>
        </ParentDashboardLayout>
    );
}
export default TutorsList;