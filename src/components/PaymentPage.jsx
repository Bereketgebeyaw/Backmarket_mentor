import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    deliveryLocation: '',
    pickupMethod: 'inPerson', // Default to in-person
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/pickupPage', { state: { paymentData: formData } }); // Pass the formData to the PickupPage
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Delivery Details</h1>
        <p style={styles.description}>
          You are providing delivery details for product ID: <strong>{productId}</strong>
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="firstName" style={styles.label}>First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="lastName" style={styles.label}>Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
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
          <div style={styles.formGroup}>
            <label htmlFor="pickupMethod" style={styles.label}>Pickup Method:</label>
            <select
              id="pickupMethod"
              name="pickupMethod"
              value={formData.pickupMethod}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="delivery">Home Delivery</option>
              <option value="inPerson">In-Person Pickup</option>
            </select>
          </div>
          {formData.pickupMethod === 'delivery' && (
            <div style={styles.formGroup}>
              <label htmlFor="deliveryLocation" style={styles.label}>Delivery Location:</label>
              <input
                type="text"
                id="deliveryLocation"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                placeholder="Enter delivery location"
                required
                style={styles.input}
              />
            </div>
          )}
          <button type="submit" style={styles.button}>Continue</button>
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
