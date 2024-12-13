import React from 'react';
import { useNavigate } from 'react-router-dom';


// This page is displayed when a product is successfully added to the cart
const notFoundPage: React.FC = () => {
// Navigate to the shop
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-text mb-6">Oh oh! The site you requested is not available, or can'
        t be found!
      </h1>
      <div className="space-y-6">
        <p className="text-text_subtitle">You can go back to the shop if you desire:</p>
        <button 
          className="w-1/2 bg-accent text-background px-4 py-2 rounded hover:bg-accent-dark"
          onClick={() => navigate('/')}
        >
          Go Back To Shop
        </button>
      </div>
    </div>
  );
};

export default notFoundPage;
