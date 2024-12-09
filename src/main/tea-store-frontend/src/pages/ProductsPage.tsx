import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

const ProductsPage: React.FC = () => {
  const [cart, setCart] = useState<string[]>([]);

  // Fixed useQuery call
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (

      <div className="p-4 bg-background min-h-screen">
          <h1 className="text-3xl font-bold text-text mb-6">Available Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
  );
  
  
};



export default ProductsPage;
