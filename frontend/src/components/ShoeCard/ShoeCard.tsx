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
        <Link to={`/shoes/${item.id}`}>Read more</Link>
        <button onClick={() => addToCart(item)}>Add to cart</button>
      </div>
    </div>
  );
};

export default ShoeCard;
