import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';
import RegisterUserForm from '../../components/RegisterUserForm';

const RegisterTutor = () => {

    return (
        <TutorDashboardLayout>
            <div className='register-tutor-container'>
                <RegisterUserForm role='tutor' redirect='/tutor/login'/>
            </div>

        </TutorDashboardLayout >
    );
};

export default RegisterTutor;
