import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

const AddReviewForm = ({ showModal, handleCloseModal, guardianId }) => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        fname: '',
        lname: '',
        dob: '',
        accommdations: '',
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
        const reviewData = {
            description: formState.description,
            guardian_id: guardianId,
            tutor_id: formState.tutor_id,
            course_name: formState.course_name,
            date: Date.now(),
        };
        try {
            const res = await fetch(
                "http://localhost:8080/review",
                {
                    body: JSON.stringify(
                        reviewData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                }
            );
            console.log(res.body);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(formState);
    const tutors = [{ id: 1, name: "Tutor 1" }, { id: 2, name: "Tutor 2" }]
    const courses = [{ id: 1, name: "Course 1" }, { id: 2, name: "Course 2" }];
    return (
        <Modal
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
                            {tutors.map((tutor) => (
                                <option key={tutor.id} value={tutor.id}>
                                    {tutor.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Courses
                        <select name="course_name" type="text" value={formState.course_name} onChange={handleFormChange}>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
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
                    <textarea style={{ borderRadius: "10px", marginTop: "5px", paddingTop: "10px" }} name="description" type="text" value={formState.description} onChange={handleFormChange} />
                </div>
                <input type="submit" value="Send Review" />
            </form>
        </Modal>
    );
};
export default AddReviewForm;
