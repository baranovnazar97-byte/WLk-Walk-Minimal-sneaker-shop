export interface Shoe {
  id: number;
  imageUrl: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  sizes: number;
}

const shoesMockData = [
  {
    id: 1,
    brand: 'Nike',
    title: 'Air Force 1',
    price: 12000,
    category: 'sneakers',
    sizes: 40,
    imageUrl:
      'https://static.street-beat.ru/upload/resize_cache/iblock/288/666_666_1/0tzacc6pyv6g7jfdgvouqbcl2bfvzp9h.jpg',
  },
  {
    id: 2,
    brand: 'Adidas',
    title: 'Stan Smith',
    price: 9500,
    category: 'canvas shoes',
    sizes: 35,
    imageUrl:
      'https://static.insales-cdn.com/r/zcoD6jUTMog/rs:fit:1000:0:1/q:100/plain/images/products/1/3288/824863960/Adidas_Stan_Smit_Green_1.jpg@jpg',
  },
  {
    id: 3,
    brand: 'test',
    title: 'test',
    price: 9999,
    category: 'test',
    sizes: 35,
    imageUrl: 'https://example.com',
  },
];

export default shoesMockData;
