import { useState } from 'react';
import star from '../../../img/star.svg';
import { CartItem } from '../../types/cart';
import './CartCard.css';

interface CartCardProps {
  item: CartItem;
  deleteFromCart: (id: number) => void;
  addToCart: (item: CartItem) => void;
}

const CartCard = ({ item, deleteFromCart, addToCart }: CartCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="cart-card">
      <div className="cart-img-wrapper">
        <img className="cart-img" src={item.imageUrl} alt="image" />
      </div>
      <div className="cart-descr">
        <h2>{item.title}</h2>
        <div className="cart-rating">
          <img src={star} alt="star" />
          <p>{item.rating}</p>
        </div>
        <p className="cart-brand">{item.brand}</p>
        <p className="cart-category">{item.category}</p>
      </div>
      <div className="cart-buttons">
        <button onClick={() => deleteFromCart(item.shoe_id)}>-</button>
        <p>1</p>
        <button onClick={() => addToCart(item)}>+</button>
      </div>
      <div className="cart-price">
        <p>${item.price}</p>
      </div>
    </div>
  );
};

export default CartCard;
