import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import RegisterTutorForm from '../../components/RegisterTutorForm';

const RegisterTutor = () => {

    return (
        <TutorDashboardLayout>
            <div className='register-tutor-container'>
                <RegisterTutorForm />
            </div >

        </TutorDashboardLayout >
    );
};

export default RegisterTutor;
