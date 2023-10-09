import "./index.css";

const UserForm = () => {
  const onSubmit = () => {};

  // TODO: Use react-hook-forms
  return (
    <div className="user-form-container">
      <h4 className="form-title">Sign Up</h4>
      <form className="input-form">
        <div className="input-container" onSubmit={onSubmit}>
          <h5 className="input-title">Email</h5>
          <input type="text" className="input" />
        </div>
        <div className="input-container">
          <h5 className="input-title">Password</h5>
          <input type="text" className="input" />
        </div>
        <div className="input-container">
          <h5 className="input-title">Confirm Password</h5>
          <input type="text" className="input" />
        </div>
      </form>
      <button type="submit" className="submit-button">
        Confirm Email
      </button>
    </div>
  );
};

export default UserForm;
