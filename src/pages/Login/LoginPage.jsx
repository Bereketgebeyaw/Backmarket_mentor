import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    if (email === 'user@example.com' && password === 'password123') {
      alert('Login successful!');
      window.location.href = '/buyer/dashboard'; // Redirect to buyer dashboard
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="login-link">
        Don't have an account? <a href="/signup">Sign up here</a>.
      </p>
    </div>
  );
};

export default LoginPage;
