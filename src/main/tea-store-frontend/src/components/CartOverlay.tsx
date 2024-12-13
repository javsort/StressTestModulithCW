// CartOverlay.tsx
import React, { useEffect, useState } from 'react';
import CartElement from './CartElement';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../services/api';

// CartOverlay component -> Displays the cart items in a sidebar
interface CartOverlayProps {
  cartItems: {
    id: string;
    name: string;
    price: number;
    units: number;
    image: string;
  }[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  handleQuantityChange: ( id: string, currentUnits: number, newUnits: number) => void;
  handleDeletion: (id: string, units: number) => void;
}

// CartOverlay component -> Displays the cart items in a sidebar
const CartOverlay: React.FC<CartOverlayProps> = ({ cartItems, setCartItems, handleQuantityChange, handleDeletion }) => {
  // Navigate to enable routing
  const navigate = useNavigate();

  // Get session ID
  const sessionId = localStorage.getItem('sessionId');

  // Subtotal state for the cart
  const [subtotal, setSubtotal] = useState<string>('0.00');

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!sessionId) {
        console.error('Session ID is missing');
        return;
      }
      
      try {
        const cart = await getCart(sessionId);
        // Merge fetched cart items with existing cartItems to preserve user-selected quantities
        setCartItems((prevItems) => {
          const updatedCart = cart.map((fetchedItem: any) => {
            const existingItem = prevItems.find((item) => item.id === fetchedItem.id);
            return existingItem ? { ...fetchedItem, units: existingItem.units } : fetchedItem;
          });
          return updatedCart;
        });
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, [sessionId, setCartItems]);

  // Calculate subtotal
  useEffect(() => {
    const calculateTotal = () => {
      const total = cartItems
        .reduce((sum, item) => {
          const itemTotal = item.price * item.units;
          return sum + (isNaN(itemTotal) ? 0 : itemTotal);
        }, 0)
        .toFixed(2);
      setSubtotal(total);
    };

    calculateTotal();
  }, [cartItems]);

  // Handle checkout button click
  const handleCheckout = () => {
    console.log('Going to Cart Page with: ', cartItems);
    navigate('/cart', { state: { cartItems } });
  };

  return (
    <div className="w-70 h-full bg-secondary text-background shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((product) => (
            <CartElement
              key={product.id}
              product={product}
              handleQuantityChange={handleQuantityChange}
              handleDeletion={handleDeletion}
            />
          ))}
          <div className="mt-4 p-4 bg-primary rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Subtotal: €{subtotal}</h3>
            <button
              onClick={handleCheckout}
              className="w-full mt-2 bg-accent text-background px-4 py-2 rounded hover:bg-accent-dark"
              // Add data-testid attribute with value 'checkout-button'
              data-testid="checkout-button"
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
