import Header from "../Header";
import Banner from "../Banner";
import SearchBar from "../SearchBar";
import AddStudentForm from "../AddStudentForm";
import Plus from "../../assets/plus.png";
import ProfilePic from "../../assets/parentProfile.png"
import Notification from "../../assets/notifications.png";
import Bag from "../../assets/bag.png";
import { NavLink } from "react-router-dom";

import "./index.css";

export const ParentDashboardLayout = (props) => {
    return (
        <div className="page-container">
            <Header
            />
            <div class="main-row">

                <div class="column left-span">
                    <div class="left-header">
                        <button class="header-button">Upcoming Classes</button>
                        <div class="right-buttons">
                            <button class="header-button-round">
                                <img className="plusImage" src={Plus} alt="Plus" />
                            </button>
                            <button class="header-button-round">
                                <img
                                    className="notificationsImage"
                                    src={Notification}
                                    alt="Notification"
                                />
                            </button>
                        </div>
                    </div>
                    <img className="profile-pic"
                        src={ProfilePic} />
                    <div className="table-of-contents">
                        <ul>
                            <li><a href="/parentDash">Adam Bennett</a></li>
                            <li><a href="/parentDash">Children</a></li>
                            <li><a href="/shop">Courses</a></li>
                            <li><a href="/tutors">Tutors</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div class="column middle-right">
                        <Banner
                            smallText="Parent Dashboard"
                            mainText="Welcome Back!"
                        />
                        <div className="inner-row">
                            <div className="column inner-left">
                                {props.children}
                            </div>
                            <div className="column inner-right">
                                {props.rightColumnContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};