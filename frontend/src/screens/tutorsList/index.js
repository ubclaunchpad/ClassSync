import './index.css';
import { MainContentLayout } from '../../components/MainContentLayout';
import React, { useState, useEffect } from 'react';
import { Chip, alpha } from '@material-ui/core';


const TutorsList = () => {
    const [tutors, setTutors] = useState(null);
    const [users, setUsers] = useState(null);
    const [courses, setCourses] = useState(null);
    const [offerings, setOfferings] = useState(null);
    const url = "localhost:3000/registertutor/"

    const fetchData = async () => {
        try {
            // Gettig all tutors
            let urlTutors = "http://localhost:8080/tutors"
            const teacherListResponse = await fetch(urlTutors);
            // console.log("Tutors Response", teacherListResponse);

            const teacherListData = await teacherListResponse.json();
            console.log("Tutors Data", teacherListResponse);
            setTutors(teacherListData);

            // Getting all users
            let urlUsers = "http://localhost:8080/users"
            const usersListResponse = await fetch(urlUsers);
            const usersListData = await usersListResponse.json();
            setUsers(usersListData);
        
            // Getting all courses
            let urlCourses = "http://localhost:8080/courses"
            const coursesListResponse = await fetch(urlCourses);
            const coursesListData = await coursesListResponse.json();
            setCourses(coursesListData);


            // Getting all tutor offerings
            let urlTutorOfferings = "http://localhost:8080/tutor_offerings"
            const offeringsListResponse = await fetch(urlTutorOfferings);
            const offeringsListData = await offeringsListResponse.json();
            setOfferings(offeringsListData);

        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    const findCourses = (tutor_id) => {
        let tutorOfferings = offerings?.filter(offering => offering.tutor_id === tutor_id);
        let courseList = tutorOfferings?.map(offering => courses?.find(course => course.course_id === offering.course_id));
        
        return courseList;
    }

    const copyToken = async () => {
        try {
            const response = await fetch('http://localhost:8080/token');
            const data = await response.json();


            // Now you have the token in `data`, you can copy it to clipboard
            navigator.clipboard.writeText(url+data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MainContentLayout
            smallText="Admin Dashboard"
            rightColumnContent={
                <div style={{ textAlign: "left", marginTop: "20px", marginRight: "15px" }}>
                    <h3>List of all Tutors</h3>

                    <p>This dashboard allows administrators to manage Tutors. View and edit Tutors by clicking on View More.</p>

                    <button 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#007BFF', // Change this to match your theme color
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={copyToken}
                    >
                        Tutor Invite Link (Single-Use)
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            width="16"
                            style={{ marginLeft: '10px' }}
                        >
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path fill='white' d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                        </svg>
                    </button>
                            </div>
            }>
            

            <table style={{ width: '90%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '30px' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #000', backgroundColor: '#103da2', color: 'white' }}>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>ID</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>First Name</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>Last Name</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>Courses</th>
                        {/* <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}></th> */}

                    </tr>
                </thead>
                <tbody>
                    {tutors?.map((data, index) => (
                        <tr key={data.tutor_id} style={{ borderBottom: '1px solid #ddd', backgroundColor: data.paid ? '#e6ffe6' : 'inherit' }}>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{data.tutor_id}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{users?.find(user => user.user_id === data.tutor_id)?.firstname}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{users?.find(user => user.user_id === data.tutor_id)?.lastname}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>
                                {findCourses(data.tutor_id)?.map((course) => (
                                    <Chip 
                                    label={`${course.course_name}, ${course.course_difficulty}`} 
                                    color='default' 
                                    style={{backgroundColor:alpha(course.color, 0.5), margin: '5px'}} 
                                    variant='outlined' />
                                ))}
                                <Chip 
                                label="Add Course"
                                color='default'
                                style={{margin: '5px'}}
                                onClick={() => console.log('Add course')}
                                clickable
                                />
                            </td>
                            {/* <td style={{ padding: '10px', textAlign: 'centre' }}>
                                <button style={{ alignContent:'center', padding: '10px', backgroundColor: '#0091e6', border: '1px solid #ddd', borderRadius: '8px',textAlign:'center', width: '100px', color:'white', fontWeight:'bold' }}
                                 onClick={null}>See More</button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </MainContentLayout>
    );
}
export default TutorsList;