import React, { useState } from 'react';

import "./index.css";


const TutorRegistration = () => {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');

    const url = "http://localhost:8080"

    const createUser = async () => {
        try {
            const response = await fetch(url + '/tutor/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID, password }),
            });


            if (response.status === 200) {
                // User created successfully
                const responseData = await response.json();
                console.log('User created:', responseData);

                // Handle success, e.g., show a success message or redirect the user
            } else {
                // Handle any error conditions
                const errorData = await response.json();
                console.error('User creation error:', errorData);
                // Handle the error, e.g., display an error message
            }
        } catch (error) {
            // Handle the error
            console.error('Error creating user:', error);
            // Handle the error, e.g., display an error message
        }
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={createUser}>Create User</button>
        </div>
    );
};

export default TutorRegistration;
