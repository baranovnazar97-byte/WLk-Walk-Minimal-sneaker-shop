import { useEffect, useState } from 'react';
import '../../App.css';
import CartCard from '../CartCard/CartCard';
import ShoeCard from '../ShoeCard/ShoeCard';
import './MainPage.css';

function MainPage() {
  const [shoes, setShoes] = useState([]);
  const [filter, setFilter] = useState('Все');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

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

  const postData = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const shoeData = Object.fromEntries(formData.entries());

    const res = await fetch('http://127.0.0.1:4000/api/shoes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(shoeData),
    });

    const newShoe = await res.json();

    setShoes((prev) => [...prev, newShoe]);
  };

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:4000/api/shoes/${id}`, {
      method: 'delete',
    });

    setShoes((prev) => prev.filter((item) => item.id !== id));
  };

  const editFilter = (filter) => {
    setFilter(filter);
  };

  const editSearch = (event) => {
    const text = event.target.value.toLowerCase();

    setSearch(text);
  };

  const addToCart = (item) => {
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
  };

  const deleteFromCart = (itemId) => {
    const deletingItem = cart.find((item) => item.id === itemId);

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
  };

  return (
    <>
      <form className="form-post" onSubmit={postData}>
        <label htmlFor="brand">Бренд</label>
        <input type="text" name="brand" />
        <label htmlFor="title">Название</label>
        <input type="text" name="title" />
        <label htmlFor="price">Цена</label>
        <input type="number" name="price" id="price" />
        <label htmlFor="category">Категория</label>
        <input type="text" name="category" id="category" />
        <label htmlFor="sizes">Размер</label>
        <input type="number" name="sizes" id="sizes" />
        <label htmlFor="imageUrl">Картинка</label>
        <input type="text" name="imageUrl" id="imageUrl" />
        <button type="submit">Добавить</button>
      </form>
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
            />
          ))}
      </div>
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
  );
}

export default MainPage;
