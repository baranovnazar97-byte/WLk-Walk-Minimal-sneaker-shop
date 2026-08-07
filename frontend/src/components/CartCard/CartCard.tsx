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
      <h1>{item.title}</h1>
      <h2>{item.price}</h2>
      <h2>{item.quantity}</h2>
      <button onClick={() => addToCart(item)}>+1</button>
      <button onClick={() => deleteFromCart(item.id)}>
        {item.quantity > 1 ? '-1' : 'Удалить из корзины'}
      </button>
    </div>
  );
};

export default CartCard;
