import Header from "../../components/Header";
import Banner from "../../components/Banner";
import TutorLoginForm from "../../components/TutorLoginForm";
import "./index.css";

const TutorLogin = () => {


  return (
    <div className="screen-container">
      <Header />
      <Banner />
      <div className="content-container">
        <TutorLoginForm />

      </div>
    </div>
  );
};

export default TutorLogin;
