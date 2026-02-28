import { createContext, useState, useCallback, useEffect } from 'react';
import {
  getCartFromStorage,
  removeFromCart as removeFromStorageCart,
  updateCartQuantity as updateStorageQuantity,
  clearCart as clearStorageCart,
  getTotalPrice,
  addToCart as addToStorageCart,
} from '../utils/cartStorage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize cart from localStorage only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCart(getCartFromStorage());
      setIsHydrated(true);
    }
  }, []);

  const addToCart = useCallback((product) => {
    const updatedCart = addToStorageCart(product);
    setCart(updatedCart);
  }, []);

  const removeFromCart = useCallback((productId) => {
    removeFromStorageCart(productId);
    setCart(getCartFromStorage());
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    updateStorageQuantity(productId, quantity);
    setCart(getCartFromStorage());
  }, []);

  const clearCart = useCallback(() => {
    clearStorageCart();
    setCart([]);
  }, []);

  const totalPrice = getTotalPrice(cart);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    isHydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
