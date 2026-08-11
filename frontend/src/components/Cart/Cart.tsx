import { useOutletContext } from 'react-router-dom';
import { CartItem, Shoe } from '../../types/cart';
import CartCard from '../CartCard/CartCard';
import './Cart.css';

interface ICart {
  cartTotal: number;
  cart: CartItem[];
  deleteFromCart: (id: number) => void;
  addToCart: (item: Shoe) => void;
}

const Cart = () => {
  const { cart, deleteFromCart, addToCart, cartTotal } =
    useOutletContext<ICart>();
  return (
    <div className="cart">
      <h2>Общая сумма - {cartTotal}</h2>
      <div className="card-grid cart">
        {cart.length <= 0
          ? null
          : cart.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                deleteFromCart={deleteFromCart}
                addToCart={addToCart}
              />
            ))}
      </div>
    </div>
  );
};

export default Cart;
