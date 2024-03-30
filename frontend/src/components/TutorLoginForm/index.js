import "./index.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TutorLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const navigate = useNavigate();

  const handleUserSubmit = async (formData) => {
    // Data will contain email (string), password (string), remember-me (boolean)
    console.log("Submitting login form!");

    console.log(formData);

    const data = {
      email: formData.email,
      password: formData.password,
    };

    const url = "http://localhost:8080"; // Replace with your actual API endpoint

    const response = await fetch(url + "/tutor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    localStorage.setItem("email", result.email);
    localStorage.setItem("role", result.role);
    localStorage.setItem("token", result.token);
    localStorage.setItem("userID", result.userId);
    localStorage.setItem("firstName", result.firstName);
    localStorage.setItem("lastName", result.lastName);

    navigate("/tutorProfile");
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
      </form>
    </div>
  );
};

export default TutorLoginForm;
