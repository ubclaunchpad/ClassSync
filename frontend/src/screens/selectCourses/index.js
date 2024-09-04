import './index.css';
import { ParentDashboardLayout } from '../../components/ParentDashboardLayout';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { MainContentLayout } from '../../components/MainContentLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const URL = process.env.REACT_APP_API_URL


const SelectCourses = (props) => {
    const location = useLocation()
    const state = location.state
    const { id } = useParams()

    const navigate = useNavigate()
    const [courses, setCourses] = useState(null);




    const fetchData = async () => {
        try {
            let url = URL + "/tutor/offerings"
            const coursesResponse = await fetch(url);
            const coursesData = await coursesResponse.json();
            console.log("Courses Data", coursesData);
            setCourses(coursesData);



        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    Modal.setAppElement('#root');


    const handleSelect = (course_id) => {
        navigate(`/book/trial/${id}/course/${course_id}`);
    };
    return (

        <MainContentLayout>

            <div className="courses-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px' }}>
                <h2 className='trial-header' style={{ width: '90%' }}>Select Trial Class for {state.name} </h2>
                {courses && courses.map((course, index) => (
                    <div key={index}
                        className='course-container'
                    >
                        <img src={course.image} className="course-image" alt="Course" />
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
                                handleSelect(course.course_id)
                            }}>Select</button>

                    </div>

                ))}
            </div>
        </MainContentLayout>
    );
}
export default SelectCourses;