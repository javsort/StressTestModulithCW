import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartOverlay from './CartOverlay';
import NewsOverlay from './NewsOverlay';
import { getCart, updateCart } from '../services/api';


// Header component -> Contains the header of the application -> News and Cart buttons
const Header: React.FC = () => {
  // Cart items state
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Overlays status
  const [isNewsOverlayOpen, setIsNewsOverlayOpen] = useState(false);
  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);

  // Get session ID
  const sessionId = localStorage.getItem('sessionId');

  // Open news overlay on first visit
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      setIsNewsOverlayOpen(true); // Open news overlay on first visit
      localStorage.setItem('visited', 'true'); // Mark that the user has visited
    }
  }, []);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!sessionId) {
        console.error('Session ID is missing');
        return;

      }

      // Fill up w retrieved information
      try {
        const cart = await getCart(sessionId);
        setCartItems(cart);

      } catch (error) {
        console.error('Failed to fetch cart items:', error);

      }
    };

    fetchCartItems();
  }, [sessionId]);

  // Handle quantity change -> Same as in CartPage
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

  // Handle deletion -> Same as in CartPage
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


  // Return the header
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
          // Add data-testid attribute with value 'news-button'
          data-testid="news-button"
        >
          News
        </button>
        <button
          onClick={() => {
            setIsCartOverlayOpen((prev) => !prev);
            if (!isCartOverlayOpen) setIsNewsOverlayOpen(false);
          }}
          className={`bg-accent text-background px-4 py-2 rounded shadow-lg ${isCartOverlayOpen ? 'border border-primary' : ''}`}
          // Add data-testid attribute with value 'cart-button'
          data-testid="cart-button"
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
