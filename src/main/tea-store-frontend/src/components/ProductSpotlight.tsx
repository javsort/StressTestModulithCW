import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import placeholder from '../images/front.png';
import { addToCart } from '../services/api';

// ProductSpotlight component -> Displays a single product in detail
const ProductSpotlight: React.FC = () => {
  // Navigate to enable routing after adding to cart
  const navigate = useNavigate();

  // Get product to display from location state
  const location = useLocation();
  const { product } = location.state as { product: any };
  
  // Quantity state -> Default to 1
  const [quantity, setQuantity] = useState<number>(1);

  // Get session ID
  const sessionId = localStorage.getItem('sessionId');

  // Handle add to cart button click
  const handleAddToCart = (product: any) => {
    console.log('Add to cart clicked with quantity: ', quantity, 'product: ', product);
    if(!sessionId) {
      console.error('Session ID is missing');
      return;
    
    }

    try {
      const addedItems = addToCart(sessionId, product.id, quantity);
      console.log('Added items to cart: ', addedItems);

      // Navigate to successful page
      navigate('/product/add/successful');

    } catch (error){
      console.error('Failed to add to cart:', error);
      alert('An error occurred while adding to the cart. Please try again.');

    }

  }

  // Handle change in quantity
  const handleChangeInQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(event.target.value, 10));
    console.log('Quantity changed to: ', event.target.value);

  }

  return (
    <div className="p-4 bg-background min-h-screen flex justify-center">  
      {/* Product image and name */}
      <div className="bg-primary shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow w-full md:w-1/2 lg:w-1/3 h-3/4 mx-left">
        <div className="w-1/2">
          <img 
            src={product.image || placeholder} 
            alt={`${product.name} image`} 
            className="w-100 h-100 object-cover rounded-md mb-4" 
          />
          <h1 className="text-3xl font-bold text-text mb-4">{product.name}</h1>
          <p className="text-lg text-text_subtitle">Product Description: {product.description}</p>
          
        </div>
      </div>

      {/* Product details */}
      <div className="w-1/2 pl-6">
        <p className="text-secondary_darker font-semibold mt-2">
            Price: €{product.price.toFixed(2)}
        </p>

        {/* Quantity selector */}
          <div className="mt-4">
          <label htmlFor="quantity" className="text-text_subtitle">Select Quantity: </label>
          <select
            // Add data-testid attribute with value 'product-quantity'
            data-testid="product-quantity"
            id="quantity"
            value={quantity}
            onChange={handleChangeInQuantity}
            className="bg-secondary text-background px-4 py-2 rounded hover:underline"
          >
            {[...Array(product.units).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          // Add data-testid attribute with value 'add-to-cart'
          data-testid="add-to-cart"
          className="mt-4 bg-secondary text-background px-4 py-2 rounded hover:bg-accent"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
        <p className="text-text_subtitle mt-2">Units Available: {product.units}</p>
      </div>
    </div>
  );
};

export default ProductSpotlight;
