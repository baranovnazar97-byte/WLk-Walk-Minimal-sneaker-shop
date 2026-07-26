import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
          <div className="product-container">
            <div>
              <img src={card.imageUrl} />
            </div>
            <div className="product-info">
              <h1>{card.title}</h1>
              <h3>{card.brand}</h3>
              <h3>{card.sizes}</h3>
              <h2>{card.price}</h2>
            </div>
          </div>
        </>
      )}
      <Link to="/">Назад</Link>
    </>
  );
};

export default DetailedCard;
