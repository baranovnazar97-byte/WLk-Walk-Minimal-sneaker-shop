import { useEffect, useState } from 'react';
import '../../App.css';
import CartCard from '../CartCard/CartCard';
import PatchForm from '../PatchForm/PatchForm';
import PostForm from '../PostForm/PostForm';
import ShoeCard from '../ShoeCard/ShoeCard';
import './MainPage.css';

let notificationTimer: number;

export interface Shoe {
  id: number;
  imageUrl: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  sizes: number;
}

interface CartItem extends Shoe {
  quantity: number;
}

function MainPage() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [filter, setFilter] = useState('Все');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [role, setRole] = useState('user');
  const [mode, setMode] = useState(false);
  const [defForm, setDefForm] = useState<Shoe | undefined>();
  const [shoeSelect, setShoeSelect] = useState<number>();
  const [notification, setNotification] = useState('');

  const editMode = async (id: number) => {
    setMode((prev) => !prev);

    const res = await fetch(`http://127.0.0.1:4000/api/shoes/${id}`);

    const data = await res.json();

    setDefForm(data);
    setShoeSelect(id);
  };

  const callNotification = (text: string) => {
    clearTimeout(notificationTimer);
    setNotification(text);

    notificationTimer = setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://127.0.0.1:4000/api/shoes');

      const data = await res.json();

      setShoes(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const postData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const shoeData = Object.fromEntries(formData.entries());

    const res = await fetch('http://127.0.0.1:4000/api/shoes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'role-user': role,
      },
      body: JSON.stringify(shoeData),
    });

    const newShoe = await res.json();

    setShoes((prev) => [...prev, newShoe]);

    callNotification('Товар добавлен в каталог');
  };

  const patchData = async (
    event: React.FormEvent<HTMLFormElement>,
    id: number,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const shoeData = Object.fromEntries(formData.entries());

    const res = await fetch(`http://127.0.0.1:4000/api/shoes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(shoeData),
    });

    const patchShoe = await res.json();

    setShoes(shoes.map((item) => (item.id === id ? patchShoe : item)));

    callNotification('Изменения успешно сохранены');
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://127.0.0.1:4000/api/shoes/${id}`, {
      method: 'delete',
      headers: {
        'role-user': role,
      },
    });

    setShoes((prev) => prev.filter((item) => item.id !== id));

    callNotification('Товар удален');
  };

  const editFilter = (filter: string) => {
    setFilter(filter);
  };

  const editSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.toLowerCase();

    setSearch(text);
  };

  const addToCart = (item: Shoe) => {
    const isItemInCart = cart.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    callNotification('Товар добавлен в корзину');
  };

  const deleteFromCart = (itemId: number) => {
    const deletingItem = cart.find((item) => item.id === itemId);

    if (deletingItem) {
      if (deletingItem.quantity > 1) {
        setCart(
          cart.map((cartItem) =>
            cartItem.id === itemId
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
          ),
        );
      } else {
        setCart(cart.filter((item) => item.id !== itemId));
      }
    }
  };

  const SelectedRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  return (
    <>
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
      <h2>{filter}</h2>
      <div>
        <button onClick={() => editFilter('Все')}>Все</button>
        <button onClick={() => editFilter('Кроссовки')}>Кроссовки</button>
        <button onClick={() => editFilter('Кеды')}>Кеды</button>
        <button onClick={() => editFilter('Верхняя одежда')}>
          Верхняя одежда
        </button>
      </div>
      <h2>Товаров всего: {shoes.length}</h2>
      <label htmlFor="search">Поиск по товару</label>
      <input
        type="text"
        name="search"
        placeholder="Название..."
        onChange={editSearch}
      />
      <div className="card-grid">
        {shoes
          .filter((item) => filter === 'Все' || item.category === filter)
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
              addToCart={addToCart}
              role={role}
              editMode={editMode}
            />
          ))}
      </div>
      {role === 'admin' ? null : (
        <>
          <h2>
            Корзина. Общая сумма -{' '}
            {cart
              .map((item) =>
                item.quantity > 0 ? item.price * item.quantity : item.price,
              )
              .reduce((i, sum) => i + sum, 0)}
          </h2>
          <div className="card-grid cart">
            {cart.length <= 0
              ? null
              : cart.map((item) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    deleteFromCart={deleteFromCart}
                  />
                ))}
          </div>
        </>
      )}
      {notification !== '' ? (
        <div className="notification">{notification}</div>
      ) : null}
    </>
  );
}

export default MainPage;
