import Header from "../../components/Header";
import Banner from "../../components/Banner";
import TutorLoginForm from "../../components/TutorLoginForm";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoginForm from "../../components/LoginForm";

const TutorLogin = () => {




  return (
    <div className="screen-container">
      <div className="content-container">
      <LoginForm role="tutor" />

      </div>
    </div>
  );
};

export default TutorLogin;
