import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling
import Select from 'react-select';

const TutorProfileForm = () => {
    const [about, setAbout] = useState('');
    const [maxHours, setMaxHours] = useState('');
    const [offerings, setOfferings] = useState('');
    const [university, setUniversity] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const url = "http://localhost:8080"; // Replace with your actual API endpoint


    const closestFutureDate = (inputDate) => {
        // Parse the input date
        const date = new Date(inputDate);

        // Define the valid target months
        const targetMonths = [3 /* April */, 7 /* August */, 11 /* December */];

        // Find the closest future date
        let closestDate = new Date(date);
        while (!targetMonths.includes(closestDate.getMonth())) {
            closestDate.setMonth(closestDate.getMonth() + 1);
        }

        // Set the day to the last day of the month
        closestDate.setMonth(closestDate.getMonth() + 1, 0);

        return closestDate;
    }
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
        let currentDate = new Date();
        let date = currentDate.getDate();
        let month = currentDate.getMonth() + 1; // getMonth() returns a zero-based value (where zero indicates the first month)
        let year = currentDate.getFullYear();

        let dateString = `${month}/${date}/${year}`;
        console.log(selectedOptions)
        try {
            const response = await fetch(url + '/tutor/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: 22,
                    bio: {
                        university: university,
                        about: about,
                        maxHours: maxHours,
                        startdate: dateString,
                        enddate: closestFutureDate(Date.now()).toDateString(),
                        offerings: selectedOptions

                    }
                })
            })

            if (response.status === 200) {
                const responseData = await response.json();
                console.log('User details Updated:', responseData);


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
                            className='basic-multi-select'
                            onChange={(selected) => {
                                const selectedValues = selected ? selected.map(option => option.value) : [];
                                setSelectedOptions(selectedValues);
                            }}
                        />

                    </label>

                </div>
            </div>

            <input type="submit" value="Submit" onClick={(e) => saveTutorInfo(e)} />
        </form>

    );
};

export default TutorProfileForm;
