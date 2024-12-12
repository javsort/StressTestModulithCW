// Updated CheckoutPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();

    const [billingInfo, setBillingInfo] = useState({
        firstName: 'Jon',
        lastName: 'Snow',
        address: 'Winterfell',
    });

    const [paymentDetails, setPaymentDetails] = useState({
        cardType: 'Visa',
        cardNumber: '314159265359',
        checkSum: '299',
        expiryDate: '12/2025',
    });

    const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };

    const handleStringPayMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    }

    const handlePayMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = () => {
        console.log('Submitting Order:', { billingInfo, paymentDetails });
        // Add logic to handle order submission

        navigate('/order/successful');
    };

    return (
        <div className="p-8 bg-background min-h-screen">
            <h1 className="text-3xl font-bold text-text mb-6">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Billing and Payment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Billing Information */}
                    <div className="p-4 bg-primary shadow-md rounded-lg">
                        <h2 className="text-xl font-bold text-text mb-4">Billing Information</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="firstName" className="block text-text_subtitle">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={billingInfo.firstName}
                                    onChange={handleBillingChange}
                                    className="w-full px-4 py-2 rounded bg-secondary text-background"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-text_subtitle">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={billingInfo.lastName}
                                    onChange={handleBillingChange}
                                    className="w-full px-4 py-2 rounded bg-secondary text-background"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-text_subtitle">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={billingInfo.address}
                                    onChange={handleBillingChange}
                                    className="w-full px-4 py-2 rounded bg-secondary text-background"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Payment Details */}
                    <div className="p-4 bg-primary shadow-md rounded-lg">
                        <h2 className="text-xl font-bold text-text mb-4">Payment Details</h2>
                        <form className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="w-1/3">
                                    <label htmlFor="cardType" className="block text-text_subtitle">Card Type</label>
                                    <select
                                        id="cardType"
                                        name="cardType"
                                        value={paymentDetails.cardType}
                                        onChange={handlePayMethodChange}
                                        className="w-full px-4 py-2 rounded bg-secondary text-background"
                                    >
                                        {['Visa', 'Mastercard', 'American Express'].map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-1/3">
                                    <label htmlFor="expiryDate" className="block text-text_subtitle">Expiry Date (MM/YYYY)</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        name="expiryDate"
                                        value={paymentDetails.expiryDate}
                                        onChange={handleStringPayMethodChange}
                                        className="w-full px-4 py-2 rounded bg-secondary text-background"
                                    />
                                </div>

                                <div className="w-1/3">
                                    <label htmlFor="checkSum" className="block text-text_subtitle">Checksum</label>
                                    <input
                                        type="text"
                                        id="checkSum"
                                        name="checkSum"
                                        value={paymentDetails.checkSum}
                                        onChange={handleStringPayMethodChange}
                                        className="w-full px-4 py-2 rounded bg-secondary text-background"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="cardNumber" className="block text-text_subtitle">Card Number</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={paymentDetails.cardNumber}
                                    onChange={handleStringPayMethodChange}
                                    className="w-full px-4 py-2 rounded bg-secondary text-background"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column: Order Details */}
                <div className="p-4 bg-primary shadow-md rounded-lg">
                    <h2 className="text-xl font-bold text-text mb-4">Order Details</h2>
                    <ul className="space-y-4">
                        <li className="flex justify-between text-text_subtitle">
                            <span>Item 1</span>
                            <span>€10.00</span>
                        </li>
                        <li className="flex justify-between text-text_subtitle">
                            <span>Item 2</span>
                            <span>€15.00</span>
                        </li>
                        <li className="flex justify-between text-text_subtitle font-bold">
                            <span>Total</span>
                            <span>€25.00</span>
                        </li>
                    </ul>

                    <button
                        onClick={handleSubmit}
                        className="mt-6 w-full bg-accent text-background px-6 py-2 rounded hover:bg-accent-dark"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
