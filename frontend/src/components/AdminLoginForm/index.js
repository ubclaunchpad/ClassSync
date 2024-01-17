import "./index.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const AdminLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleUserSubmit = async (formData) => {
    // Data will contain email (string), password (string), remember-me (boolean)
    console.log("Submitting login form!");

    const data = {
      email: formData.email,
      password: formData.password,
    };

    const url = "http://localhost:8080"; // Replace with your actual API endpoint

    const response = await axios.post(
      url + "/admin/login",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("firstName", response.data.firstName);
    localStorage.setItem("lastName", response.data.lastName);

    window.location.href = "/registrations";
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
        <div className="login-checkbox-container">
          <input
            type="checkbox"
            className="login-checkbox"
            id="remember-me"
            {...register("remember-me")}
          />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <button type="submit" className="login-submit-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
