import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    deliveryLocation: '',
    paymentMethod: 'creditCard', // Default to credit card
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`
      Payment successful!
      Product ID: ${productId}
      Name: ${formData.name}
      Email: ${formData.email}
      Delivery Location: ${formData.deliveryLocation}
      Payment Method: ${formData.paymentMethod}
    `);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Payment Page</h1>
        <p style={styles.description}>You are paying for product ID: <strong>{productId}</strong></p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Basic Information */}
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>

          {/* Delivery Location */}
          <div style={styles.formGroup}>
            <label htmlFor="deliveryLocation" style={styles.label}>Delivery Location:</label>
            <input
              type="text"
              id="deliveryLocation"
              name="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={handleChange}
              placeholder="Enter your delivery location"
              required
              style={styles.input}
            />
          </div>

          {/* Payment Method */}
          <div style={styles.formGroup}>
            <label htmlFor="paymentMethod" style={styles.label}>Payment Method:</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="creditCard">Credit Card</option>

              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button}>Pay Now</button>
        </form>
      </div>
    </div>
  );
};

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
    maxWidth: '450px',
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
  form: { textAlign: 'left' },
  formGroup: { marginBottom: '20px' },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    transition: 'box-shadow 0.3s',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    transition: 'box-shadow 0.3s',
  },
  button: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '100%',
    transition: 'background 0.3s, transform 0.2s',
  },
};

export default PaymentPage;
