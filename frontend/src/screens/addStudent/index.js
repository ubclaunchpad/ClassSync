import Header from "../../components/Header";
import Banner from "../../components/Banner";
import SearchBar from "../../components/SearchBar";
import AddStudentForm from "../../components/AddStudentForm";
import Plus from "../../assets/plus.png";
import Notification from "../../assets/notifications.png"
import Bag from "../../assets/bag.png"

import "./index.css";

const AddStudent = () => {
  return (
    <div className="add-student-page"> 
            <Header />
            <Banner />
        <div class="main-row">
            <div class="column left">
                <div class="left-header">
                    <button class="header-button">Upcoming Classes</button>
                    <div class="right-buttons">
                        <button class="header-button-round"><img className="plusImage" src={Plus} alt="Plus" /></button>
                        <button class="header-button-round"><img className="notificationsImage" src={Notification} alt="Notification" /></button>
                    </div>
                    </div>
            </div>
            <div class="column middle">
                <div className="student-info-container">
                <div class="header-row">
                    <h2 className="add-student-header">Add a Student</h2>
                    <button class="header-button">+ Add a New Student</button>
                </div>
                <AddStudentForm />
                <hr className="line"></hr>
                </div>
                <div className="student-info-container">
                </div>
            </div>
            <div class="column right">
                <div className="right-container">
                    <div class="right-header">
                        <p className="shop-classes">Shop for Courses</p>
                        <img className="bagImage" src={Bag} alt="Bag" />
                    </div>
                    <div className="shop-courses">
                        <SearchBar />
                    </div>
                </div>
                <div className="right-container">
                </div>
                <div className="right-container">
                </div>
            </div>
        </div>
    </div>
  );
};

export default AddStudent;
