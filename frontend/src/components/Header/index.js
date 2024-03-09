import { NavLink } from 'react-router-dom';
import "./index.css";
import logo from "../../assets/CompressedBlackLogo.png";
import Logout from "../../assets/logout.png";

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="header-logo-container">
        <img src={logo} className="header-logo" />
        <img src={Logout} alt="Logout" className="header-logout"/>
      </div>
      <nav>
        {props.nav}
      </nav>
    </div>
  );
};

export default Header;