import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => ( 
  <header className="bg-secondary text-background p-4 flex justify-between items-center sticky top-0">
    <h1 className="text-xl font-bold">
      <Link to="/" className="text-background px-4 hover:underline">
      Tea Store
      </Link>
    </h1>
    <nav>
      <Link to="/cart" className="text-background px-4 hover:underline">
        Cart
      </Link>
    </nav>
  </header>
);

export default Header;
