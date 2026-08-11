import { Link } from 'react-router-dom';
import notFound from '../../../img/notFound.svg';
import star from '../../../img/star.svg';
import './ShoeCard.css';

import { useState } from 'react';
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
  const [imageError, setImageError] = useState(false);
  console.log(item.category);
  return (
    <div className="card">
      <div className="card-img-wrapper">
        <img
          className={
            item.imageUrl && !imageError ? 'card-img' : 'not-found-img'
          }
          src={item.imageUrl && !imageError ? item.imageUrl : notFound}
          alt="image"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="product-info">
        <h2>{item.title}</h2>
        <h2>{item.brand}</h2>
        <h3>{item.category}</h3>
        <h2 className="card-price">{item.price}</h2>
        <div className="product-rating">
          <img src={star} alt="star" />
          <p>{item.rating}</p>
        </div>
      </div>
      <div className="card-buttons">
        <Link to={`/shoes/${item.id}`}>Подробнее</Link>
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
