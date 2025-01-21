import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FinalPaymentPage from './FinalPaymentPage';

const PickupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deliveryMethod, setDeliveryMethod] = useState('today'); // Default to "Today"
  const { paymentData } = location.state || {};

  useEffect(() => {
    if (paymentData?.deliveryMethod) {
      setDeliveryMethod(paymentData.deliveryMethod);
    }
  }, [paymentData]);

  const handleDeliveryChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handleEdit = () => {
    navigate('/paymentPage', { state: { ...paymentData } }); // Redirect to Payment Page with existing data
  };
  const handleContinue = () => {
    // Add logic here to navigate to the next step, e.g., to the order confirmation page
    navigate('/FinalPaymentPage'); // Replace '/nextPage' with the actual route you want to navigate to
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Pickup Information</h1>
        {paymentData && (
          <div style={styles.paymentInfo}>
            <h2>Delivery Information:</h2>
            <p><strong>First Name:</strong> {paymentData.firstName}</p>
            <p><strong>Last Name:</strong> {paymentData.lastName}</p>
            <p><strong>Email:</strong> {paymentData.email}</p>
            {paymentData.pickupMethod === 'delivery' && (
              <p><strong>Delivery Location:</strong> {paymentData.deliveryLocation}</p>
            )}
            {/* Edit button placed here */}
            <button onClick={handleEdit} style={styles.editButton}>
              Edit Delivery Details
            </button>
          </div>
        )}
        <p style={styles.description}>
          Thank you for providing your delivery details. Please select your pickup preference:
        </p>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="deliveryMethod"
              value="today"
              checked={deliveryMethod === 'today'}
              onChange={handleDeliveryChange}
              style={styles.radioInput}
            />
            Pickup Today
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="deliveryMethod"
              value="in1to3Days"
              checked={deliveryMethod === 'in1to3Days'}
              onChange={handleDeliveryChange}
              style={styles.radioInput}
            />
            Pickup In 1-3 Days
          </label>
        </div>
        <button onClick={handleContinue} style={styles.continueButton}>
          Continue
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f8f9fa',
    fontFamily: "'Roboto', sans-serif",
  },
  card: {
    background: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '90%',
    maxWidth: '650px',
  },
  title: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#333',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  paymentInfo: {
    marginBottom: '20px',
    textAlign: 'left',
    color: '#333',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  radioLabel: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  radioInput: {
    marginRight: '10px',
  },
  editButton: {
    background: '#ff9900',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
    transition: 'background 0.3s',
  },
  continueButton: {
    background: '#38170c', // Green color for continue button
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '20px', // Adds space between radio options and button
    transition: 'background 0.3s',
  },
};

export default PickupPage;
