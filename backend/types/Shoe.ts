interface Sizes {
  value: number;
  stock: number;
}

export interface Shoe {
  shoe_id: number;
  imageUrl: string;
  title: string;
  brand: string;
  category: string;
  price: string;
  sizes: Sizes[];
  rating: number;
}
