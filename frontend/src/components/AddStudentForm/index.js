import "./index.css";

const AddStudentForm = () => {
  return (
    <form className="student-info-form">
        <div class="header-row">
                    <h2 className="add-student-header">Add a Student</h2>
                    <button class="header-button">+ Add a New Student</button>
                </div>
        <div className="input-row">
            <label>
                First Name
                <input type="text" />
            </label>
            <label>
                Date of Birth
                <input type="text" />
            </label>
        </div>
        <div className="input-row">
            <label>
                Last Name
                <input type="text" />
            </label>
            <label>
                Student ID
                <input type="text" />
            </label>
        </div>
        <input type="submit" value="Confirm Student" />
    </form>
    
  );
};

export default AddStudentForm;
