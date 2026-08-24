import { useEffect, useState } from 'react';
import { CartItem, Shoe } from '../types/cart';

const useCart = () => {
  const savedCart = localStorage.getItem('cart');

  const [cart, setCart] = useState<CartItem[]>(
    savedCart ? JSON.parse(savedCart) : [],
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const addToCart = (item: Shoe, onSuccess?: () => void) => {
    setCart((prev) => {
      const isItemInCart = prev.find(
        (cartItem) => cartItem.shoe_id === item.shoe_id,
      );

      if (isItemInCart) {
        if (onSuccess) onSuccess();
        return prev.map((cartItem) =>
          cartItem.shoe_id === item.shoe_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        if (onSuccess) onSuccess();
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const deleteFromCart = (id: number) => {
    setCart((prev) => {
      const deletingItem = prev.find((item) => item.shoe_id === id);

      if (deletingItem) {
        if (deletingItem.quantity > 1) {
          return prev.map((cartItem) =>
            cartItem.shoe_id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
          );
        } else {
          return prev.filter((item) => item.shoe_id !== id);
        }
      }

      return prev;
    });
  };

  return {
    cart,
    addToCart,
    deleteFromCart,
    cartTotal,
  };
};

export default useCart;
