import React from 'react';
import { useNavigate } from 'react-router-dom';

const successfulPaymentPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8 bg-background min-h-screen">
            <h1 className="text-3xl font-bold text-text mb-6">Payment Successful!</h1>
            <div className="space-y-6">
                <p className="text-text_subtitle">Thank you for your purchase! You can go back to the shop now.</p>
                <button 
                    className="w-1/2 bg-accent text-background px-4 py-2 rounded hover:bg-accent-dark"
                    onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </button>
            </div>
        </div>
    );
};

export default successfulPaymentPage;