import { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();

  // Check if product is in cart
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
    setIsAdding(false);
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(product.id, cartItem.quantity - 1);
      } else {
        removeFromCart(product.id);
      }
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div
      className={`card bg-base-100 shadow-lg hover:shadow-xl transition-shadow ${
        isInCart ? 'ring-2 ring-primary' : ''
      }`}
    >
      <figure className="h-48 overflow-hidden bg-gray-200 relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {isInCart && (
          <div className="absolute top-2 right-2 badge badge-primary badge-lg">
            In Cart
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg line-clamp-2">{product.title}</h2>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="badge badge-primary">{product.category}</div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{product.rating.rate}</span>
            <span className="text-sm text-gray-500">
              ({product.rating.count})
            </span>
          </div>
        </div>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>

          {!isInCart ? (
            <div className="flex flex-col items-center">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="btn btn-primary btn-sm"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
              {addedMessage && (
                <span className="text-xs text-green-600 mt-1">✓ Added!</span>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-end">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecreaseQuantity}
                  className="btn btn-sm btn-outline btn-primary"
                  title="Decrease quantity"
                >
                  −
                </button>
                <span className="font-bold text-lg px-2">
                  {cartItem?.quantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="btn btn-sm btn-outline btn-primary"
                  title="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleRemoveFromCart}
                className="btn btn-xs btn-error btn-outline"
                title="Remove from cart"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
