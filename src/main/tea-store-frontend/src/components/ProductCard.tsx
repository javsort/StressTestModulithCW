import React from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  units: number;
}

interface ProductCardProps {
  product: Product;
  handleProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleProductClick }) => (
  <div className="bg-primary shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-bold text-text">{product.name}</h3>
    <p className="text-sm text-text_subtitle">{product.description}</p>
    <p className="text-secondary_darker font-semibold mt-2">€{product.price.toFixed(2)}</p>
    <button
      className="mt-4 bg-secondary text-background px-4 py-2 rounded hover:bg-accent"
      onClick={() => handleProductClick(product)}
    >
      See Details
    </button>
  </div>
);

export default ProductCard;
