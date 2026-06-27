import { Link } from 'react-router-dom';
import './ShoeCard.css';

const ShoeCard = ({ item, handleDelete, addToCart }) => {
  return (
    <div className="card">
      <h1>{item.title}</h1>
      <h2>{item.brand}</h2>
      <h3>{item.category}</h3>
      <h2>{item.price}</h2>
      <Link to={`/shoes/${item.id}`}>Подробнее</Link>
      <button onClick={() => addToCart(item)}>Добавить в корзину</button>
      <button onClick={() => handleDelete(item.id)}>Удалить</button>
    </div>
  );
};

export default ShoeCard;
