import "./index.css";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  console.log(errors);

  return (
    <div className="user-form-container">
      <h4 className="form-title">Login</h4>
      <form
        className="input-form"
        onSubmit={handleSubmit((data) => {
          console.log("Submitting login form!");
          console.log(data);
        })}
      >
        <div className="input-container">
          <h5 className="input-title">Email</h5>
          <input
            type="text"
            className="input"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <p className="error-message">
            {errors?.email?.message && errors.email.message}
          </p>
        </div>
        <div className="input-container">
          <h5 className="input-title">Password</h5>
          <input
            type="text"
            className="input"
            {...register("password", {
              required: "Password is required!",
            })}
          />
          <p className="error-message">
            {errors?.password?.message && errors.password.message}
          </p>
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox"
            id="remember-me"
            {...register("remember-me")}
          />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <button type="submit" className="submit-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
