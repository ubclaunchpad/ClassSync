import Header from "../../components/Header";
import Banner from "../../components/Banner";
import LoginForm from "../../components/LoginForm";
import "./index.css";

const Login = () => {
  return (
    <div className="screen-container">
      <Header />
      <Banner />
      <div className="content-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
