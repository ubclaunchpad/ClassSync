import Header from "../../components/Header";
import Banner from "../../components/Banner";
import LoginForm from "../../components/LoginForm";
import "./index.css";

const Login = () => {
  // TODO: Redirect to sign up page
  const signUpOnClick = () => {
    console.log("Sign Up button clicked!");
  };

  return (
    <div className="screen-container">
      <Header />
      <Banner />
      <div className="content-container">
        <LoginForm />
        <div className="signup-container">
          <h2>New to the Code Initiative?</h2>
          <button onClick={signUpOnClick}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
