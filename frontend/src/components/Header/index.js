import "./index.css";
import logo from "../../assets/CompressedBlackLogo.png";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-logo-container">
        <img src={logo} className="header-logo" />
      </div>
    </div>
  );
};

export default Header;
