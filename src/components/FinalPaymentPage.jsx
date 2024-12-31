import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cbe from '../assets/cbe.png';
import bunna from '../assets/bunna.png';
import dashen from  '../assets/dashen.png';

const FinalPaymentPage = () => {
  const navigate = useNavigate();
  const [paymentOption, setPaymentOption] = useState('bankTransfer'); // Default to 'Bank Transfer'
  const [selectedBank, setSelectedBank] = useState('');

  const banks = [
    { id: 1, name: 'commercial Bank of Ethiopia', logo: cbe },
    { id: 2, name: 'Bunna Bank', logo: bunna },
    { id: 3, name: 'Dashen Bank', logo: dashen },
  ];

  const handlePaymentChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleBankSelect = (bankName) => {
    setSelectedBank(bankName);
  };
const handleSubmit = async () => {
  if (paymentOption === "bankTransfer" && !selectedBank) {
    alert("Please select a bank for the bank transfer.");
    return;
  }

  // Retrieve the address and token from localStorage
  const addressData = localStorage.getItem("address");
  const token = localStorage.getItem("authToken");

  console.log("Address Data from LocalStorage:", addressData);
  console.log("Token Data from LocalStorage:", token);
  if (!addressData) {
    alert("No address found. Please provide delivery details.");
    return;
  }
  if (!token) {
    alert("No token found. Please login.");
    return;
  }

  let address;
  let tokenData;

  try {
    // Parse the address and create the token object
    address = JSON.parse(addressData);
    tokenData = { token }; // Wrap the token string in an object

    console.log("Parsed Address:", address);
    console.log("Token Object:", tokenData);

    // Validate if all required fields are present
    if (
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zip_code ||
      !address.country
    ) {
      throw new Error(
        "Missing required address fields (Street, City, State, ZIP Code, Country)."
      );
    }
  } catch (error) {
    console.error("Error parsing address data:", error);
    alert(
      "Error reading address data from localStorage. Please check the stored address."
    );
    return;
  }

  // Combine address and token into a single object
  const payload = {
    address,
    token: tokenData.token, // Use the token directly
  };

  // Send the payload to the backend API
  try {
    const response = await fetch("http://localhost:5000/address/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Send the combined object
    });

    if (response.ok) {
      // Proceed to payment success page on success
      navigate("/paymentSuccess");
    } else {
      const errorData = await response.json();
      console.error("Error from backend:", errorData); // Log error response
      alert(`Failed to register address: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error registering address:", error);
    alert("An error occurred while registering the address. Please try again.");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Final Payment</h1>

        <div style={styles.paymentOptionGroup}>
          <div style={styles.radioOption}>
            <input
              type="radio"
              name="paymentOption"
              value="telebir"
              checked={paymentOption === 'telebir'}
              onChange={handlePaymentChange}
              style={styles.radioInput}
            />
            <span style={styles.paymentLabel}>Telebir</span>
          </div>
          <div style={styles.radioOption}>
            <input
              type="radio"
              name="paymentOption"
              value="bankTransfer"
              checked={paymentOption === 'bankTransfer'}
              onChange={handlePaymentChange}
              style={styles.radioInput}
            />
            <span style={styles.paymentLabel}>Bank Transfer</span>
          </div>
          <div style={styles.radioOption}>
            <input
              type="radio"
              name="paymentOption"
              value="cashOnDelivery"
              checked={paymentOption === 'cashOnDelivery'}
              onChange={handlePaymentChange}
              style={styles.radioInput}
            />
            <span style={styles.paymentLabel}>Cash on Delivery</span>
          </div>
        </div>

        {paymentOption === 'bankTransfer' && (
          <div style={styles.bankSelection}>
            <h2>Select Your Bank</h2>
            <div style={styles.bankCardsContainer}>
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  onClick={() => handleBankSelect(bank.name)}
                  style={{
                    ...styles.bankCard,
                    border: selectedBank === bank.name ? '3px solid #28a745' : '1px solid #ddd',
                  }}
                >
                  <img src={bank.logo} alt={bank.name} style={styles.bankLogo} />
                  <span>{bank.name}</span>
                </div>
              ))}
            </div>
            {selectedBank && <p style={styles.selectedBankText}>Selected Bank: {selectedBank}</p>}
          </div>
        )}

        <button onClick={handleSubmit} style={styles.submitButton}>
          Proceed to Payment
        </button>
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
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '90%',
    maxWidth: '700px',
  },
  title: {
    fontSize: '30px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold',
  },
  paymentOptionGroup: {
    marginBottom: '30px',
  },
  radioOption: {
    marginBottom: '15px',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInput: {
    marginRight: '10px',
  },
  paymentLabel: {
    fontSize: '18px',
    color: '#333',
  },
  bankSelection: {
    marginTop: '30px',
    textAlign: 'left',
    color: '#333',
  },
  bankCardsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  bankCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    width: '120px',
    height: '100px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, border 0.3s ease',
  },
  bankLogo: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  selectedBankText: {
    fontSize: '16px',
    color: '#28a745',
    fontWeight: 'bold',
  },
  submitButton: {
    background: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'background 0.3s, transform 0.3s',
  },
  submitButtonHover: {
    background: '#218838',
    transform: 'scale(1.05)',
  },
};

export default FinalPaymentPage;
