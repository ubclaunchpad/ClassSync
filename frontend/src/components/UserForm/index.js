import "./index.css";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  // TODO: Incomplete
  return (
    <div className="user-form-container">
      <h4 className="form-title">Sign Up</h4>
      <form
        className="input-form"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="input-container">
          <h5 className="input-title">Email</h5>
          <input
            type="text"
            className="input"
            {...register("email", { required: "Email is required!" })}
          />
        </div>
        <div className="input-container">
          <h5 className="input-title">Password</h5>
          <input
            type="text"
            className="input"
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
        </div>
        <div className="input-container">
          <h5 className="input-title">Confirm Password</h5>
          <input
            type="text"
            className="input"
            {...register("confirmPassword", {
              required: "Confirm password is required!",
              minLength: {
                value: 8,
                message: "Confirm password must be at least 8 characters",
              },
            })}
          />
        </div>
        <button type="submit" className="submit-button">
          Confirm Email
        </button>
      </form>
    </div>
  );
};

export default UserForm;
