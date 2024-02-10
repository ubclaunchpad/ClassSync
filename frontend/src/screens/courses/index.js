import React, { useEffect, useState } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.css'
import 'react-dropzone-uploader/dist/styles.css'

import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import { AddCourseModal } from '../../components/CourseModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';


const Courses = () => {
    const [courses, setCourses] = useState([])
    const [sortDirection, setSortDirection] = useState('asc');
    const [showModal, setShowModal] = useState(false);
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

    const fetchCourses = async () => {
        let url = `http://localhost:8080/courses`;
        const response = await fetch(url);
        const registrations = await response.json();
        console.log("Registrations", registrations);
        setCourses(registrations);

        url = "http://localhost:8080/course/tutor"

        url = "http://localhost:8080/tutors"
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleMouseEnter = (index) => {
        if (hoveredRowIndex !== index) {
            setHoveredRowIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (hoveredRowIndex !== null) {
            setHoveredRowIndex(null);
        }
    };


    const handleAddCourseClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const [sortedByEnrollments, setSortedByEnrollments] = useState(false);
    const [sortedByTutors, setSortedByTutors] = useState(false);
    const transformedCourses = courses.map(course => ({
        course_id: course.course_id,
        title: `${course.course_difficulty} ${course.course_name}`
    }));

    const handleSortByEnrollments = () => {
        resetSort();
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortedByEnrollments(true);

        const sortedCourses = [...courses];
        sortedCourses.sort((a, b) => {
            return newSortDirection === 'asc' ? a.enrollments - b.enrollments : b.enrollments - a.enrollments;
        });
        setCourses(sortedCourses);
    };
    const handleSortByTutors = () => {
        resetSort();
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortedByTutors(true);

        const sortedCourses = [...courses];
        sortedCourses.sort((a, b) => {
            return newSortDirection === 'asc' ? a.tutors - b.tutors : b.tutors - a.tutors;
        });
        setCourses(sortedCourses);
    };
    const resetSort = () => {
        setSortedByTutors(false)
        setSortedByEnrollments(false)
    };

    const getDifficultyIndex = (difficulty) => {
        switch (difficulty) {
            case 'Beginner':
                return 1;
            case 'Intermediate':
                return 2;
            case 'Advanced':
                return 3;
            default:
                return 3;
        }
    };

    const getDifficultyStars = (difficulty) => {
        const maxStars = 3; // You can adjust this based on your preference
        // const difficultyLevel = difficulty.toLowerCase();

        const difficultyLevel = getDifficultyIndex(difficulty)
        console.log('Difficulty level is ', getDifficultyIndex(difficulty))
        const stars = Array.from({ length: maxStars }, (_, index) => (
            <span
                key={index}
                style={{
                    display: 'inline-block',
                    width: '20px', // Adjust the size of the stars as needed
                    height: '20px',
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill={index < difficultyLevel ? '#00B0F1' : 'none'}>
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" stroke='lightgrey' />
                </svg>
            </span>
        ));

        return stars;
    };



    return (
        <TutorDashboardLayout
            smallText="Admin Dashboard"
            rightColumnContent={
                <div style={{ textAlign: "left", marginTop: "20px", marginRight: "15px" }}>
                    <h3>Manage Courses</h3>
                    <p>This dashboard allows administrators to manage courses offered. Explore course difficulty, titles, target age, prerequisites, number of enrollments, and number of tutors.</p>
                    <button style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#007BFF", // Change this to match your theme color
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "all 0.3s ease"
                    }}
                        onClick={handleAddCourseClick}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#0069d9"} // Darker shade on hover
                        onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"} // Original color on mouse out
                    >
                        Add Course
                    </button>
                    <AddCourseModal showModal={showModal} handleCloseModal={handleCloseModal} courses={transformedCourses} />
                </div>
            }
        >

            <table key={courses} style={{ width: '90%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '30px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #000', backgroundColor: '#103da2', color: '#fff' }}>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}></th>

                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Title</th>

                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Difficulty</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', width: '80px' }}>Age</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Pre-requisites</th>
                        <th
                            style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={handleSortByEnrollments}
                        >
                            Enrollments
                            {sortedByEnrollments ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : <FontAwesomeIcon icon={faSort} style={{ paddingLeft: '5px' }} />}
                        </th>
                        <th
                            style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={handleSortByTutors}
                        >
                            Tutors
                            {sortedByTutors ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : <FontAwesomeIcon icon={faSort} style={{ paddingLeft: '5px' }} />}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => {

                        return (
                            <tr key={course.course_id} style={{ borderBottom: '1px solid #ddd' }} onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}>
                                <td style={{ padding: '10px', textAlign: 'center', width: '60px' }}>
                                    {hoveredRowIndex === index && (
                                        <div onClick={() => console.log('SVG clicked with id ', course.course_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                                <path d="M0 0h24v24H0z" fill="none" />
                                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                            </svg>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{course.course_name}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{getDifficultyStars(course.course_difficulty)}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{course.target_age}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{course.prerequisites}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{course.enrollments}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{course.tutors}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </TutorDashboardLayout >

    );

}

export default Courses;