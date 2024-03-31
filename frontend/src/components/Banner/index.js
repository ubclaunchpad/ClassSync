import "./index.css";
import LeftShape from "../../assets/leftBannerShape.png";
import RightShape from "../../assets/rightBannerShape.png";
import CodeBuddy from "../../assets/CodeBuddyWhiteOutline.png";

const Banner = ({ smallText, mainText, smallTextBelow, role, user }) => {
  let bannerContent;

  if (user) {
  if (user.role === "guardian") {
    bannerContent = (
      <div className="banner-container">
        <img src={LeftShape} className="left-shape" />
        <img src={RightShape} className="right-shape" />
        <img src={CodeBuddy} className="code-buddy" />
        <div className="banner-text-container">
          <p className="banner-subtitle">Parent Dashboard</p>
          <h1 className="banner-title">Welcome {user.name}!</h1>
          {smallTextBelow && <p className="banner-subtitle">{smallTextBelow}</p>}
        </div>
      </div>
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
          {smallTextBelow && <p className="banner-subtitle">TBD - Start date end date</p>}
        </div>
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
        </div>
      </div>
    );
  }

  return bannerContent;
};

export default Banner;