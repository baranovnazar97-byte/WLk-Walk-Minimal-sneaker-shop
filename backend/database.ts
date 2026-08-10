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
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    brand: 'Adidas',
    title: 'Stan Smith',
    price: 9500,
    category: 'canvas shoes',
    sizes: 35,
    imageUrl: 'https://example.com',
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
