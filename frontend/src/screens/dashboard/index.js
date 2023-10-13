import "./index.css";

import Header from "../../components/Header";
import Banner from "../../components/Banner";

import addClass from "../../assets/add-class.svg";
import notifyClass from "../../assets/notify-bell.svg";

export default function Dashboard() {
  return (
    <div className="screen-container">
      <Header />
      <Banner />
      <div className="main-screen">
        <div className="left-bar">
          <div className="upcoming-classes-header">
            <div className="upcoming-classes-title">Upcoming Classes</div>
            <div className="upcoming-classes-icon-group">
              <div className="upcoming-classes-icon">
                <img src={addClass} alt="add class" />
              </div>
              <div className="upcoming-classes-icon">
                <img src={notifyClass} alt="notify class" />
              </div>
            </div>
          </div>
        </div>
        <div className="main-content"></div>
        <div className="right-bar"></div>
      </div>
    </div>
  );
}
