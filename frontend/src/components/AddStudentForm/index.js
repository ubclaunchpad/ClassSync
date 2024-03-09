import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddStudentForm = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        fname: '',
        lname: '',
        dob: '',
        grade: '',
        city:'',
        province: '',
        pronouns: '',
        accommodations: '',
        color: '',
    })
    const handleFormChange = (e) => { 
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
        };
      const handleColorSelection = (color) => {
          setFormState((prevState) => ({
            ...prevState,
            color: color,
          }));
        };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = {
            f_name: formState.fname,
            l_name: formState.lname,
            dob: formState.dob,
            grade: formState.grade,
            city: formState.city,
            province: formState.province,
            pronouns: formState.pronouns,
            accommodations: formState.accommodations,
            color: formState.color,
            fk_guardian_id: localStorage.getItem('userId')
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
      const colors = ["red", "blue", "green", "yellow", "purple"];
    console.log(formState);
    return (
        <form className="student-info-form" onSubmit={handleSubmit}>
            <div class="header-row">
                <h2 className="add-student-header">Add a Student</h2>
                <button class="header-button">+ Add a New Student</button>
            </div>
            <div className="input-col">
              <h3>Personal</h3>
            <div className="input-row">
                  <label>
                  First Name
                      <input name="fname" type="text" value={formState.fname} onChange={handleFormChange}/>
                  </label>
                  <label>
                    Last Name
                      <input name="lname" type="text" value={formState.lname} onChange={handleFormChange}/>
                  </label>
            </div>
            </div>
            <div className="input-col">

            </div>
            <div className="input-row">
            <label>
                    Date of Birth
                    <input name="dob" type="date" value={formState.dob} onChange={handleFormChange} />
                </label>
                <label>
                    Grade
                    <select name="grade" type="text" value={formState.grade} onChange={handleFormChange}> 
                      <option value="pre">Pre-school</option>
                        <option value="kinder">Kindergarten</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>

                </label>
            </div>
            <div className="input-col">
              <h3>Address</h3>
              <div className="input-row">
                  <label>
                      City
                      <input name="city" type="text" value={formState.city} onChange={handleFormChange}/>
                  </label>
                  <label>
                      Province
                      <input name="province" type="text" value={formState.province} onChange={handleFormChange}/>
                  </label>
              </div>
            </div>
            <div className="input-col">
              <h3>Additional</h3>
              <div className="input-row">
                  <label>
                      Pronouns
                      <input name="pronouns" type="text" value={formState.pronouns} onChange={handleFormChange}/>
                  </label>
                  <label>
                      Accommodations
                      <input name="accommodations" type="text" value={formState.accommodations} onChange={handleFormChange}/>
                  </label>
              </div>
            </div>
        <div className="input-col">
        <h3>Assign Color</h3>
        <div className="color-options">
          {/* Generate color options dynamically */}
          {colors.map((color) => (
            <div
              key={color}
              className={`color-option ${color} ${
                formState.color === color ? "selected" : ""
              }`}
              onClick={() => handleColorSelection(color)}
            ></div>
          ))}
        </div>
      </div>

            <div className="input-row">
              <input type="submit" value="Confirm Student" />
            </div>
        </form>
    );
};
export default AddStudentForm;
