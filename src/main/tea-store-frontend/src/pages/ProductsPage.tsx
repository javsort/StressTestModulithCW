import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<string[]>([]);

  // Fixed useQuery call
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Get the session id
  const sessionId = localStorage.getItem('sessionId');

  if(sessionId){
    console.log("Session ID: ", sessionId);
  }


  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
  };

  const handleProductClick = (product: any) => {
    console.log("Product: ", product);
    navigate(`/product/${product.id}`, { state: { product } });
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (

      <div className="p-4 bg-background min-h-screen">
          <h1 className="text-3xl font-bold text-text mb-6">Available Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {products && products.map((product: any) => (
              <ProductCard key={product.id} product={product} handleProductClick={handleProductClick}/>
            ))}
          </div>
        </div>
  );
  
  
};



export default ProductsPage;
