import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./index.css"; // Import the CSS file for styling
import { MainContentLayout } from '../../components/MainContentLayout';
import RegisterUserForm from '../../components/RegisterUserForm';

const URL = process.env.REACT_APP_API_URL

const RegisterTutor = (props) => {
    const { token } = useParams();
    const [access, setAccess] = useState(props.admin);

    useEffect(() => {
        const fetchData = async () => {
            if (!props.admin && token) {
                try {
                    const response = await fetch(URL + `/token/${token}`);
                    if (response.ok) {
                        setAccess(true);
                    }
                } catch (error) {
                    console.log("Token not found");
                    console.error('Error:', error);
                }
            }
        };
        fetchData();
    }, [props.admin, token]);

    return (
        <div>
            {access ? (
                <div className="screen-container">

                    <div className='register-tutor-container'>
                        <RegisterUserForm role='tutor' redirect='/tutor/login' admin={props.admin} token={token} />
                    </div>
                </div>
            ) : (
                <div>Access Denied or Restricted</div>
            )}
        </div>
    );
}

export default RegisterTutor;