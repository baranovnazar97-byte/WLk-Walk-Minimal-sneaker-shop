import { useState } from 'react';
import notFound from '../../../img/notFound.svg';
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
        <p>Quantity: {item.quantity}</p>
      </div>
      <div className="cart-buttons">
        <button onClick={() => addToCart(item)}>+1</button>
        <button onClick={() => deleteFromCart(item.id)}>
          {item.quantity > 1 ? '-1' : 'Delete from cart'}
        </button>
      </div>
    </div>
  );
};

export default CartCard;
