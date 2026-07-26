import { Link } from 'react-router-dom';
import './ShoeCard.css';

import { Shoe } from '../MainPage/MainPage';

interface ShoeProp {
  item: Shoe;
  handleDelete: (id: number) => void;
  addToCart: (item: Shoe) => void;
  role: string;
  editMode: (id: number) => void;
}

const ShoeCard = ({
  item,
  handleDelete,
  addToCart,
  role,
  editMode,
}: ShoeProp) => {
  return (
    <div className="card">
      <h1>{item.title}</h1>
      <h2>{item.brand}</h2>
      <h3>{item.category}</h3>
      <h2>{item.price}</h2>
      <Link to={`/shoes/${item.id}`}>Подробнее</Link>
      <button onClick={() => addToCart(item)}>Добавить в корзину</button>
      {role === 'admin' ? (
        <button onClick={() => handleDelete(item.id)}>Удалить</button>
      ) : null}
      {role === 'admin' ? (
        <button onClick={() => editMode(item.id)}>Редактировать</button>
      ) : null}
    </div>
  );
};

export default ShoeCard;
