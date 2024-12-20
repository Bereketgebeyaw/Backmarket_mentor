import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
   e.preventDefault();

   if (!email || !password) {
     setErrorMessage("Email and password are required.");
     return;
   }

   try {
     // Read cart items from localStorage
     const cartData = localStorage.getItem("checkoutCart");
     const cartItems = cartData ? JSON.parse(cartData) : [];

     // Extract only product_id and quantity for each cart item
     const mappedCartItems = cartItems.map((item) => ({
       product_id: item.id,
       quantity: item.quantity,
     }));

     // Construct request body and exclude cartItems if empty
     const requestBody = { email, password };
     if (mappedCartItems.length > 0) {
       requestBody.cartItems = mappedCartItems; // Only include cartItems if they exist
     }

     // API call to back-end login route
     const response = await fetch("http://localhost:5000/api/users/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(requestBody), // Send only email, password, and cartItems (if not empty)
     });

     const data = await response.json();

     if (response.ok) {
       alert("Login successful!");
       localStorage.removeItem("checkoutCart"); // Clear cart from localStorage after login
       window.location.href = "/buyer/dashboard"; // Redirect to buyer dashboard
     } else {
       setErrorMessage(data.message || "Invalid email or password.");
     }
   } catch (error) {
     console.error("Error during login:", error);
     setErrorMessage("Server error. Please try again later.");
   }
 };



      if (response.ok) {
        // If login is successful, redirect to dashboard
        alert('Login successful!');
        navigate('/user'); // Redirect to buyer dashboard
      } else {
        // Display error message if login fails
        setErrorMessage(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Server error. Please try again later.');
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
          name="email"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          className="login-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p
        className="login-link"
      >
        Don't have an account?
        <a href="/signup">Sign up here</a>.
      </p>
    </div>
  );
};

export default LoginPage;
