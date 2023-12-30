import React, { useState, useEffect } from 'react';
import "./index.css"; // Import the CSS file for styling
import Select from 'react-select';
import axios from 'axios';


const TutorProfileForm = (props) => {
    console.log("props ", props)
    const [about, setAbout] = useState(props.about);
    const [maxHours, setMaxHours] = useState(props.maxHours);
    const [university, setUniversity] = useState(props.university);
    const [selectedOptions, setSelectedOptions] = useState(props.selectedOptions);
    const [courses, setCourses] = useState(props.offerings);
    const url = "http://localhost:8080"; // Replace with your actual API endpoint

    console.log("Courses ", courses)
    console.log("Options ", props.offerings)
    const id = localStorage.getItem('userID');







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
        // console.log(selectedOptions)

        try {
            const response = await axios.post(url + '/tutor/bio', {
                user_id: id,
                bio: {
                    university: university,
                    about: about,
                    maxHours: maxHours,
                    startdate: dateString,
                    enddate: closestFutureDate(Date.now()).toDateString(),
                    offerings: selectedOptions.map((option) => option.value)
                }
            });

            console.log("Response ", response.status);

            if (response.status === 200) {
                console.log("User details updated");
                // const responseData = response.data;
                // console.log('User details Updated:', responseData);
                window.location.href = "/tutor-availability";
            } else {
                console.error('User details failed to update:', response.data);
            }
        } catch (error) {
            console.error('Failed to save', error);
        }
    };

    const email = localStorage.getItem("email");

    return (

        <form className="tutor-info-form" onSubmit={(e) => saveTutorInfo(e)}>
            <div class="header-row">
                <h2 className="add-student-header">Create Your Profile</h2>
            </div>

            <div className="input-row">


                <label className="input-label">
                    Email
                    <input type="text" value={email} disabled />                </label>

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
                        maxLength={1000}

                    ></textarea>
                </label>

                <div className="input-column">

                    <label className="input-label">
                        Maximum Hours Per Week
                        <input type="number" value={maxHours} onChange={(e) => setMaxHours(e.target.value)} />
                    </label>
                    <label className="input-label">
                        Course Offerings
                        {console.log("Selected Options ", selectedOptions)}
                        <Select
                            isMulti
                            options={courses}
                            styles={customStyles}
                            className='basic-multi-select'
                            value={selectedOptions}
                            onChange={setSelectedOptions}
                        />

                    </label>

                </div>
            </div>

            <input type="submit" value="Submit" />
        </form>

    );
};

export default TutorProfileForm;
