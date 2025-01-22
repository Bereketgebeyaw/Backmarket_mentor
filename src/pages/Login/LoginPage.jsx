import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import Footer from "../../components/bottomBar/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      // Read cart items from localStorage
      const cartData = localStorage.getItem("cart");
      const cartItems = cartData ? JSON.parse(cartData) : [];

      // Extract only product_id and quantity for each cart item
      const mappedCartItems = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      // Read favorites from localStorage
      const favoritesData = localStorage.getItem("favorites");
      const favorites = favoritesData ? JSON.parse(favoritesData) : [];

      // Extract product_id for each favorite item
      const mappedFavorites = favorites.map((item) => ({
        id: item.id,
      }));

      // Construct request body
      const requestBody = { email, password };
      if (mappedCartItems.length > 0) {
        requestBody.cartItems = mappedCartItems; // Include cartItems if they exist
      }
      if (mappedFavorites.length > 0) {
        requestBody.favorites = mappedFavorites; // Include favorites if they exist
      }

      // API call to back-end login route
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Send email, password, cartItems, and favorites
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store the token in localStorage
        const token = data.token; // Assuming the token is returned as data.token
        if (token) {
          localStorage.setItem("authToken", token); // Store the token in localStorage
          window.location.href = '/user-dashboard';
        }

       
        if(data.user.role === "user"){
                   if (mappedCartItems.length > 0) {
                      // Clear cart from localStorage after login
                     navigate("/user");
                   } else {
                     navigate("/user-dashboard"); // Redirect to user dashboard
                   }
        }
        // Remove the cart and favorites from localStorage after login
        localStorage.removeItem("cart");
        localStorage.removeItem("favorites");

        // Check if the user is a seller and navigate accordingly
        if (data.user.role === "seller") {
            if (data.seller.status === "approved") {
               if (data.user.password_reset === "yes") {
                 navigate("/reset");
               }
               else{navigate("/seller");}
              
            } 
            else if (data.seller.status === "denied") {
              alert(
                "Your request to become a seller has been denied. Please contact support for further assistance."
              );
              navigate("/");
            } else {
              alert(
                "Your account is not yet approved by the admin. Please try logging in again once you receive approval."
              );

              navigate("/");
            }
        } 
        else if (data.user.role === "admin") {
            navigate("/admin"); 
        } 
        
      } else {
        setErrorMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="top_bar">
      <TopBar />
      <div className="login-container">
        <div className="container">
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
          <p className="login-link">
            New here? <a href="/signup">Sign up as a buyer</a> or{" "}
            <a href="/register">register as a seller</a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
