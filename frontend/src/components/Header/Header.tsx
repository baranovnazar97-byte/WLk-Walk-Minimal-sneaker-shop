import { Link } from 'react-router-dom';
import user from '../../../img/account_circle.svg';
import logo from '../../../img/logo.svg';
import cart from '../../../img/shopping_cart.svg';
import './Header.css';

interface IHeaderProps {
  editSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = ({ editSearch }: IHeaderProps) => {
  return (
    <header>
      <div className="header-links">
        <a href="#">home</a>
        <a href="#">about</a>
        <a href="#">contact us</a>
        <a href="#">our team</a>
      </div>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="logo-img" />
        </Link>
        <p className="slogan">Easy to pronounce, easy to wear</p>
      </div>
      <div className="user-buttons">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="Поиск по названию..."
          onChange={editSearch}
        />
        <Link to="/cart" className="user-button">
          <img src={cart} />
        </Link>
        <button className="user-button">
          <img src={user} />
        </button>
      </div>
    </header>
  );
};

export default Header;
