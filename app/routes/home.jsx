import {
  isRouteErrorResponse,
  redirect,
  useLoaderData,
  useRouteError,
} from 'react-router';

import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export function meta() {
  return [
    { title: 'Fake e-Commerce Home page' },
    { name: 'description', content: 'Welcome to Home page!' },
  ];
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export async function loader() {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok)
    throw new Response('Failed to fetch posts', { status: res.status });
  return await res.json();
}

export default function Home() {
  const data = useLoaderData();
  const { selectedCategory } = useCart();

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? data
      : data?.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No products found in this category
          </p>
        </div>
      )}
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let message = 'Something went wrong.';
  let details;

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404 ? '404 - Not Found' : `Error ${error.status}`;
    details = error.statusText || 'An unexpected error occurred.';
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold text-red-600">{message}</h1>
      <p>{details}</p>
      <button className="btn" onClick={() => redirect('/')}>
        Go back
      </button>
    </main>
  );
}
