import Header from "../../components/Header";
import Banner from "../../components/Banner";
import "./index.css";
import SearchBar from "../../components/SearchBar";
import AddStudentForm from "../../components/AddStudentForm";
import Plus from "../../assets/plus.png";
import Notification from "../../assets/notifications.png";
import Bag from "../../assets/bag.png";

import "./index.css";
import { ParentDashboardLayout } from "../../components/ParentDashboardLayout";

const AddStudent = (props) => {
  return (
    <ParentDashboardLayout>
      <div className="student-info-container">
        <AddStudentForm />
        <hr className="line"></hr>
      </div>
      <div className="student-info-container"></div>
    </ParentDashboardLayout>
  );
};

export default AddStudent;
