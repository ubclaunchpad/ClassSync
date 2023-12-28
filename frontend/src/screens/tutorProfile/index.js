import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import TutorProfileForm from '../../components/TutorProfileForm';

const TutorProfile = () => {
    // get name from local storage
    const name = localStorage.getItem('fname') !== undefined ? localStorage.getItem('fname') : "";

    return (
        <TutorDashboardLayout name={name}>
            <div className='tutor-info-container'>
                <TutorProfileForm />
            </div >

        </TutorDashboardLayout >
    );
};

export default TutorProfile;
