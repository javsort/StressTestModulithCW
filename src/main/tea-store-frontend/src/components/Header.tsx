import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="bg-secondary text-background p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">Tea Store</h1>
    <nav>
      <Link to="/" className="text-background px-4 hover:underline">
        Products
      </Link>
      <Link to="/cart" className="text-background px-4 hover:underline">
        Cart
      </Link>
    </nav>
  </header>
);

export default Header;
