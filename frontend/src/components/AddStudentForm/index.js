import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddStudentForm = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        fname: '',
        lname: '',
        dob: '',
        accommdations: '',
    })
    const handleFormChange = (e) => { 
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
        };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = {
            f_name: formState.fname,
            l_name: formState.lname,
            dob: formState.dob,
            accommodations: formState.accommodations,
            fk_guardian_id: 6 // TODO remove hardcoding
          };
        try {
          const res = await fetch(
            "http://localhost:8080/student-profile",
            {
              body: JSON.stringify(
                studentData),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            }
          );
          console.log(res.body);
          navigate('/parentDash');
        } catch (error) {
          console.log(error);
        }
      }
    console.log(formState);
    return (
        <form className="student-info-form" onSubmit={handleSubmit}>
            <div class="header-row">
                <h2 className="add-student-header">Add a Student</h2>
                <button class="header-button">+ Add a New Student</button>
            </div>
            <div className="input-row">
                <label>
                    First Name
                    <input name="fname" type="text" value={formState.fname} onChange={handleFormChange}/>
                </label>
                <label>
                    Date of Birth
                    <input name="dob" type="text" value={formState.dob} onChange={handleFormChange} />
                </label>
            </div>
            <div className="input-row">
                <label>
                    Last Name
                    <input name="lname" type="text" value={formState.lname} onChange={handleFormChange}/>
                </label>
                <label>
                    Accommodations
                    <input name="accommodations" type="text" value={formState.accommodations} onChange={handleFormChange}/>
                </label>
            </div>
            <input type="submit" value="Register Student" />
        </form>
    );
};
export default AddStudentForm;
