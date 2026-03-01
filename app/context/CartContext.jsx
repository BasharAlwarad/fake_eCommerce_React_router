import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import {
  getCartFromStorage,
  removeFromCart as removeFromStorageCart,
  updateCartQuantity as updateStorageQuantity,
  clearCart as clearStorageCart,
  getTotalPrice,
  addToCart as addToStorageCart,
} from '../utils/cartStorage';

export const CartContext = createContext();

const CATEGORIES = [
  'All',
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

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
    selectedCategory,
    setSelectedCategory,
    CATEGORIES,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
