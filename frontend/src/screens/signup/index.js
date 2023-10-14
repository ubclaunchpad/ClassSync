import Header from "../../components/Header";
import Banner from "../../components/Banner";
import "./index.css";

const Signup = () => {
  return (
    <div className="screen-container">
      <Header />
      <Banner />
      <div className="content-container">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Signup;
