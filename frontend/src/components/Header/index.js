import { NavLink } from 'react-router-dom';
import "./index.css";
import logo from "../../assets/CompressedBlackLogo.png";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-logo-container">
        <img src={logo} className="header-logo" />
      </div>
      <nav>
        <ul className="navbar">
          <li><NavLink to="">Dashboard</NavLink></li>
          <li><NavLink to="/tutorProfile">Profile</NavLink></li>
          <li><NavLink to="/tutor/availability/recurring">Availability</NavLink></li>
          <li><NavLink to="/schedule/12-31-2023">Schedule</NavLink></li>
          <li><NavLink to="/tutor/appointments">Appointments</NavLink></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;