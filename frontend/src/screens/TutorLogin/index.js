import Header from "../../components/Header";
import Banner from "../../components/Banner";
import TutorLoginForm from "../../components/TutorLoginForm";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const TutorLogin = () => {




  return (
    <div className="screen-container">
      <div className="content-container">
        <TutorLoginForm />

      </div>
    </div>
  );
};

export default TutorLogin;
