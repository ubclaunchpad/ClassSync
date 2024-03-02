import React, { useState, useEffect } from 'react';
import "./index.css";
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import TutorProfileForm from '../../components/TutorProfileForm';

const TutorProfile = () => {
    const name = localStorage.getItem('fname') || "";
    const url = "http://localhost:8080";

    const [maxHours, setMaxHours] = useState();
    const [university, setUniversity] = useState('');
    const [about, setAbout] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('')
    const [profileData, setProfileData] = useState({})
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch courses data
                const coursesResponse = await fetch(`${url}/tutor/offerings`);
                const coursesData = await coursesResponse.json();
                console.log(coursesData)

                // Transform coursesData into options format
                const options = coursesData.map(course => ({
                    value: course.course_id,
                    label: `${course.course_difficulty} ${course.course_name}`,
                    color: course.color
                }));

                setCourses(options);
                const id = localStorage.getItem('userID');

                // Fetch profile data
                const profileResponse = await fetch(`${url}/tutor/profile?id=${id}`);
                const profileData = await profileResponse.json();
                console.log("Profile Data", profileData);

                setMaxHours(profileData.max_hours);
                setUniversity(profileData.university);
                setAbout(profileData.bio);
                setDescription(profileData.description);
                setLink(profileData.link)
                setProfileData(profileData)



                // Fetch offerings data
                const offeringsResponse = await fetch(`${url}/tutor/offering?id=${id}`);
                const offeringsData = await offeringsResponse.json();

                // Filter selectedOptions based on offeringsData
                const filteredOptions = options.filter(option => offeringsData.includes(option.value));
                setSelectedOptions(filteredOptions);

            } catch (error) {
                console.error('Failed to fetch data', error);

            }
            setDataLoaded(true);

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
                            profileData={profileData}
                            // maxHours={profileData.max_hours}
                            // university={profileData.university}
                            // about={profileData.bio}
                            // description={description}
                            selectedOptions={selectedOptions}
                            // link={link}
                            // languages={'test language'}
                        />
                    </div>
                </TutorDashboardLayout>
            )}
        </React.Fragment>
    );
};

export default TutorProfile;
