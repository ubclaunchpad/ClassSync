import "./index.css";
import LeftShape from "../../assets/leftBannerShape.png";
import RightShape from "../../assets/rightBannerShape.png";
import CodeBuddy from "../../assets/CodeBuddyWhiteOutline.png";
import { Dropdown } from "primereact/dropdown";
import Sidebar from "../Sidebar";
import logo from "../../assets/CompressedWhiteLogo.png";

import { useAuth } from "../../contexts/AuthContext";
const Banner = ({ smallText, mainText, smallTextBelow, role, user }) => {
  let bannerContent;

  const toggleCoursesDropdown = () => {
    const coursesSublinks = document.querySelector(".courses-sublinks");
    coursesSublinks.style.display = coursesSublinks.style.display === "block" ? "none" : "block";
  };
  const choices = [
    { label: 'Action', value: '#/action-1' },
    { label: 'Another action', value: '#/action-2' },
    { label: 'Something else', value: '#/action-3' }
  ];



  if (user) {
    if (user.role === "guardian") {
      bannerContent = (
        <>
          <div className="banner-container">
            <img src={LeftShape} className="left-shape" />
            <img src={RightShape} className="right-shape" />
            <img className="mb" src={logo} style={{ width: '30px', marginLeft: '10px' }} />

            <img src={CodeBuddy} className="code-buddy" />

            <div className="banner-text-container">
              <p className="banner-subtitle">Parent Dashboard</p>

              <h1 className="banner-title">Welcome {user.name}!</h1>
              {smallTextBelow && <p className="banner-subtitle">{smallTextBelow}</p>}
            </div>
          </div>

        </>
      );
    } else if (user.role === "tutor") {
      bannerContent = (
        <div className="banner-container">
          <img src={LeftShape} className="left-shape" />
          <img src={RightShape} className="right-shape" />
          <img src={CodeBuddy} className="code-buddy" />
          <div className="banner-text-container">
            <p className="banner-subtitle">Tutor Dashboard</p>
            <h1 className="banner-title">Welcome {user.name}!</h1>
            <p className="banner-subtitle">
              {new Date(user.startdate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} - {new Date(user.enddate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>        </div>
        </div>
      );
    } else if (user.role === 'admin') {
      bannerContent = (
        <div className="banner-container">
          <img src={LeftShape} className="left-shape" />
          <img src={RightShape} className="right-shape" />
          <img src={CodeBuddy} className="code-buddy" />
          <div className="banner-text-container">
            <p className="banner-subtitle">Admin Dashboard</p>
            <h1 className="banner-title">Welcome {user.name}!</h1>
          </div>
        </div>
      );
    }

  } else {
    bannerContent = (
      <div className="banner-container">
        <img src={LeftShape} className="left-shape" />
        <img src={RightShape} className="right-shape" />
        <img src={CodeBuddy} className="code-buddy" />
        <div className="banner-text-container">
          <p className="banner-subtitle">{smallText}</p>
          <h1 className="banner-title">{mainText}</h1>
          {smallTextBelow && <p className="banner-subtitle">{smallTextBelow}</p>}
          {/* {user && <Sidebar toggleCoursesDropdown={toggleCoursesDropdown} user={user} class="menu" />} */}

        </div>
      </div>
    );
  }

  return bannerContent;
};

export default Banner;