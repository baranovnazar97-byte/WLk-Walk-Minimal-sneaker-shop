import { Link, useLocation } from 'react-router-dom';
import user from '../../../img/account_circle.svg';
import LogoIcon from '../../../img/logo.svg?react';
import cart from '../../../img/shopping_cart.svg';
import './Header.css';

interface IHeaderProps {
  editSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  splashScreen: boolean;
}

const Header = ({ editSearch, splashScreen }: IHeaderProps) => {
  const location = useLocation();

  const isProductPage = location.pathname.startsWith('/shoes/');
  return (
    <>
      {splashScreen ? null : (
        <header>
          <div className="header-links">
            <a href="#">home</a>
            <a href="#">about</a>
            <a href="#">contact us</a>
            <a href="#">our team</a>
          </div>

          <div className="logo">
            <Link to="/">
              <LogoIcon className="logo-svg" />
            </Link>
            <p className="slogan">Easy to pronounce, easy to wear</p>
          </div>

          <div className="user-buttons">
            {!isProductPage ? (
              <input
                className="search-input"
                type="text"
                name="search"
                placeholder="Поиск по названию..."
                onChange={editSearch}
              />
            ) : null}

            <Link to="/cart" className="user-button">
              <img src={cart} />
            </Link>

            <Link to="#" className="user-button">
              <img src={user} />
            </Link>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
