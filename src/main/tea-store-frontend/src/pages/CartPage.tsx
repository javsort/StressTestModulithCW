import React, { useState, useEffect } from 'react';
import CartElement from '../components/CartElement';
import { getCart, updateCart } from '../services/api';
import placeholder from '../images/front.png';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<string>('0.00');
  const sessionId = localStorage.getItem('sessionId');

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

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    try {
      await updateCart(sessionId || '', id, newQuantity);
      const cart = await getCart(sessionId || '');
      setCartItems(cart);
      console.log('Updated cart after units change: ', cart);
    } catch (error) {
      console.error('Failed to update units in cart:', error);
    }
  };

  const handleDeletion = async (id: string, units: number) => {
    // Gotta do -{units} to delete the item

    try {
      await updateCart(sessionId || '', id, -units);
      
      const cart = await getCart(sessionId || '');
      setCartItems(cart);
      console.log('Updated cart after deletion: ', cart);
    } catch (error) {
      console.error('Failed to delete item from cart:', error);
    }
  };

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

  const goToCheckout = () => {
    console.log('Proceeding to checkout with: ', cartItems);
    navigate('/checkout', { state: { cartItems } });
  };

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
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;