import { useForm } from "react-hook-form";
import "./index.css";

const ConfirmationForm = () => {
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
    <div className="confirmation-form-container">
      <h4 className="confirmation-form-title">Confirm your email</h4>
      <div className="confirmation-form-info">
        <p>Please enter the 6-digit verification code we sent to your email</p>

        <div className="confirmation-resend-message">
          <p>Didn't get an email?</p>
          <button>
            <u>Resend code</u>
          </button>
        </div>
      </div>

      <form
        className="confirmation-input-form"
        onSubmit={handleSubmit((data) => {
          console.log("Submitting confirmation form!");
          console.log(data);
        })}
      >
        <div className="confirmation-input-container">
          <h5 className="confirmation-input-title">Verification Code</h5>
          {/* <input
            type="text"
            className="confirmation-input"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          /> */}
          {/* <p className="confirmation-error-message">
            {errors?.email?.message && errors.email.message}
          </p> */}
        </div>
        <button type="submit" className="confirmation-submit-button">
          Confirm Email
        </button>
      </form>
    </div>
  );
};

export default ConfirmationForm;
