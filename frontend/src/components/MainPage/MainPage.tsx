import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../../App.css';
import useCart from '../../hooks/useCart';
import Header from '../Header/Header';
import PatchForm from '../PatchForm/PatchForm';
import PostForm from '../PostForm/PostForm';
import ShoeCard from '../ShoeCard/ShoeCard';
import './MainPage.css';

import useFetch from '../../hooks/useFetch';
import { Shoe } from '../../types/cart';
import Cart from '../Cart/Cart';
import CatalogControls from '../CatalogControls/CatalogControls';
import Footer from '../Footer/Footer';
import SplashScreen from '../SplashScreen/SplashScreen';

let notificationTimer: number;

function MainPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { cart, addToCart, deleteFromCart, cartTotal } = useCart();
  const [role, setRole] = useState('user');
  const [mode, setMode] = useState(false);
  const [defForm, setDefForm] = useState<Shoe | undefined>();
  const [shoeSelect, setShoeSelect] = useState<number>();
  const [notification, setNotification] = useState('');
  const [splashScreen, setSplashScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const editMode = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/api/shoes/${id}`);

      if (!res.ok) {
        throw new Error('Произошла ошибка на сервере');
      }

      const data = await res.json();

      setMode((prev) => !prev);
      setDefForm(data);
      setShoeSelect(id);
    } catch (error) {
      if (error instanceof Error) {
        callNotification(`Ошибка ${error.message}`);
      } else {
        console.log('Неизвестный тип ошибки:', error);
      }
    }
  };

  const callNotification = (text: string) => {
    clearTimeout(notificationTimer);
    setNotification(text);

    notificationTimer = setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const { data: shoes = [], refetch } = useFetch<Shoe[]>(
    'http://127.0.0.1:4000/api/shoes',
  );

  const postData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const shoeData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('http://127.0.0.1:4000/api/shoes', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'role-user': role,
        },
        body: JSON.stringify(shoeData),
      });

      if (!res.ok) {
        throw new Error('Произошла ошибка на сервере');
      }

      await refetch();

      callNotification('Товар добавлен в каталог');
    } catch (error) {
      if (error instanceof Error) {
        callNotification(`Ошибка: ${error.message}`);
      } else {
        console.log('Неизвестный тип ошибки:', error);
      }
    }
  };

  const patchData = async (
    event: React.FormEvent<HTMLFormElement>,
    id: number,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const shoeData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`http://127.0.0.1:4000/api/shoes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(shoeData),
      });

      if (!res.ok) {
        throw new Error('Произошла ошибка на сервере');
      }

      await refetch();

      callNotification('Изменения успешно сохранены');
    } catch (error) {
      if (error instanceof Error) {
        callNotification(`Ошибка: ${error.message}`);
      } else {
        console.log('Неизвестный тип ошибки:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/api/shoes/${id}`, {
        method: 'delete',
        headers: {
          'role-user': role,
        },
      });

      if (!res.ok) {
        throw new Error('Произошла ошибка на сервере');
      }

      await refetch();

      callNotification('Товар удален');
    } catch (error) {
      if (error instanceof Error) {
        callNotification(`Ошибка: ${error.message}`);
      } else {
        console.log('Неизвестный тип ошибки:', error);
      }
    }
  };

  const changeFilter = (filter: string) => {
    setFilter(filter);
  };

  const editSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.toLowerCase();

    setSearch(text);
  };

  const setCategories = new Set(shoes.map((item) => item.category));
  const listCategories = Array.from(setCategories);

  const SelectedRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  return (
    <>
      <div className="page-container">
        {splashScreen && <SplashScreen />}
        <Header editSearch={editSearch} />
        <div className="main-page">
          <select name="role" id="role" onChange={SelectedRole}>
            <option value="user">Войти как пользователь</option>
            <option value="admin">Войти как Админ</option>
          </select>

          {role === 'admin' &&
            (mode && shoeSelect ? (
              <PatchForm
                patchData={patchData}
                shoeSelect={shoeSelect}
                defForm={defForm}
              />
            ) : (
              <PostForm postData={postData} />
            ))}

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CatalogControls
                    filter={filter}
                    changeFilter={changeFilter}
                    listCategories={listCategories}
                  />

                  <div className="card-grid">
                    {shoes
                      .filter(
                        (item) => filter === 'all' || item.category === filter,
                      )
                      .filter(
                        (item) =>
                          item.title.toLowerCase().includes(search) ||
                          item.brand.toLowerCase().includes(search),
                      )
                      .map((item) => (
                        <ShoeCard
                          key={item.id}
                          item={item}
                          handleDelete={handleDelete}
                          addToCart={(item) =>
                            addToCart(item, () =>
                              callNotification('Товар добавлен в корзину'),
                            )
                          }
                          role={role}
                          editMode={editMode}
                        />
                      ))}
                  </div>
                </>
              }
            />

            <Route
              path="/cart"
              element={
                role === 'admin' ? null : (
                  <Cart
                    cartTotal={cartTotal}
                    cart={cart}
                    deleteFromCart={deleteFromCart}
                    addToCart={addToCart}
                  />
                )
              }
            />
          </Routes>

          {notification !== '' ? (
            <div className="notification">{notification}</div>
          ) : null}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default MainPage;
