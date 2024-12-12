import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import CartOverlay from './CartOverlay';
import NewsOverlay from './NewsOverlay';
import { getCart, updateCart } from '../services/api';

const Header: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isNewsOverlayOpen, setIsNewsOverlayOpen] = useState(false);
  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);
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

  const handleQuantityChange = async (id: string, currentUnits: number, newUnits: number) => {
      // First get difference between new and current units
      const difference = newUnits - currentUnits;
  
      // If difference is 0, no need to update
      if (difference === 0) {
        return;
      }
  
      // If difference is positive, add the difference
      let toUpdate = difference;
  
      // If difference is negative, subtract the difference from current units
      if (difference < 0) {
        toUpdate = -currentUnits;
      }
      try {
        await updateCart(sessionId || '', id, toUpdate);
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

  return (
    <header className="bg-secondary text-background p-4 flex justify-between items-center sticky top-0">
      <h1 className="text-xl font-bold">
        <Link to="/" className="text-background px-4 hover:underline">
          Tea Store
        </Link>
      </h1>

      <div className="flex space-x-4 items-center">
        <button
          onClick={() => {
            setIsNewsOverlayOpen((prev) => !prev);
            if (!isNewsOverlayOpen) setIsCartOverlayOpen(false);
          }}
          className={`bg-accent text-background px-4 py-2 rounded shadow-lg ${isNewsOverlayOpen ? 'border border-primary' : ''}`}
        >
          News
        </button>
        <button
          onClick={() => {
            setIsCartOverlayOpen((prev) => !prev);
            if (!isCartOverlayOpen) setIsNewsOverlayOpen(false);
          }}
          className={`bg-accent text-background px-4 py-2 rounded shadow-lg ${isCartOverlayOpen ? 'border border-primary' : ''}`}
        >
          Cart
        </button>
      </div>

      {isNewsOverlayOpen && (
        <div className="absolute top-16 right-20 w-120 bg-secondary text-background shadow-lg rounded">
          <NewsOverlay newsItems={[]} />
        </div>
      )}

      {isCartOverlayOpen && (
        <div className="absolute top-16 right-4 w-120 bg-secondary text-background shadow-lg rounded">
          <CartOverlay
            cartItems={cartItems}
            setCartItems={setCartItems}
            handleQuantityChange={handleQuantityChange}
            handleDeletion={handleDeletion}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
