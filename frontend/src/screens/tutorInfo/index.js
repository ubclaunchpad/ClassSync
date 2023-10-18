import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';

const TutorInfo = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(''); // TODO: Get email from login
    const [about, setAbout] = useState('');
    const [maxHours, setMaxHours] = useState('');
    const [offerings, setOfferings] = useState('');
    const [university, setUniversity] = useState('');

    const url = "http://localhost:8080"; // Replace with your actual API endpoint

    const saveTutorInfo = async () => {
        try {
            const response = await fetch(url + '/tutor/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, bio: { firstName, lastName, university, about, maxHours, offerings } })
            });

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
        <TutorDashboardLayout>
            <div className='tutor-info-container'>
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
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>

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
                                <textarea
                                    className="offerings"
                                    value={offerings}
                                    onChange={(e) => setOfferings(e.target.value)}
                                ></textarea>                            </label>

                        </div>
                    </div>

                    <input type="submit" value="Submit" onClick={saveTutorInfo} />
                </form>
            </div >

        </TutorDashboardLayout >
    );
};

export default TutorInfo;
