import { createContext, ReactNode, useState } from 'react';
import { Shoe } from '../types/cart';

interface CartContextType {
  cart: Shoe[];
  cartTotal: number;
  addToCart: (item: Shoe) => void;
  deleteFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Shoe[]>([]);

  const addToCart = (item: Shoe) => {
    setCart((prevCart) => [...prevCart, item]);
  };
};
