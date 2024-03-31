import Header from "../../components/Header";
import Banner from "../../components/Banner";
import "./index.css";
import AddStudentForm from "../../components/AddStudentForm";
import Plus from "../../assets/plus.png";
import Notification from "../../assets/notifications.png";
import Bag from "../../assets/bag.png";

import "./index.css";

const AddStudent = (props) => {
  return (
<div className="page-container">
         
            <div class="main-row">
                <div class="column left-student">
                </div>
                <div class="column middle">
                <div className="student-info-container">
                    <AddStudentForm />
                    <hr className="line"></hr>
                </div>
                <div className="student-info-container"></div>
                </div>
                <div class="column right">
                </div>
            </div>
        </div>
  );
};

export default AddStudent;