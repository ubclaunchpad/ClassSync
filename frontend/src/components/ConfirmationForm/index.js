import { useState } from "react";
import useVerificationHook from "./useVerificationHook";
import "./index.css";

const ConfirmationForm = () => {
  const { code, inputStates, inputClass, handleChange, handleKeyDown } =
    useVerificationHook(6);

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code !== null) {
      // TODO: Need to verify after checking code is 6 digits!
      console.log(`code: ${code}`);
      setError(null);
    } else {
      setError("Please enter a valid code!");
    }
  };

  const handleResendCode = () => {
    console.log("Resend code button clicked!")
  }

  return (
    <div className="confirmation-form-container">
      <div className="confirmation-form-info">
        <h4 className="confirmation-form-title">Confirm your email</h4>
        <p>Please enter the 6-digit verification code we sent to your email</p>

        <div className="confirmation-resend-message">
          <p>Didn't get an email?</p>
          <button onClick={handleResendCode}>
            <u>Resend code</u>
          </button>
        </div>
      </div>

      <form className="confirmation-input-form" onSubmit={handleSubmit}>
        <div className="confirmation-input-container">
          <h5 className="confirmation-input-title">Verification Code</h5>

          <div className="confirmation-input-parent">
            {inputStates.map((state, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  value={state.digit}
                  className={inputClass}
                  maxLength="1"
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={handleKeyDown}
                />
              );
            })}
          </div>
          <p className="confirmation-error-message">{error}</p>
        </div>
        <button type="submit" className="confirmation-submit-button">
          Confirm Email
        </button>
      </form>
    </div>
  );
};

export default ConfirmationForm;
