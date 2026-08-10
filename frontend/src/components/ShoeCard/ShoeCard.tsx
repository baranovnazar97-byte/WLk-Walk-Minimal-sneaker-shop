import { Link } from 'react-router-dom';
import './ShoeCard.css';

import { Shoe } from '../../types/cart';

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
      <div className="card-img-wrapper">
        <img className="card-img" src={item.imageUrl} alt="image" />
      </div>
      <div className="product-info">
        <h2>{item.title}</h2>
        <h2>{item.brand}</h2>
        <h3>{item.category}</h3>
        <h2 className="card-price">{item.price}</h2>
      </div>
      <div className="card-buttons">
        <button>
          <Link to={`/shoes/${item.id}`}>Подробнее</Link>
        </button>
        <button onClick={() => addToCart(item)}>Добавить в корзину</button>
      </div>
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
