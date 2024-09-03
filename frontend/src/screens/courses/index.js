import React, { useEffect, useState } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.css'
import 'react-dropzone-uploader/dist/styles.css'

import { MainContentLayout } from '../../components/MainContentLayout';
import { AddCourseModal } from '../../components/AddCourseModal';
import { EditCourseModal } from '../../components/EditCourseModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
const URL = process.env.REACT_APP_API_URL


const Courses = () => {
    const [courses, setCourses] = useState([])
    const [courseID, setCourseID] = useState(-1)
    const [sortDirection, setSortDirection] = useState('asc');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
    const [edited, setEdited] = useState(0);

    const fetchCourses = async () => {
        let url = URL + `/courses`;
        const response = await fetch(url);
        const registrations = await response.json();
        console.log("Registrations", registrations);
        setCourses(registrations);

        url = URL + "/course/tutor"

        url = URL + "/tutors"
    };

    useEffect(() => {
        fetchCourses();
    }, [edited]);

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
        setShowAddModal(true);
        setShowEditModal(false);
    };

    const handleEditCourseClick = (id) => {
        console.log('Edit course clicked', id)
        setCourseID(id)
        setShowEditModal(true);
        setShowAddModal(false);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setCourseID(-1)
    };


    const [sortedByEnrollments, setSortedByEnrollments] = useState(false);
    const [sortedByTutors, setSortedByTutors] = useState(false);
    const [sortedByDifficulty, setSortedByDifficulty] = useState(false)
    const [sortedByTitle, setSortedByTitle] = useState(false)

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
    const handleSortByDifficulty = () => {
        resetSort();
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortedByDifficulty(true);


        const difficultyMap = {
            "Beginner": 1,
            "Intermediate": 2,
            "Advanced": 3
        };

        const sortedCourses = [...courses];
        sortedCourses.sort((a, b) => {
            const aDifficulty = difficultyMap[a.course_difficulty] || 0;
            const bDifficulty = difficultyMap[b.course_difficulty] || 0;
            if (aDifficulty === bDifficulty) {
                // If difficulties are equal, sort by course_name alphabetically
                return a.course_name.localeCompare(b.course_name);
            }
            return newSortDirection === "asc"
                ? aDifficulty - bDifficulty
                : bDifficulty - aDifficulty;
        });
        setCourses(sortedCourses);
    };

    const handleSortByTitle = () => {
        resetSort();
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortedByTitle(true);

        const difficultyMap = {
            "Beginner": 1,
            "Intermediate": 2,
            "Advanced": 3
        };

        const sortedCourses = [...courses];
        sortedCourses.sort((a, b) => {
            const titleComparison = a.course_name.localeCompare(b.course_name);
            if (titleComparison !== 0) {
                // If course names are not equal, sort by course_name
                return newSortDirection === "asc" ? titleComparison : -titleComparison;
            }
            // If course names are equal, sort by difficulty
            const aDifficulty = difficultyMap[a.course_difficulty];
            const bDifficulty = difficultyMap[b.course_difficulty];
            return aDifficulty - bDifficulty
        });
        setCourses(sortedCourses);
    };
    const resetSort = () => {
        setSortedByTutors(false)
        setSortedByEnrollments(false)
        setSortedByDifficulty(false)
        setSortedByTitle(false)
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


    const getDifficultyChip = (difficulty) => {


        let label = '';
        let color = '';

        switch (getDifficultyIndex(difficulty)) {
            case 1:
                label = 'Beginner';
                color = '#A2DED0 ';
                break;
            case 2:
                label = 'Intermediate';
                color = '#FFD699';
                break;
            case 3:
                label = 'Advanced';
                color = '#FF9AA2 ';
                break;
            default:
                label = 'Unknown';
                color = 'grey';
        }

        return (
            <Chip
                label={label}
                style={{
                    backgroundColor: color,
                    color: 'black',
                    minWidth: '100px', // adjust this value as needed
                    justifyContent: 'center',
                }}
            />
        );
    };


    return (
        <MainContentLayout
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
                    <AddCourseModal showModal={showAddModal} handleCloseModal={handleCloseModal} courses={transformedCourses} />
                    <EditCourseModal showModal={showEditModal} handleCloseModal={handleCloseModal} courses={transformedCourses} course_id={courseID} onSave={() => { setEdited(edited + 1) }} />

                </div>
            }
        >

            <table key={courses} style={{ width: '90%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '30px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid rgb(221, 221, 221)', backgroundColor: '#103da2', color: '#fff' }}>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill='white'><rect fill="none" height="24" width="24" /><path d="M3,10h11v2H3V10z M3,8h11V6H3V8z M3,16h7v-2H3V16z M18.01,12.87l0.71-0.71c0.39-0.39,1.02-0.39,1.41,0l0.71,0.71 c0.39,0.39,0.39,1.02,0,1.41l-0.71,0.71L18.01,12.87z M17.3,13.58l-5.3,5.3V21h2.12l5.3-5.3L17.3,13.58z" /></svg></th>
                        <th
                            style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={handleSortByDifficulty}
                        >
                            Difficulty
                            {sortedByDifficulty ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : <FontAwesomeIcon icon={faSort} style={{ paddingLeft: '5px' }} />}
                        </th>
                        <th
                            style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={handleSortByTitle}
                        >
                            Title
                            {sortedByTitle ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : <FontAwesomeIcon icon={faSort} style={{ paddingLeft: '5px' }} />}
                        </th>
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

                        <th
                            style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer' }}

                        >
                            Price
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
                                        <div onClick={() => { handleEditCourseClick(course.course_id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                                <path d="M0 0h24v24H0z" fill="none" />
                                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                            </svg>
                                        </div>
                                    )}
                                </td>

                                <td style={{ padding: '10px', textAlign: 'left' }}>
                                    {getDifficultyChip(course.course_difficulty)}                                    </td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>        {course.course_name}



                                </td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{course.target_age}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{course.prerequisites}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{course.enrollments}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{course.tutors}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>${course.price}</td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </MainContentLayout >

    );

}

export default Courses;