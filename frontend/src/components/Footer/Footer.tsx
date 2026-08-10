import fb from '../../../img/facebook.svg';
import inst from '../../../img/inst.svg';
import logo from '../../../img/logo.svg';
import yt from '../../../img/youtube.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <img className="footer-logo" src={logo} alt="logo" />

      <div className="social-medias">
        <a href="">
          <img src={fb} alt="fb" />
        </a>
        <a href="">
          <img src={yt} alt="yt" />
        </a>
        <a href="">
          <img src={inst} alt="inst" />
        </a>
      </div>
      <div className="footer-links">
        <a href="#">home</a>
        <a href="#">about</a>
        <a href="#">contact us</a>
        <a href="#">our team</a>
      </div>
    </footer>
  );
};

export default Footer;
