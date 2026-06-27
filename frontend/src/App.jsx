import { useEffect, useState } from 'react';
import './App.css';
import CartCard from './components/CartCard/CartCard';
import ShoeCard from './components/ShoeCard/ShoeCard';

function App() {
  const [shoes, setShoes] = useState([]);
  const [filter, setFilter] = useState('Все');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://127.0.0.1:4000/api/shoes');

      const data = await res.json();

      setShoes(data);
    };

    fetchData();
  }, []);

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
    setCart([...cart, item]);
  };

  const deleteFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
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
        Корзина. Общая цена -{' '}
        {cart.length <= 0
          ? '0'
          : cart
              .map((item) => parseInt(item.price))
              .reduce((i, sum) => sum + i, 0)}
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

export default App;
