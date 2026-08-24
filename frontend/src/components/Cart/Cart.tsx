import { useOutletContext } from 'react-router-dom';
import { CartItem, Shoe } from '../../types/cart';
import CartCard from '../CartCard/CartCard';
import './Cart.css';

interface ICart {
  cartTotal: number;
  cart: CartItem[];
  deleteFromCart: (id: number) => void;
  addToCart: (item: Shoe) => void;
  cartTotalItems: number;
}

const Cart = () => {
  const { cart, deleteFromCart, addToCart, cartTotal, cartTotalItems } =
    useOutletContext<ICart>();

  return (
    <div className="cart">
      <div className="cart-grid">
        {cart.length <= 0
          ? null
          : cart.map((item) => (
              <CartCard
                key={item.shoe_id}
                item={item}
                deleteFromCart={deleteFromCart}
                addToCart={addToCart}
              />
            ))}
      </div>
      <div className="cart-order">
        <div className="cart-price-total">
          <div className="cart-price-row">
            <p>products</p>
            <p>{cartTotalItems}</p>
          </div>
          <div className="cart-price-row">
            <p>salary</p>
            <p>{Math.round(cartTotal - cartTotal * 1.17)}</p>
          </div>
          <div className="cart-price-row">
            <p>total</p>
            <p>{cartTotal}</p>
          </div>
        </div>
        <button className="cart-order-btn">order now</button>
        <p>estimated delivery date: September 1</p>
      </div>
    </div>
  );
};

export default Cart;
