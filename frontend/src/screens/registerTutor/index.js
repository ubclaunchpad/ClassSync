import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';

const RegisterTutor = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('');


    const url = "http://localhost:8080"; // Replace with your actual API endpoint


    return (
        <TutorDashboardLayout>
            <div className='tutor-info-container'>
                <form className="tutor-info-form">
                    <div class="header-row">
                        <h2 className="add-student-header">Create Your Account</h2>
                    </div>
                    <div className="input-row">
                        <label className="input-label">
                            Email
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>


                    </div>
                    <div className="input-row">


                        <label className="input-label">
                            Password
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>


                    </div>
                    <div className="input-row">
                        <label className="input-label">
                            Confirm Password
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassowrd(e.target.value)} />

                        </label>

                    </div>
                    <input type="submit" value="Continue" onClick={createAccount} />
                </form>
            </div >

        </TutorDashboardLayout >
    );
};

export default RegisterTutor;
