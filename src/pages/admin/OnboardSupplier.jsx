import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OnboardSupplier = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // Control visibility

  useEffect(() => {
    // Fetch pending sellers
    axios
      .get('http://localhost:5000/api/sellers/pending')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setPendingSellers(response.data);
          setIsVisible(true); // Show table if sellers exist
        } else {
          setIsVisible(false); // Hide table if no sellers exist
        }
      })
      .catch((error) => {
        console.error('Error fetching pending sellers:', error);
        setIsVisible(false); // Hide table on error
      });
  }, []);

  // Approve Seller
  const handleApprove = (id) => {
    axios
      .put(`http://localhost:5000/api/sellers/${id}/approve`)
      .then((response) => {
        console.log('Seller approved:', response.data);
        // Optionally, update the state to reflect the change
        if (response.data.seller.status === 'approved') {
          setPendingSellers(prevState => prevState.filter(seller => seller.id !== id));
        }
      })
      .catch((error) => {
        console.error('Error approving seller:', error);
      });
  };
  
  // Deny Seller
  const handleDeny = (id) => {
    axios
      .put(`http://localhost:5000/api/sellers/${id}/deny`)
      .then((response) => {
        console.log('Seller denied:', response.data);
        // Optionally, update the state to reflect the change
        if (response.data.seller.status === 'denied') {
          setPendingSellers(prevState => prevState.filter(seller => seller.id !== id));
        }
      })
      .catch((error) => {
        console.error('Error denying seller:', error);
      });
  };

  const containerStyle = {
    width: '80%',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
  };

  const thStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#333',
  };

  const trHoverStyle = {
    backgroundColor: '#f1f1f1',
  };

  const noSuppliersStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Onboard Suppliers</h1>
      {pendingSellers.length === 0 ? (
        <p style={noSuppliersStyle}>No pending suppliers.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Business Name</th>
              <th style={thStyle}>Store Description</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Created At</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingSellers.map((seller) => (
              <tr key={seller.id} style={trHoverStyle}>
                <td style={tdStyle}>{seller.business_name}</td>
                <td style={tdStyle}>{seller.store_description}</td>
                <td style={tdStyle}>{seller.status}</td>
                <td style={tdStyle}>{new Date(seller.created_at).toLocaleString()}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleApprove(seller.id)}
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      marginRight: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(seller.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OnboardSupplier;
