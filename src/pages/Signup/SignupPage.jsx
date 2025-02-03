// SignupPage.js
import React, { useState } from 'react';
import './SignupPage.css';
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/bottomBar/Footer';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const cartData = localStorage.getItem("checkoutCart");
      const cartItems = cartData ? JSON.parse(cartData) : [];

      // Extract only product_id and quantity for each cart item
      const mappedCartItems = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password,
           }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('Signup successful!');
        window.location.href = '/login'; // Redirect to login page
      } else {
        setErrorMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server. Please try again.');
    }
  };

  return (
    <div className='contain'>
     
      
    <div className="signup-container">
    <div className='container1'>
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="signup-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="signup-button">
          Sign Up
        </button>

      </form>
      <p
        className="signup-link"
       
      >
        Already have an account? <a href="/login">Login here</a>.
      </p>
      </div>
      </div>
      
    </div>
  );
};

export default SignupPage;
