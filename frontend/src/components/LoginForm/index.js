import "./index.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import React, { useState } from "react";

const LoginForm = () => {
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://localhost:8080";

  if (user) {
    switch (user.role) {
      case "guardian":
        navigate("/parentDash");
      case "admin":
        navigate("/registrations");
      case "tutor":
        navigate("/tutorprofile");
    }
  } else {
    logout();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const parentLogin = async (data) => {
    const parentResponse = await fetch(url + "/parent/login", {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!parentResponse.ok) {
      throw new Error(`cannot login to parent`);
    } else {
      setLoginSuccess(true);
      const res = await parentResponse.json();

      localStorage.setItem("token", res.token);
      localStorage.setItem("firstName", res.firstName);
      localStorage.setItem("lastName", res.lastName);
      localStorage.setItem("userId", res.userId);
      console.log("Res", res.user);
      const userData = {
        name: res.firstName + " " + res.lastName,
        role: "guardian",
        children: [],
      }; // Example user data
      login(res.user);
      navigate("/parentDash");
    }
  };

  const tutorLogin = async (data) => {
    const tutorResponse = await fetch(url + "/tutor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!tutorResponse.ok) {
      throw new Error(`cannot login to tutor`);
    } else {
      setLoginSuccess(true);
      const result = await tutorResponse.json();
      console.log(result);
      localStorage.setItem("email", result.email);
      localStorage.setItem("role", result.role);
      localStorage.setItem("token", result.token);
      localStorage.setItem("userID", result.userId);
      localStorage.setItem("firstName", result.firstName);
      localStorage.setItem("lastName", result.lastName);

      const userData = {
        name: result.firstName + " " + result.lastName,
        role: "tutor",
        courses: [],
      }; // Example user data
      login(result.user);
      navigate("/tutorprofile");
    }
  };

  const adminLogin = async (data) => {
    const adminResponse = await fetch(url + "/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!adminResponse.ok) {
      throw new Error(`cannot login to admin`);
    } else {
      setLoginSuccess(true);
      const res = await adminResponse.json();

      localStorage.setItem("token", res.token);
      localStorage.setItem("firstName", res.firstName);
      localStorage.setItem("lastName", res.lastName);

      const userData = {
        name: res.firstName + " " + res.lastName,
        role: "admin",
      }; // Example user res
      login(res.user);

      navigate("/registrations");
    }
  };

  const handleUserSubmit = async (formData) => {
    // Data will contain email (string), password (string), remember-me (boolean)
    setIsLoading(true);
    console.log("Submitting login form!");
    console.log(
      `{
        email: ${formData.email},
        password: ${formData.password},
        API URL: ${process.env.REACT_APP_API_URL}
      }`
    );

    const data = {
      email: formData.email,
      password: formData.password,
    };
    await parentLogin(data).catch((e) => {
      tutorLogin(data).catch((e) => {
        adminLogin(data).catch((e) => {
          setError("general", {
            type: "manual",
            message: "Incorrect username or password",
          });

          setIsLoading(false);
        });
      });
    });
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
        {isLoading ? (
          <p>Logging in...</p>
        ) : (
          <button type="submit" className="login-submit-button">
            Log In
          </button>
        )}

        <p className="login-error-message">
          {errors.general && errors.general.message}
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
