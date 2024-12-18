import React, { useState } from 'react';

const CheckoutPage = ({ isLoggedIn, onLoginRequired }) => {
  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert('Please login to continue.');
      onLoginRequired(); // Redirect to login
    } else {
      alert('Checkout successful!');
      // Proceed with checkout
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <button onClick={handleCheckout} className="checkout-button">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutPage;
