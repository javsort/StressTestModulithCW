// CartOverlay.tsx
import React from 'react';
import CartElement from './CartElement';
import { useNavigate } from 'react-router-dom';

interface CartOverlayProps {
  cartItems: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  handleQuantityChange: (id: string, newQuantity: number) => void;
  handleDelete: (id: string) => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ cartItems, handleQuantityChange, handleDelete }) => {
    const navigate = useNavigate();
  

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
  
    console.log('Going to Cart Page with: ', cartItems);
    navigate('/cart', { state: { cartItems } });
  }

  return (
    <div className="w-70 h-full bg-secondary text-background shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartElement
              key={item.id}
              product={item}
              handleQuantityChange={handleQuantityChange}
              handleDelete={handleDelete}
            />
          ))}
          <div className="mt-4 p-4 bg-primary rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Subtotal: €{calculateTotal()}</h3>
            <button
              onClick={handleCheckout}
              className="w-full mt-2 bg-accent text-background px-4 py-2 rounded hover:bg-accent-dark"
            >
              Go to Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-text_subtitle">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartOverlay;