import React, { useState, useEffect } from 'react';
import "./index.css";
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import TutorProfileForm from '../../components/TutorProfileForm';

const TutorProfile = () => {
    const name = localStorage.getItem('fname') || "";
    const url = "http://localhost:8080";

    const [maxHours, setMaxHours] = useState(0);
    const [university, setUniversity] = useState('');
    const [about, setAbout] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = localStorage.getItem('userID');

                // Fetch profile data
                const profileResponse = await fetch(`${url}/tutor/profile?id=${id}`);
                const profileData = await profileResponse.json();

                setMaxHours(profileData.max_hours);
                setUniversity(profileData.university);
                setAbout(profileData.bio);

                // Fetch courses data
                const coursesResponse = await fetch(`${url}/tutor/offerings`);
                const coursesData = await coursesResponse.json();

                // Transform coursesData into options format
                const options = coursesData.map(course => ({
                    value: course.course_id,
                    label: `${course.course_difficulty} ${course.course_name}`,
                    color: course.color
                }));

                setCourses(options);

                // Fetch offerings data
                const offeringsResponse = await fetch(`${url}/tutor/offering?id=${id}`);
                const offeringsData = await offeringsResponse.json();

                // Filter selectedOptions based on offeringsData
                const filteredOptions = options.filter(option => offeringsData.includes(option.value));
                setSelectedOptions(filteredOptions);

                setDataLoaded(true);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once after the initial render

    return (
        <React.Fragment>
            {dataLoaded && (
                <TutorDashboardLayout name={name}>
                    <div className='tutor-info-container'>
                        <TutorProfileForm
                            offerings={courses}
                            maxHours={maxHours}
                            university={university}
                            about={about}
                            selectedOptions={selectedOptions}
                        />
                    </div>
                </TutorDashboardLayout>
            )}
        </React.Fragment>
    );
};

export default TutorProfile;
