import React from 'react';
import placeholder from '../images/front.png';

// Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  units: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  handleProductClick: (product: Product) => void;
}

// ProductCard component -> Displays a single product card
const ProductCard: React.FC<ProductCardProps> = ({ product, handleProductClick }) => (
  <div 
    className="bg-primary shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
    // Add data-testid attribute for testing
    data-testid={`product-card-${product.name.replace(/ /g, '-')}`}
  >
    <img 
      // Add alt attribute with value `${product.name} image`. Since there's no current images, use Tea
      src={product.image || placeholder} 
      alt={`${product.name} image`} 
      className="w-full h-48 object-cover" 
    />
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
