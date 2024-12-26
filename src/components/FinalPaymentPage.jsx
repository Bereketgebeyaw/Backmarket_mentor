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

  const handleSubmit = () => {
    if (paymentOption === 'bankTransfer' && !selectedBank) {
      alert('Please select a bank for the bank transfer.');
      return;
    }
    navigate('/paymentSuccess');
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
