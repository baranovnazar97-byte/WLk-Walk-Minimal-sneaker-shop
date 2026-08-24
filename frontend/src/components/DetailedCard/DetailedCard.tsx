import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import back from '../../../img/back.svg';
import smile from '../../../img/Smile.svg';
import star from '../../../img/star.svg';
import './DetailedCard.css';

interface ISizes {
  value: number;
  stock: number;
}

interface ProductData {
  imageUrl: string;
  title: string;
  brand: string;
  sizes: ISizes[];
  price: string;
  rating: number;
  quantity: number;
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

  const userDate = new Date();
  userDate.setDate(userDate.getDate() + 7);

  return (
    <>
      {!card ? (
        'Загрузка...'
      ) : (
        <div className="detailed_card">
          <img className="detailed_img" src={card.imageUrl} alt="card-img" />
          <div>
            <h1 className="detailed-card-title">{card.title}</h1>
            <div className="detailed_card-rating">
              <div className="rating-container">
                <div className="average-rating">
                  <img src={star} alt="star" />
                  <span className="rating-value">5</span>
                </div>
                <span className="separator-dot"></span>
                <span className="reviews-count">1000 reviews</span>
              </div>
            </div>
            <div className="detailed_card-sizes">
              <p className="sizes_title">size chart</p>
              <div className="sizes_flex">
                {card.sizes.map((item) =>
                  item.stock > 0 ? (
                    <div key={item.value} className="size">
                      {item.value}
                    </div>
                  ) : null,
                )}
              </div>
            </div>
            <div className="card_descr">
              <div className="characteristic-row">
                <span className="detailed-card-label">material</span>
                <span className="line"></span>
                <span className="detailed-card-value">genuine leather</span>
              </div>

              <div className="characteristic-row">
                <span className="detailed-card-label">color shown</span>
                <span className="line"></span>
                <span className="detailed-card-value">black</span>
              </div>

              <div className="characteristic-row">
                <span className="detailed-card-label">size in the photo</span>
                <span className="line"></span>
                <span className="detailed-card-value">40</span>
              </div>
            </div>
          </div>
          <div className="container-order">
            <div className="card_order">
              <div className="flex-price">
                <p className="card_price">${card.price}</p>
                <p className="card_price-old">
                  ${Math.round(Number(card.price) * 1.17)}
                </p>
              </div>
              <div className="order_buttons">
                {card?.sizes[0].stock ? (
                  <>
                    <button>add to cart</button>
                    <button>order now</button>
                  </>
                ) : (
                  <p>item out of stock</p>
                )}
              </div>
              <p className="order_date">
                Estimated delivery:{' '}
                <span>
                  {card.sizes[0].stock
                    ? `${userDate.toLocaleString('en-US', { month: 'long' })} ${userDate.getDate()}`
                    : 'unknown'}
                </span>
              </p>
            </div>
            <div className="order-other">
              <div className="order-flex">
                <img src={back} alt="back" />
                <p>14-day return period</p>
              </div>
              <div className="order-flex">
                <img src={smile} alt="smile" />
                <p>try-on available</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailedCard;
