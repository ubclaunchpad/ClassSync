import Header from "../../components/Header";
import Banner from "../../components/Banner";
import UserForm from "../../components/UserForm";
import "./index.css";

const Login = () => {
  return (
    <div className="screen-container">
      <Header />
      <Banner />
      <div className="content-container">
        <UserForm />
      </div>
    </div>
  );
};

export default Login;
