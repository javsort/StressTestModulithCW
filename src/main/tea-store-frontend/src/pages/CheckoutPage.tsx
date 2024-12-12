// Updated CheckoutPage.tsx
import React, { useState } from 'react';

const CheckoutPage: React.FC = () => {
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardType: '',
    cardNumber: '',
    expiryDate: '',
  });

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Submitting Order:', { billingInfo, paymentDetails });
    // Add logic to handle order submission
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-text mb-6">Checkout</h1>

      {/* Billing Information */}
      <div className="mb-6 p-4 bg-primary shadow-md rounded-lg">
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
      <div className="mb-6 p-4 bg-primary shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-text mb-4">Payment Details</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="cardType" className="block text-text_subtitle">Card Type</label>
            <input
              type="text"
              id="cardType"
              name="cardType"
              value={paymentDetails.cardType}
              onChange={handlePaymentChange}
              className="w-full px-4 py-2 rounded bg-secondary text-background"
            />
          </div>
          <div>
            <label htmlFor="cardNumber" className="block text-text_subtitle">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentChange}
              className="w-full px-4 py-2 rounded bg-secondary text-background"
            />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block text-text_subtitle">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentDetails.expiryDate}
              onChange={handlePaymentChange}
              className="w-full px-4 py-2 rounded bg-secondary text-background"
            />
          </div>
        </form>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-accent text-background px-6 py-2 rounded hover:bg-accent-dark"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
