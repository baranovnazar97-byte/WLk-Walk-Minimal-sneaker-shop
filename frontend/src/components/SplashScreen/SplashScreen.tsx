import logo from '../../../img/logo.svg';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <>
      <div className="splash-screen">
        <div className="splash-content">
          <img src={logo} alt="logo" />
          <p>Easy to pronounce, easy to wear</p>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
