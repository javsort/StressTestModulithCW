import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <header className="bg-secondary text-background p-4 flex justify-between items-center">
    <nav>
      <Link to="https://t2-documentation.readthedocs.io/en/latest/index.html" className="text-background px-4 hover:underline">
        Documentation
      </Link>
    </nav>
    <nav>
      <Link to="/about" className="text-background px-4 hover:underline">
        About Us
      </Link>
      <Link to="https://github.com/t2-project/t2-project" className="text-background px-4 hover:underline">
        GitHub Repository
      </Link>
    </nav>
  </header>
);

export default Footer;
