import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  getCartFromStorage,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  getTotalPrice,
} from '../utils/cartStorage';

export function meta() {
  return [
    { title: 'Shopping Cart' },
    { name: 'description', content: 'View your shopping cart' },
  ];
}

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cartItems = getCartFromStorage();
    setCart(cartItems);
    setIsLoading(false);
  }, []);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCart(getCartFromStorage());
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleQuantityChange = (productId, quantity) => {
    updateCartQuantity(productId, quantity);
    setCart(getCartFromStorage());
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      setCart([]);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  const totalPrice = getTotalPrice(cart);

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-base-100 rounded-lg p-8 text-center shadow-md">
          <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="card bg-base-100 shadow-md p-6 flex flex-row gap-6"
                >
                  <figure className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </figure>

                  <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="btn btn-sm btn-outline"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="btn btn-sm btn-outline"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="btn btn-sm btn-error"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>$10.00</span>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    ${(totalPrice + 10).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="btn btn-primary btn-block mb-3">
                Proceed to Checkout
              </button>
              <button
                onClick={handleClearCart}
                className="btn btn-outline btn-block mb-3"
              >
                Clear Cart
              </button>
              <Link to="/" className="btn btn-ghost btn-block">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
