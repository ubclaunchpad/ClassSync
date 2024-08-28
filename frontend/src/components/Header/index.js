import "./index.css";
import logo from "../../assets/CompressedBlackLogo.png";
import Logout from "../../assets/logout.png";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

import Sidebar from "../Sidebar";

const Header = (props) => {
  const { logout, user } = useAuth()
  const dropdownVisible = useState(true)

  const navigate = useNavigate()
  const LogOut = () => {
    logout()
    if (user && user.role === 'tutor') {
      navigate("/tutor/login")

    } else if (user && user.role === 'admin') {
      navigate("/admin/login")
    } else {
      navigate("/")

    }
  }

  const toggleCoursesDropdown = () => {
    const coursesSublinks = document.querySelector(".courses-sublinks");
    coursesSublinks.style.display = coursesSublinks.style.display === "block" ? "none" : "block";
  };

  return (
    <div className="header-container pc">
      <div className="header-logo-container" style={{ minHeight: '30px' }}>

        <img src={logo} className="header-logo" style={{ height: '28px', width: 'auto' }} />




        <img src={Logout} onClick={LogOut} alt="Logout" className="header-logout" />
      </div>
      <nav>
        {props.nav}
      </nav>
    </div>
  );
};

export default Header;