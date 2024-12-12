import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductSpotlight: React.FC = () => {
  const location = useLocation();
  const { product } = location.state as { product: any };

  const handleAddToCart = (product: any) => {
    console.log('Add to cart clicked');
  }

  return (
    <div className="p-4 bg-background min-h-screen">
      <div className="bg-primary shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
        <h1 className="text-3xl font-bold text-text mb-4">{product.name}</h1>
        <p className="text-lg text-text_subtitle">Product Description: {product.description}</p>
        
      </div>
      <p className="text-secondary_darker font-semibold mt-2">
          Price: €{product.price.toFixed(2)}
      </p>
      <button
        className="mt-4 bg-secondary text-background px-4 py-2 rounded hover:bg-accent"
        onClick={() => handleAddToCart(product)}
      >
        Add to Cart
      </button>
      <p className="text-text_subtitle mt-2">Units Available: {product.units}</p>
    </div>
  );
};

export default ProductSpotlight;
