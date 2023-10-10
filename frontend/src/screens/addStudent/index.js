import Header from "../../components/Header";
import Banner from "../../components/Banner";

import "./index.css";

const AddStudent = () => {
  return (
    <div className="add-student-page"> 
            <Header />
            <Banner />
        <div class="main-row">
            <div class="column left">
                <h2>Column 1</h2>
            </div>
            <div class="column middle">
                <div className="student-info-container">
                <div class="header-row">
                    <h2 className="add-student-header">Add a Student</h2>
                    <button class="header-button">+ Add a New Student</button>
                </div>
                <form className="student-info-form">
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
                <hr className="line"></hr>
                </div>
                <div className="student-info-container">
                <h2>Column 2</h2>
                </div>
            </div>
            <div class="column right">
                <div className="right-container">
                    <h2>Column 3</h2>
                </div>
                <div className="right-container">
                    <h2>Column 3</h2>
                </div>
                <div className="right-container">
                    <h2>Column 3</h2>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AddStudent;
