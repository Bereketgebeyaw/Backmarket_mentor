import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { productId } = useParams();

  const handlePayment = () => {
    // Mock payment logic - Replace with payment gateway integration (e.g., Stripe, PayPal)
    alert(`Payment successful for Product ID: ${productId}`);
  };

  return (
    <div style={styles.container}>
      <h1>Payment Page</h1>
      <p>You are paying for product ID: {productId}</p>
      <button onClick={handlePayment} style={styles.button}>
        Pay Now
      </button>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', marginTop: '50px' },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default PaymentPage;
