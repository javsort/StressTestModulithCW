// CartElement.tsx
import React from 'react';
import placeholder from '../images/front.png';

interface CartElementProps {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  handleQuantityChange: (id: string, newQuantity: number) => void;
}

const CartElement: React.FC<CartElementProps> = ({ product, handleQuantityChange }) => (
  <div className="flex products-center bg-primary shadow-md rounded-lg p-4">
    <img
      src={product.image || placeholder }
      alt={product.name}
      className="w-30 h-20 object-cover rounded-md mr-4"
    />
    <div className="flex-grow">
      <h3 className="text-lg font-bold text-text">{product.name}</h3>
      <p className="text-secondary_darker font-semibold">€{product.price.toFixed(2)} each</p>
      <label htmlFor={`quantity-${product.id}`} className="block text-text_subtitle mt-2">Quantity:</label>
      <select
        id={`quantity-${product.id}`}
        value={product.quantity}
        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
        className="bg-secondary text-background px-4 py-2 rounded mt-1"
      >
        {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>
    </div>
    <p className="text-secondary_darker font-semibold ml-4">
      €{(product.price * product.quantity).toFixed(2)}
    </p>
  </div>
);

export default CartElement;