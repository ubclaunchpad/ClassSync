import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

const URL = process.env.REACT_APP_API_URL
export const AddReviewForm = ({ showModal, handleCloseModal, guardianId }) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [tutors, setTutors] = useState([]);

    const [formState, setFormState] = useState({
        description: '',
        tutor_id: '',
        course_id: '',
    })
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const course = courses.find(course => String(course.id) === String(formState.course_id));

        const reviewData = {
            description: formState.description,
            guardian_id: guardianId,
            tutor_id: String(formState.tutor_id),
            course_id: String(formState.course_id),
            date: new Date().toISOString(),
            course_name: course ? course.name : '',
        };

        try {
            const res = await fetch(
                URL + "/reviews",
                {
                    body: JSON.stringify(
                        reviewData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
    //given guardian id, find tutors id and name and courses id and nametheir children took
    useEffect(() => {
        const getTutorandCourse = async () => {
            try {
                const res = await fetch(
                    URL + `/tutorandcourse?id=${guardianId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "GET",
                    }
                );
                const data = await res.json();
                console.log(data);
                setTutors(data.map(row => ({ id: row.tutor_id, name: row.tutor_name })));
                setTutors(data.reduce((uniqueTutors, row) => {
                    return uniqueTutors.findIndex(tutor => tutor.id === row.tutor_id) < 0
                        ? [...uniqueTutors, { id: row.tutor_id, name: row.tutor_name }]
                        : uniqueTutors;
                }, []));
                setCourses(data.reduce((uniqueCourses, row) => {
                    return uniqueCourses.findIndex(course => course.id === row.course_id) < 0
                        ? [...uniqueCourses, { id: row.course_id, name: row.course_name }]
                        : uniqueCourses;
                }, []));
            } catch (error) {
                console.log(error);
            }
        }
        getTutorandCourse();
    }, [guardianId]);

    return (
        <Modal
            ariaHideApp={false}
            isOpen={showModal}
            onRequestClose={handleCloseModal}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: '1000', // Make the modal appear on top
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    padding: '20px',
                    width: '80%',
                    maxWidth: '800px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <form className="review-form" onSubmit={handleSubmit}>
                <div class="header-row">
                    <h2 className="review-header">Add a Review</h2>
                </div>
                <div className="input-row">
                    <label>
                        Tutor
                        <select name="tutor_id" type="text" value={formState.tutor_id} onChange={handleFormChange}>
                            <option value="">Select a tutor</option>
                            {tutors.map((tutor) => (
                                <option key={tutor.id} value={tutor.id}>
                                    {tutor.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Courses
                        <select name="course_id" type="text" value={formState.course_id} onChange={handleFormChange}>
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id} >
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="input-column" style={{ marginRight: "25%" }}>
                    <label>
                        Review
                    </label>
                    <textarea style={{ borderRadius: "10px", marginTop: "5px", paddingTop: "10px", marginLeft: "0px", marginRight: "0px" }} name="description" type="text" value={formState.description} onChange={handleFormChange} />
                </div>
                <input type="submit" value="Send Review" />
            </form>
        </Modal>
    );
};
