import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../services/api';

const ProductSpotlight: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchSingleProduct(id!),
  });

  if (isLoading) return <p>Loading product...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  
  return (
    <div className="p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-text mb-4">{product.name}</h1>
      <p className="text-lg text-text_subtitle">{product.description}</p>
      <p className="text-secondary_darker font-semibold mt-2">
        Price: €{product.price.toFixed(2)}
      </p>
      <p className="text-text_subtitle mt-2">Units Available: {product.units}</p>
    </div>
  );
};

export default ProductSpotlight;
