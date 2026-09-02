import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="login-form">
      <h1>log in</h1>
      <div className="login-inputs">
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
      </div>
      <button className="login-btn">log in</button>
      <div className="register_link">
        <p>don't have an account yet?</p>
        <a href="/register">Sign up!</a>
      </div>
    </div>
  );
};

export default LoginForm;
