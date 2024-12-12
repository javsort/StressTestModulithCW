// Updated CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmOrder } from '../services/api';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [subtotal, setSubtotal] = useState<string>('0.00');
    const [billingInfo, setBillingInfo] = useState({
        firstName: 'Jon',
        lastName: 'Snow',
        address: 'Winterfell',
    });

    const storedBillingInfo = localStorage.getItem('billingInfo');

    useEffect(() => {
        if (storedBillingInfo) {
            setBillingInfo(JSON.parse(storedBillingInfo));
        }
    }, [storedBillingInfo]);

    const [paymentDetails, setPaymentDetails] = useState({
        cardType: 'Visa',
        cardNumber: '314159265359',
        checkSum: '299',
        expiryDate: '12/2025',
    });

    const sessionId = localStorage.getItem('sessionId');

    useEffect(() => {
        // Load cart items passed from CartPage
        if (location.state?.cartItems) {
            setCartItems(location.state.cartItems);
        }
    }, [location.state]);

    useEffect(() => {
        // Calculate subtotal whenever cart items change
        const calculateSubtotal = () => {
            const total = cartItems
                .reduce((sum, item) => sum + item.price * item.units, 0)
                .toFixed(2);
            setSubtotal(total);
        };

        calculateSubtotal();
    }, [cartItems]);

    const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };

    const handleStringPayMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handlePayMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = async () => {
        
        localStorage.setItem('billingInfo', JSON.stringify(billingInfo));

        console.log('Billing info now in local storage:', billingInfo);

        const orderPayload = {
            cardNumber: paymentDetails.cardNumber,
            cardOwner: billingInfo.firstName,
            cardOwnerLastname: billingInfo.lastName,
            cardOwnerAddress: billingInfo.address,
            checksum: paymentDetails.checkSum,
            sessionId,
            cardType: paymentDetails.cardType,
            cardExpiry: paymentDetails.expiryDate,
        };

        try {
            await confirmOrder(orderPayload);
            console.log('Order placed successfully:', orderPayload);
            navigate('/order/successful');

        } catch (error) {

            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
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
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between text-text_subtitle">
                                <span>{item.name}</span>
                                <span>€{(item.price * item.units).toFixed(2)}</span>
                            </li>
                        ))}
                        <li className="flex justify-between text-text_subtitle font-bold">
                            <span>Total</span>
                            <span>€{subtotal}</span>
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
