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
  addToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => (
  <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
    <p className="text-sm text-gray-600">{product.description}</p>
    <p className="text-green-600 font-semibold mt-2">€{product.price.toFixed(2)}</p>
    <button
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={() => addToCart(product.id)}
    >
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
