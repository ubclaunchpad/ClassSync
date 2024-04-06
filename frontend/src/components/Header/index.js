import "./index.css";
import logo from "../../assets/CompressedBlackLogo.png";
import Logout from "../../assets/logout.png";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const {logout, user} = useAuth()

  const navigate = useNavigate()
  const LogOut = () => {
    logout()
    navigate("/");

  }
  
  return (
    <div className="header-container">
      <div className="header-logo-container">
        <img src={logo} className="header-logo" />
        <img src={Logout} onClick={LogOut} alt="Logout" className="header-logout"/> 
      </div>
      <nav>
        {props.nav}
      </nav>
    </div>
  );
};

export default Header;