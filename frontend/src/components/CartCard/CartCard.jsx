import './CartCard.css';

const CartCard = ({ item, deleteFromCart }) => {
  return (
    <div className="card">
      <h1>{item.title}</h1>
      <h2>{item.price}</h2>
      <button onClick={() => deleteFromCart(item.id)}>
        Удалить из корзины
      </button>
    </div>
  );
};

export default CartCard;
