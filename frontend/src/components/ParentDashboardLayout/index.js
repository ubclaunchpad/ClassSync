import Header from "../Header";
import Banner from "../Banner";
import SearchBar from "../SearchBar";
import AddStudentForm from "../AddStudentForm";
import Plus from "../../assets/plus.png";
import Notification from "../../assets/notifications.png";
import Bag from "../../assets/bag.png";

import "./index.css";

export const ParentDashboardLayout = (props) => {
    return (
        <div className="page-container">
            <Header />
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
                </div>
                <div>
                <div class="column middle-right">
                    <Banner
                        smallText="Parent Dashboard"
                        mainText="Welcome Back, Insert Name!"
                    />
                    <div className="inner-row">
                        <div className="column inner-left">
                            {props.children}
                        </div>
                        <div className="column inner-right">
                            <div className="right-container">
                                <div class="right-header">
                                    <p className="shop-classes">Shop for Courses</p>
                                    <img className="bagImage" src={Bag} alt="Bag" />
                                </div>
                                <div className="shop-courses">
                                    <SearchBar />
                                </div>
                            </div>
                            <div className="right-container"></div>
                            <div className="right-container"></div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};