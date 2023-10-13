import "./index.css";
import LeftShape from "../../assets/leftBannerShape.png";
import RightShape from "../../assets/rightBannerShape.png";
import CodeBuddy from "../../assets/CodeBuddyWhiteOutline.png";

const Banner = ({ smallText, mainText }) => {
  return <div className="banner-container">
    <img src={LeftShape} className="left-shape" />
    <img src={RightShape} className="right-shape" />
    <img src={CodeBuddy} className="code-buddy" />
    <div className="banner-text-container">
      <p className="banner-subtitle">{smallText}</p>
      <h1 className="banner-title">{mainText}</h1>
    </div>
  </div>;
};

export default Banner;
