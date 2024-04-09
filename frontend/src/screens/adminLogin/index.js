import Header from "../../components/Header";
import Banner from "../../components/Banner";
import AdminLoginForm from "../../components/AdminLoginForm";
import "./index.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

const AdminLogin = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (user && user.role === 'admin') {
    navigate("/registrations");
  
  } else {
    logout()
  }


  return (
    <div className="screen-container">
      <div className="content-container">
        <LoginForm role="admin" />
      </div>
    </div>
  );
};

export default AdminLogin;
