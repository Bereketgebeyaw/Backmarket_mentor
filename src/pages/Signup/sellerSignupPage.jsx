import React, { useState } from "react";
import "./SignupPage.css";

const SellerSignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState(""); // Seller business name
  const [storeDescription, setStoreDescription] = useState(""); // Seller store description
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !businessName ||
      !storeDescription
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
     const isSeller= 'True';
    try {
      // Prepare the data for the request
      const requestData = {
        name,
        email,
        password,
        isSeller,
        businessName,
        storeDescription,
      };

      console.log("Sending request with data:", requestData); // Debugging line

      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert("Signup successful!");
        window.location.href = "/login"; // Redirect to login page
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setErrorMessage("Error connecting to the server. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Seller Sign Up</h2>
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

        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="signup-input"
        />
        <textarea
          placeholder="Store Description"
          value={storeDescription}
          onChange={(e) => setStoreDescription(e.target.value)}
          className="signup-input"
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <p className="signup-link">
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default SellerSignupPage;
