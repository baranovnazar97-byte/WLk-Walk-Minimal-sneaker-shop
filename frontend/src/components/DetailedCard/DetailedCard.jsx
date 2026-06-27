import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const DetailedCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://127.0.0.1:4000/api/shoes/${id}`);

      const data = await res.json();

      setCard(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {!card ? (
        'Загрузка...'
      ) : (
        <>
          <h1>{card.title}</h1>
          <h2>{card.price}</h2>
          <p>{card.brand}</p>
        </>
      )}
      <Link to="/">Назад</Link>
    </>
  );
};

export default DetailedCard;
