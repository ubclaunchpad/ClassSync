import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling
import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';

const RegisterTutorForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('');


    const url = "http://localhost:8080"; // Replace with your actual API endpoint

    const createAccount = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            console.log('Creating account' + email + password);
            const response = await fetch(url + '/tutor/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.status === 200) {
                const responseData = await response.json();
                console.log('User account created:', responseData);
                window.location.href = "/tutorProfile";


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
            <input type="submit" value="Continue" onClick={(e) => createAccount(e)} />
        </form>

    );
};

export default RegisterTutorForm;
