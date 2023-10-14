import "./index.css";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  console.log(errors);

  return (
    <div className="user-form-container">
      <h4 className="form-title">Sign Up</h4>
      <form
        className="input-form"
        onSubmit={handleSubmit((data) => {
          console.log("Submitting sign up form!");
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
            onInput={() => {
              trigger();
            }}
            {...register("password.initPassword", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters!",
              },
              validate: {
                equalPassword: (value) => {
                  return (
                    value === getValues("password.confirmPassword") ||
                    "Passwords must match!"
                  );
                },
              },
            })}
          />
          <p className="error-message">
            {errors?.password?.initPassword?.message &&
              errors.password.initPassword.message}
          </p>
        </div>
        <div className="input-container">
          <h5 className="input-title">Confirm Password</h5>
          <input
            type="text"
            className="input"
            onInput={() => {
              trigger();
            }}
            {...register("password.confirmPassword", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters!",
              },
              validate: {
                equalPassword: (value) => {
                  return (
                    value === getValues("password.initPassword") ||
                    "Passwords must match!"
                  );
                },
              },
            })}
          />
          <p className="error-message">
            {errors?.password?.confirmPassword?.message &&
              errors.password.confirmPassword.message}
          </p>
        </div>
        <button type="submit" className="submit-button">
          Confirm Email
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
