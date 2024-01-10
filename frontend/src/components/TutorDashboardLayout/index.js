import Header from "../Header";
import Banner from "../Banner";
import Plus from "../../assets/plus.png";
import Notification from "../../assets/notifications.png";
import Logout from "../../assets/logout.png";

import "./index.css";

export const TutorDashboardLayout = ({ name, rightColumnContent, ...props }) => {
  let displayName = name !== undefined ? " Back, " + name : "";
  return (

    <div className="page-container">
      <Header />
      <Banner
        smallText="Tutor Dashboard"
        mainText={`Welcome${displayName}!`}
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

              <button
                class="header-button-round"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/tutor/login';
                }}
              >
                <img src={Logout} alt="Logout" />
              </button>
            </div>
          </div>
        </div>

        <div class="column middle">{props.children}</div>

        {rightColumnContent && (
          <div class="column right">{rightColumnContent}</div>
        )}
      </div>
    </div>
  );
};
