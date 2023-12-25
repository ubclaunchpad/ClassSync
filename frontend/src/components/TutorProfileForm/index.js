import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling
import Select from 'react-select';

const TutorProfileForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(''); // TODO: Get email from login
    const [about, setAbout] = useState('');
    const [maxHours, setMaxHours] = useState('');
    const [offerings, setOfferings] = useState('');
    const [university, setUniversity] = useState('');
    const url = "http://localhost:8080"; // Replace with your actual API endpoint


    let options = [];
    const loadCourses = async () => {
        console.log('Loading courses');

        try {
            const response = await fetch(url + '/tutor/offerings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                const responseData = await response.json();
                responseData.forEach((course) => {
                    options.push({
                        value: course.course_id,
                        label: course.course_difficulty + ' ' + course.course_name,
                        color: course.color
                    });
                    console.log('Courses loaded:', responseData);

                })
            }
        } catch (error) {
            console.error('Failed to load courses', error);
        }
    }

    loadCourses();

    const customStyles = {
        multiValue: (base, state) => {
            return { ...base, backgroundColor: "#" + state.data.color, borderRadius: '20px' };
        },

    };

    const saveTutorInfo = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log('Saving tutor info');
        try {
            const response = await fetch(url + '/tutor/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, bio: { firstName, lastName, university, about, maxHours } })
            })

            if (response.status === 200) {
                const responseData = await response.json();
                console.log('User details Updated:', responseData);

                const offeringsResponse = await fetch(url + '/tutor/offerings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userID: responseData.id, offerings: offerings })
                });
            } else {
                const errorData = await response.json();
                console.error('User details failed to update:', errorData);
            }
        } catch (error) {
            console.error('Failed to save', error);
        }
    };

    return (

        <form className="tutor-info-form">
            <div class="header-row">
                <h2 className="add-student-header">Create Your Profile</h2>
            </div>
            <div className="input-row">
                <label className="input-label">
                    First Name
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <label className="input-label">
                    Last Name
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>

            </div>
            <div className="input-row">


                <label className="input-label">
                    Email
                    <input type="text" value="test@email.com" disabled />                </label>

                <label className="input-label">
                    University
                    <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} />
                </label>

            </div>
            <div className="input-row">
                <label className="input-label">
                    About Me
                    <textarea
                        className="bio-input"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                </label>

                <div className="input-column">

                    <label className="input-label">
                        Maximum Hours Per Week
                        <input type="number" value={maxHours} onChange={(e) => setMaxHours(e.target.value)} />
                    </label>
                    <label className="input-label">
                        Course Offerings
                        <Select
                            isMulti
                            options={options}
                            styles={customStyles}
                        />

                    </label>

                </div>
            </div>

            <input type="submit" value="Submit" onClick={(e) => saveTutorInfo(e)} />
        </form>

    );
};

export default TutorProfileForm;
