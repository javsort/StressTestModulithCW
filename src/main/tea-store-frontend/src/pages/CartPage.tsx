import React, { useState } from 'react';
import CartElement from '../components/CartElement';
import placeholder from '../images/front.png';
import { useNavigate } from 'react-router-dom';

const sampleCartproducts = [
  {
    id: '1',
    name: 'Earl Grey (loose)',
    price: 2.09,
    quantity: 2,
    image: placeholder
  },
  {
    id: '2',
    name: 'Assam (loose)',
    price: 5.46,
    quantity: 1,
    image: placeholder
  },
  {
    id: '3',
    name: 'Darjeeling (loose)',
    price: 1.7,
    quantity: 3,
    image: placeholder
  },
];

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartproducts, setCartproducts] = useState(sampleCartproducts);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedCart = cartproducts.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setCartproducts(updatedCart);
    console.log('Updated cart: ', updatedCart);
  };

  const handleDeletion = (id: string) => {
    const updatedCart = cartproducts.filter((product) => product.id !== id);
    setCartproducts(updatedCart);
    console.log('Updated cart: ', updatedCart);
  };

  const calculateTotal = () => {
    return cartproducts.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  const goToCheckout = () => {
    console.log('Proceeding to checkout with: ', cartproducts);
    navigate('/checkout', { state: { cartproducts } });

  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-text mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cartproducts.map((product) => (
          <CartElement
            key={product.id}
            product={product}
            handleQuantityChange={handleQuantityChange}
            handleDelete={handleDeletion}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-secondary text-background shadow-md rounded-lg flex justify-between products-center">
        <h2 className="text-xl font-bold">Subtotal: €{calculateTotal()}</h2>
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
