import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
    setIsAdding(false);
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
      <figure className="h-48 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
