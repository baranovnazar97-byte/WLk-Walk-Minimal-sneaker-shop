import { CartItem } from '../../types/cart';
import './CartCard.css';

interface CartCardProps {
  item: CartItem;
  deleteFromCart: (id: number) => void;
  addToCart: (item: CartItem) => void;
}

const CartCard = ({ item, deleteFromCart, addToCart }: CartCardProps) => {
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
        <p>Количество: {item.quantity}</p>
      </div>
      <div className="cart-buttons">
        <button onClick={() => addToCart(item)}>+1</button>
        <button onClick={() => deleteFromCart(item.id)}>
          {item.quantity > 1 ? '-1' : 'Удалить из корзины'}
        </button>
      </div>
    </div>
  );
};

export default CartCard;
