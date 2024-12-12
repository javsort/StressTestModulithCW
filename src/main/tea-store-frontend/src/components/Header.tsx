import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import CartOverlay from './CartOverlay';
import NewsOverlay from './NewsOverlay';
import placeholder from '../images/front.png';

const sampleCartItems = [
  {
    id: '1',
    name: 'Earl Grey (loose)',
    price: 2.09,
    quantity: 2,
    image: placeholder,
  },
  {
    id: '2',
    name: 'Assam (loose)',
    price: 5.46,
    quantity: 1,
    image: placeholder,
  },
];

const sampleNewsItems = [
  {
    id: '1',
    title: 'New Product Launch',
    date: '2024-12-01',
    content: 'We are excited to announce the launch of our new tea line!',
  },
  {
    id: '2',
    title: 'Holiday Sale',
    date: '2024-12-10',
    content: 'Enjoy up to 50% off on select items this holiday season!',
  },
];

const Header: React.FC = () => {

  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [isNewsOverlayOpen, setIsNewsOverlayOpen] = useState(false);
  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
          <NewsOverlay newsItems={sampleNewsItems} />
        </div>
      )}

      {isCartOverlayOpen && (
        <div className="absolute top-16 right-4 w-120 bg-secondary text-background shadow-lg rounded">
          <CartOverlay
            cartItems={cartItems}
            handleQuantityChange={handleQuantityChange}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
