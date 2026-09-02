import './RegisterForm.css';

const RegisterForm = () => {
  return (
    <div className="register-form">
      <h1>sign up</h1>
      <div className="register-inputs">
        <label htmlFor="tel">phone number</label>
        <input type="tel" name="tel" id="tel" />
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirm_password">confirm password</label>
        <input type="password" name="confirm_password" id="confirm_password" />
      </div>
      <button className="register-btn">sign up</button>
      <div className="login-link">
        <p>do you already have an account?</p>
        <a href="/login">Log in!</a>
      </div>
    </div>
  );
};

export default RegisterForm;
