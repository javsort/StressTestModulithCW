import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import placeholder from '../images/front.png';

const ProductSpotlight: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { product } = location.state as { product: any };

  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = (product: any) => {
    console.log('Add to cart clicked with quantity: ', quantity, 'product: ', product);
    // FOr logic next

    navigate('/product/add/successful');
  }

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
