import "./index.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
 
const { register, handleSubmit, formState: { errors }, setError } = useForm({
  mode: "onBlur",
});
  const navigate = useNavigate();

  const handleUserSubmit = async (formData) => {
    // Data will contain email (string), password (string), remember-me (boolean)
    console.log("Submitting login form!");
    console.log(
      `{
        email: ${formData.email},
        password: ${formData.password},
        API URL: ${process.env.REACT_APP_API_URL}
      }`
    )

    const data = {
      email: formData.email,
      password: formData.password,
    };

    const url = "http://localhost:8080"; // Replace with your actual API endpoint

    // For parent login
    const response = await fetch(url + "/parent/login", {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) { 
      setError("general", {
        type: "manual",
        message: "Incorrect username or password"
      });

    }
   
    const res = await response.json();

    localStorage.setItem("token", res.token);
    localStorage.setItem("firstName", res.firstName);
    localStorage.setItem("lastName", res.lastName);
    localStorage.setItem("userId", res.userId);
    navigate("/parentDash");
  };

  return (
    <div className="login-form-container">
      <h4 className="login-form-title">Login</h4>
      <form
        className="login-input-form"
        onSubmit={handleSubmit(handleUserSubmit)}
      >
        <div className="login-input-container">
          <h5 className="login-input-title">Email</h5>
          <input
            type="text"
            className="login-input"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <p className="login-error-message">
            {errors?.email?.message && errors.email.message}
          </p>
        </div>
        <div className="login-input-container">
          <h5 className="login-input-title">Password</h5>
          <input
            type="password"
            className="login-input"
            {...register("password", {
              required: "Password is required!",
            })}
          />
          <p className="login-error-message">
            {errors?.password?.message && errors.password.message}
          </p>
        </div>
       
        <button type="submit" className="login-submit-button">
          Log In
        </button>
        <p className="login-error-message">
            {errors.general && errors.general.message}
          </p>
      </form>
    </div>
  );
};

export default LoginForm;
