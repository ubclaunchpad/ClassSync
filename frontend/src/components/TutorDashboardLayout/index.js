import Header from "../Header";
import Banner from "../Banner";
import Plus from "../../assets/plus.png";
import Notification from "../../assets/notifications.png";

import "./index.css";

export const TutorDashboardLayout = (props) => {
  return (
    <div className="page-container">
      <Header />
      <Banner
        smallText="Tutor Dashboard"
        mainText="Welcome Back, Insert Name!"
      />
      <div class="main-row">
        <div class="column left">
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
        <div class="column middle">{props.children}</div>
      </div>
    </div>
  );
};
