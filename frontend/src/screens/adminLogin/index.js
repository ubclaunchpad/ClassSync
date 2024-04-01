import Header from "../../components/Header";
import Banner from "../../components/Banner";
import AdminLoginForm from "../../components/AdminLoginForm";
import "./index.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;
