import React, { useState } from 'react';
import "./index.css"; // Import the CSS file for styling


import { TutorDashboardLayout } from '../../components/TutorDashboardLayout';

const RegisterTutorForm = () => {
    const [email, setEmail] = useState('');
    const [verifyEmail, setVerifyEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isEmailMatch, setIsEmailMatch] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');



    const handleVerifyEmailChange = (e) => {
        setVerifyEmail(e.target.value);
        setIsEmailMatch(email === e.target.value);
    };


    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        };
    };

    const createAccount = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/tutor/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    fname: firstName,
                    lname: lastName
                })
            });

            if (response.status === 200) {
                const responseData = await response.json();
                console.log('User account created:', responseData);
                window.location.href = "/tutor/login";
            } else {
                const errorData = await response.json();
                setFormError('Account failed to create', errorData.error);
            }
            setIsSubmitting(false);
        } catch (error) {
            setFormError('Failed to save', error);
        }
    };

    return (
        <form className="tutor-info-form">

            <div className="header-row">
                <h2 className="add-student-header">Create Your Account</h2>
            </div>

            <div className="input-row">
                <label className="input-label">
                    First name
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>

                <label className="input-label">
                    Last name
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
            </div>

            <div className="input-row">
                <label className="input-label">
                    Email
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label className="input-label">
                    Verify Email
                    <input type="text" value={verifyEmail} onChange={(e) => handleVerifyEmailChange(e)} />
                </label>
            </div>

            <div className="input-row">
                {!isEmailMatch && <p className="signup-error-message">Emails do not match!</p>}
            </div>

            <div className="input-row">
                <label className="input-label">
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>

                <label className="input-label">
                    Confirm Password
                    <input type="password" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e)} />
                </label>
            </div>

            {passwordError && <p className="signup-error-message">{passwordError}</p>}

            {confirmPasswordError && <p className="signup-error-message">{confirmPasswordError}</p>}
            {formError && <p className="signup-error-message">{formError}</p>}


            <input type="submit" value="Continue" onClick={(e) => createAccount(e)} />

        </form>

    );
};

export default RegisterTutorForm;
