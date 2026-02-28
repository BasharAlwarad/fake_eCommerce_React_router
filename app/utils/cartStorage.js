export const getCartFromStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
  const cart = getCartFromStorage();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCartFromStorage();
  const updatedCart = cart.filter((item) => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCartFromStorage();
  const product = cart.find((item) => item.id === productId);

  if (product) {
    product.quantity = Math.max(1, quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return cart;
};

export const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};

export const getTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
