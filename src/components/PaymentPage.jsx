import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pickupMethod: "inPerson", // Default to in-person
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = (e) => {
   e.preventDefault();

   if (formData.pickupMethod === "inPerson") {
     // Set shop address for in-person pickup
     localStorage.setItem(
       "address",
       JSON.stringify({
         street: "123 Shop Street",
         city: "CityName",
         state: "StateName",
         zip_code: "12345",
         country: "CountryName",
       })
     );
   } else {
     // Save entered delivery address to local storage
     const address = {
       street: formData.street,
       city: formData.city,
       state: formData.state,
       zip_code: formData.zip_code,
       country: formData.country,
     };
     localStorage.setItem("address", JSON.stringify(address));
   }

   // Navigate to the next page
   navigate("/pickupPage", { state: { paymentData: formData } });
 };



  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Delivery Details</h1>
        <p style={styles.description}>
          You are providing delivery details for product ID:{" "}
          <strong>{productId}</strong>
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="firstName" style={styles.label}>
              First Name:
            </label>
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
            <label htmlFor="lastName" style={styles.label}>
              Last Name:
            </label>
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
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
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
            <label htmlFor="pickupMethod" style={styles.label}>
              Pickup Method:
            </label>
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
          {formData.pickupMethod === "delivery" && (
            <>
              <div style={styles.formGroup}>
                <label htmlFor="street" style={styles.label}>
                  Street Address:
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter your street address"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="city" style={styles.label}>
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="state" style={styles.label}>
                  State/Region:
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state/region"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="zipCode" style={styles.label}>
                  ZIP/Postal Code:
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Enter your ZIP/postal code"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="country" style={styles.label}>
                  Country:
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  required
                  style={styles.input}
                />
              </div>
            </>
          )}
          <button type="submit" style={styles.button}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f8f9fa",
    fontFamily: "'Roboto', sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "450px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "15px",
    color: "#333",
    fontWeight: "bold",
  },
  description: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  form: { textAlign: "left" },
  formGroup: { marginBottom: "20px" },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    outline: "none",
    transition: "box-shadow 0.3s",
  },
  select: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    outline: "none",
    transition: "box-shadow 0.3s",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
    transition: "background 0.3s, transform 0.2s",
  },
};

export default PaymentPage;
