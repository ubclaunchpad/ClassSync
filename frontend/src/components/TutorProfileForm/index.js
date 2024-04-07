import React, { useState, useEffect } from 'react';
import "./index.css"; // Import the CSS file for styling
import Select from 'react-select';
import axios from 'axios';

const TutorProfileForm = (props) => {
    console.log("props ", props)
    const [about, setAbout] = useState(props.profileData.bio);
    const [maxHours, setMaxHours] = useState(props.profileData.max_hours);
    const [university, setUniversity] = useState(props.profileData.university);
    const [major, setMajor] = useState(props.profileData.major);
    const [selectedOptions, setSelectedOptions] = useState(props.selectedOptions);
    const [description, setDescription] = useState(props.profileData.description);
    const [teleport_link, setTeleport_link] = useState(props.profileData.link);
    const [languages, setLanguages] = useState(props.profileData.languages);
    const url = "http://localhost:8080"; // Replace with your actual API endpoint

    // console.log("Courses ", courses)
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



    function getContrastColor(hexColor) {
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    const customStyles = {
        multiValue: (base, state) => {
            const color = state.data.color;
            return { ...base, backgroundColor: color, borderRadius: '20px', color: getContrastColor(color) };
        },
        multiValueLabel: (base, state) => {
            const color = state.data.color;
            return { ...base, color: getContrastColor(color) };
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
                    major: major,
                    about: about,
                    maxHours: maxHours,
                    startdate: dateString,
                    description: description,
                    enddate: closestFutureDate(Date.now()).toDateString(),
                    offerings: selectedOptions.map((option) => option.value),
                    teleport_link: teleport_link,
                    languages: languages

                }
            });

            console.log("Response ", response.status);

            if (response.status === 200) {
                console.log("User details updated");
                window.location.href = "/tutor/availability";
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
            <div className="header-row">
                <h2 className="add-student-header">Create Your Profile</h2>
            </div>

            <div className="input-column">


                <div className="input-row">
                    
                    <div className="input-column">
                        <label className="input-label">
                            Email
                            <input type="text" value={email} disabled />
                        </label>
                        <label className="input-label">
                            Maximum Hours Per Week
                            <input
                                type="number"
                                value={maxHours}
                                onChange={(e) => setMaxHours(e.target.value)}

                            />
                        </label>
                     
                        <label className="input-label">
                            Teleport Link
                            <input type="text" value={teleport_link} 
                            onChange={(e) => setTeleport_link(e.target.value)}
                            
                            />
                        </label>
                      
                    </div>
                    <div className="input-column">
                  
                        <label className="input-label">
                            University
                            <input
                                type="text"
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                            />
                        </label>

                        <label className="input-label">
                            Program of Study (Major)
                            <input
                                type="text"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                            />
                        </label>
                        <label className="input-label">
                            Languages Spoken
                            <input
                                type="text"
                                value={languages}
                                placeholder='English, French, etc.'
                                onChange={(e) => setLanguages(e.target.value)}
                            />
                        </label>
                   
                
                        {/* <label className="input-label">
                            About Me
                            <textarea
                                className="bio-input"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                maxLength={1000}
                            ></textarea>
                        </label> */}
                      
                    </div>
                </div>
                <div className='input-row'>

                <div className='input-column' style={{width: '100%', marginTop: '-20px'}}>

                <label className="input-label">
                            Summary Description (Headline)
                            <textarea
                                className="description-input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ minHeight: '2em' }}
                            />
                        </label>
                <label className="input-label">
                            About Me
                            <textarea
                                className="bio-input"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                maxLength={1000}
                            ></textarea>
                        </label>
                        <input 
                    type="submit" 
                    value="Submit" 
                    style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
                />  
                        </div>
                        
                        </div>
                {/* <label className="input-label" style={{ width: '100%' }}>
                    Course Offerings
                </label>
                <Select
                    isMulti
                    options={selectedOptions}
                    styles={customStyles}
                    className="basic-multi-select"
                    value={selectedOptions}
                    isDisabled={true}
                /> */}
                        </div>
            
            
        </form>



    );
};

export default TutorProfileForm;
