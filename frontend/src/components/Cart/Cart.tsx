import { CartItem, Shoe } from '../../types/cart';
import CartCard from '../CartCard/CartCard';

interface ICart {
  cartTotal: number;
  cart: CartItem[];
  deleteFromCart: (id: number) => void;
  addToCart: (item: Shoe) => void;
}

const Cart = ({ cartTotal, cart, deleteFromCart, addToCart }: ICart) => {
  return (
    <>
      <h2>Корзина. Общая сумма - {cartTotal}</h2>
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
    </>
  );
};

export default Cart;
