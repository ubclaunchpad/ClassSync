import { NavLink } from 'react-router-dom';
import "./index.css";
import logo from "../../assets/CompressedBlackLogo.png";

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="header-logo-container">
        <img src={logo} className="header-logo" />
      </div>
      <nav>
        {props.nav}
      </nav>
    </div>
  );
};

export default Header;