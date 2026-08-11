import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header/Header/Header';
import './DetailedCard.css';

interface ProductData {
  imageUrl: string;
  title: string;
  brand: string;
  sizes: number;
  price: number;
}

const DetailedCard = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<ProductData | null>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://127.0.0.1:4000/api/shoes/${id}`);

      const data = await res.json();

      setCard(data);
    };

    fetchData();
  }, [id]);

  return (
    <>
      {!card ? (
        'Загрузка...'
      ) : (
        <>
          <Header />
          <div className="detailed-card">
            <div>
              <img src={card.imageUrl} alt="img" />
            </div>
            <div>{card.title}</div>
            <div>
              {card.price}
              <button>Добавить в корзину</button>ё
              <button>Заказать сейчас</button>
              <p>14 дней на возврат</p>
              <p>Доступна примерка</p>
            </div>
          </div>
        </>
      )}
      <Link to="/">Назад</Link>
    </>
  );
};

export default DetailedCard;
