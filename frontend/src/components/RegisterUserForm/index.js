import React, { useState, useRef } from 'react';
import "./index.css"; // Import the CSS file for styling
import { v4 as uuidv4 } from 'uuid';


const RegisterUserForm = (props) => {

    console.log(props)
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
    const fileInput = useRef();

    const [imageUrl, setImageUrl] = useState(null);
  
  

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

    
const handleClick = () => {
    fileInput.current.click();
};
    const handleUpload = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            alert('Please select an image to upload.');
            return;
        }

        const uuid = uuidv4(); // Generate a UUID
        const modifiedFileName = `${uuid}_${selectedFile.name}`;

        const formData = new FormData();
        formData.append('image', selectedFile, modifiedFileName);

        fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);

                // Assuming the server responds with the uploaded image URL
                const uploadedImageUrl = data.imageUrl;
                setImageUrl(uploadedImageUrl);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
            const response = await fetch("http://localhost:8080/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    fname: firstName,
                    lname: lastName,
                    image: imageUrl,
                    role: props.role
                })
            });

            if (response.status === 200) {
                const responseData = await response.json();
                console.log('User account created:', responseData);
                if (!props.admin && props.token) {
                    try {
                        await fetch(`http://localhost:8080/token/${props.token}`, {
                            method: 'DELETE',
                        });                       

                    } catch(error) {
                        console.log("Token not found");
                        console.error('Error:', error);
                    }
                }
                window.location.href = props.redirect;
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

            <div className="header-row" style={{ justifyContent: 'center' }}>

            <div style={{marginLeft:'-160px'}}>
      <input type="file" ref={fileInput} onChange={handleUpload} style={{ display: 'none' }} />
      

{imageUrl ? (
      <img 
        src={imageUrl} 
        alt="Uploaded" 
        style={{ 
            borderRadius: '50%', 
            width: '100px', 
            minHeight: '100px', 
            objectFit: 'cover',
            border: '2px solid #333',
            padding: '5px',
        }} 
        onClick={handleClick}

      />
    ) : (
        <img
        src='https://t4.ftcdn.net/jpg/05/69/90/73/360_F_569907313_fl7W3gX7YIVw2r05B4Ij1c21ix4xRUqD.jpg'
        alt="Uploaded"
        style={{
            borderRadius: '50%', 
            width: '100px', 
            minHeight: '100px', 
            objectFit: 'cover',
            border: '2px solid #333',
            padding: '5px',
        }}
        onClick={handleClick}
      />
    )}
  <p style={{ textAlign: 'center', marginTop: '3px', marginBottom:'-5px' }}>Select a profile picture</p>
</div>

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

export default RegisterUserForm;
