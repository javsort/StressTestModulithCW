import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const successfulAdditionPage: React.FC = () => {
    const [cartproducts, setCartproducts] = useState();
    const navigate = useNavigate();


    return (
        <div className="p-8 bg-background min-h-screen">
            <h1 className="text-3xl font-bold text-text mb-6">Product added to cart successfully!</h1>
            <div className="space-y-6">
                <p className="text-text_subtitle">You can now proceed to checkout or continue shopping.</p>
                <button 
                    className="w-1/2 bg-accent text-background px-4 py-2 rounded hover:bg-accent-dark"
                    onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </button>
                <button 
                    className="w-1/2 bg-accent text-background px-4 py-2 rounded hover:bg-accent-dark"
                    onClick={() => navigate('/cart')}
                    >
                        Go to Cart
                    </button>
            </div>
        </div>
    );
};

export default successfulAdditionPage;