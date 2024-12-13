import React, { useState, useEffect } from 'react';
import CartElement from '../components/CartElement';
import { getCart, updateCart } from '../services/api';
import { useNavigate } from 'react-router-dom';

// CartPage page -> Displays the cart items
const CartPage: React.FC = () => {

  // Navigate to the checkout page
  const navigate = useNavigate();

  // Cart items state
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<string>('0.00');
  const sessionId = localStorage.getItem('sessionId');

  // Fetch the cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!sessionId) {
        console.error('Session ID is missing');
        return;

      }

      try {
        const cart = await getCart(sessionId);
        setCartItems(cart);

      } catch (error) {
        console.error('Failed to fetch cart items:', error);

      }

    };

    fetchCartItems();
  }, [sessionId]);

  // Handle quantity change
  const handleQuantityChange = async (id: string, currentUnits: number, newUnits: number) => {

    // First get difference between new and current units
    const difference = newUnits - currentUnits;
    console.log('Difference: ', difference);

    // If difference is 0, no need to update
    if (difference === 0) {
      return;
    }

    // If difference, make change according to current units
    let toUpdate = difference;

    console.log('Updating units with: ', toUpdate, 'From current: ', currentUnits, 'To new: ', newUnits);
    
    // Make request
    try {
      await updateCart(sessionId || '', id, toUpdate);
      const cart = await getCart(sessionId || '');
      setCartItems(cart);
      console.log('Updated cart after units change: ', cart);

    } catch (error) {
      console.error('Failed to update units in cart:', error);
    
    }
  };

  // Handle deletion
  const handleDeletion = async (id: string, units: number) => {
    // Gotta do -{units} to delete the item, but it's still the same query as updating

    // Make request                           | see?
    try {
      await updateCart(sessionId || '', id, -units);
      
      const cart = await getCart(sessionId || '');
      setCartItems(cart);
      console.log('Updated cart after deletion: ', cart);

    } catch (error) {

      console.error('Failed to delete item from cart:', error);
    }
  };

  // Calculate the total
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

  // Proceed to checkout
  const goToCheckout = () => {
    console.log('Proceeding to checkout with: ', cartItems);
    navigate('/checkout', { state: { cartItems } });
  
  };

  // Return the JSX
  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-text mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cartItems.map((product) => (
          <CartElement
            key={product.id}
            product={product}
            handleQuantityChange={handleQuantityChange}
            handleDeletion={handleDeletion}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-secondary text-background shadow-md rounded-lg flex justify-between products-center">
        <h2 className="text-xl font-bold">Subtotal: €{subtotal}</h2>
        <button 
          className="bg-accent text-background px-6 py-2 rounded hover:bg-accent-dark"
          onClick={() => goToCheckout()}
          // Add data-testid attribute with value 'proceed-to-checkout'
          data-testid="proceed-to-checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;