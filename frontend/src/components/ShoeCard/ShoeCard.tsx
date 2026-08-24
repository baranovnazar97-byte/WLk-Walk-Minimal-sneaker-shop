import { Link } from 'react-router-dom';
import notFound from '../../../img/notFound.svg';
import star from '../../../img/star.svg';
import './ShoeCard.css';

import { useState } from 'react';
import { Shoe } from '../../types/cart';

interface ShoeProp {
  item: Shoe;
  addToCart: (item: Shoe) => void;
}

const ShoeCard = ({ item, addToCart }: ShoeProp) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="shoe-card">
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
        <div className="product-descr">
          <div className="card-header-row">
            <h2>{item.title}</h2>
            <div className="product-rating">
              <img src={star} alt="star" />
              <p>{item.rating}</p>
            </div>
          </div>

          <span className="card-brand">{item.brand}</span>
          <span className="card-category">{item.category}</span>
          <p className="card-price">{item.price}</p>
        </div>
      </div>
      <div className="card-buttons">
        <Link to={`/shoes/${item.shoe_id}`}>read more</Link>
        <button onClick={() => addToCart(item)}>add to cart</button>
      </div>
    </div>
  );
};

export default ShoeCard;
