import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import TutorProfileForm from '../../components/TutorProfileForm';

const TutorProfile = () => {
    return (
        <TutorDashboardLayout>
            <div className='tutor-info-container'>
                <TutorProfileForm />
            </div >

        </TutorDashboardLayout >
    );
};

export default TutorProfile;
