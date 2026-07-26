import './CartCard.css';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartCardProps {
  item: CartItem;
  deleteFromCart: (id: number) => void;
}

const CartCard = ({ item, deleteFromCart }: CartCardProps) => {
  return (
    <div className="card">
      <h1>{item.title}</h1>
      <h2>{item.price}</h2>
      <h2>{item.quantity}</h2>
      <button onClick={() => deleteFromCart(item.id)}>
        Удалить из корзины
      </button>
    </div>
  );
};

export default CartCard;
