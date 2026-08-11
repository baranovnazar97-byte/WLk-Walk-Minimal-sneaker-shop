import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import '../../App.css';
import useCart from '../../hooks/useCart';
import Header from '../Header/Header';
import ShoeCard from '../ShoeCard/ShoeCard';
import SplashScreen from '../SplashScreen/SplashScreen';
import './MainPage.css';

import useFetch from '../../hooks/useFetch';
import { Shoe } from '../../types/cart';
import CatalogControls from '../CatalogControls/CatalogControls';
import Footer from '../Footer/Footer';

let notificationTimer: number;

function MainPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { cart, addToCart, deleteFromCart, cartTotal } = useCart();
  const [notification, setNotification] = useState('');
  const [splashScreen, setSplashScreen] = useState(() => {
    return sessionStorage.getItem('splashShown') !== 'true';
  });

  useEffect(() => {
    if (!splashScreen) return;

    const timer = setTimeout(() => {
      setSplashScreen(false);
      sessionStorage.setItem('splashShown', 'true');
    }, 1800);

    return () => clearTimeout(timer);
  }, [splashScreen]);

  const callNotification = (text: string) => {
    clearTimeout(notificationTimer);
    setNotification(text);

    notificationTimer = setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const { data: shoes = [] } = useFetch<Shoe[]>(
    'http://127.0.0.1:4000/api/shoes',
  );

  const changeFilter = (filter: string) => {
    setFilter(filter);
  };

  const editSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.toLowerCase();

    setSearch(text);
  };

  const setCategories = new Set(shoes.map((item) => item.category));
  const listCategories = Array.from(setCategories);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="page-container">
      {splashScreen && <SplashScreen />}

      <Header editSearch={editSearch} />

      <div className="main-page">
        {isHomePage && (
          <>
            <CatalogControls
              filter={filter}
              changeFilter={changeFilter}
              listCategories={listCategories}
            />

            <div className="card-grid">
              {shoes
                .filter((item) => filter === 'all' || item.category === filter)
                .filter(
                  (item) =>
                    item.title.toLowerCase().includes(search) ||
                    item.brand.toLowerCase().includes(search),
                )
                .map((item) => (
                  <ShoeCard
                    key={item.id}
                    item={item}
                    addToCart={(item) =>
                      addToCart(item, () =>
                        callNotification('Item added to cart'),
                      )
                    }
                  />
                ))}
            </div>
          </>
        )}

        <Outlet
          context={{
            cart,
            addToCart,
            deleteFromCart,
            cartTotal,
            callNotification,
          }}
        />

        {notification !== '' ? (
          <div className="notification">{notification}</div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
