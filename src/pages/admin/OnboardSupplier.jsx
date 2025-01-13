import React, { useState, useEffect } from "react";
import axios from "axios";

const OnboardSupplier = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(""); // Track error message

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sellers/pending")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setPendingSellers(response.data);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching pending sellers:", error);
        setError("Failed to load sellers. Please try again later.");
        setIsVisible(false);
      });
  }, []);

 const handleApprove = (id) => {
   axios
     .put(`http://localhost:5000/api/sellers/${id}/approve`)
     .then((response) => {
       console.log("Seller approved:", response.data);
       if (response.data.seller.status === "approved") {
         setPendingSellers((prevState) =>
           prevState.filter((seller) => seller.id !== id)
         );
       }
     })
     .catch((error) => {
       console.error("Error approving seller:", error);
     });
 };


 const handleDeny = (id) => {
   const reason = prompt("Please specify the reason for denial:");
   if (reason) {
     axios
       .put(`http://localhost:5000/api/sellers/${id}/deny`, { reason })
       .then((response) => {
         console.log("Seller denied:", response.data);
         if (response.data.seller.status === "denied") {
           setPendingSellers((prevState) =>
             prevState.filter((seller) => seller.id !== id)
           );
         }
       })
       .catch((error) => {
         console.error("Error denying seller:", error);
       });
   }
 };


  const createBlobURL = (base64) => {
    const binary = atob(base64.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    const blob = new Blob([new Uint8Array(array)], { type: "application/pdf" });
    return URL.createObjectURL(blob);
  };

  // Styles
  const containerStyle = {
    padding: "20px",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const noSuppliersStyle = {
    textAlign: "center",
    color: "#6c757d",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    border: "1px solid #dee2e6",
    padding: "8px",
    backgroundColor: "#f8f9fa",
    textAlign: "left",
  };

  const tdStyle = {
    border: "1px solid #dee2e6",
    padding: "8px",
    textAlign: "left",
  };

  const trHoverStyle = {
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Onboard Suppliers</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {pendingSellers.length === 0 && !error ? (
        <p style={noSuppliersStyle}>No pending suppliers.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Business Name</th>
              <th style={thStyle}>Store Description</th>
              <th style={thStyle}>Kebele ID</th>
              <th style={thStyle}>Business License</th>
              <th style={thStyle}>TIN Certificate</th>
              <th style={thStyle}>VAT Certificate</th>
              <th style={thStyle}>Physical Address</th>
              <th style={thStyle}>Bank Account</th>
              <th style={thStyle}>Categories</th>
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
                <td style={tdStyle}>
                  {seller.kebele_id && (
                    <div>
                      <a
                        href={createBlobURL(seller.kebele_id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "none" }}
                      >
                        View Kebele ID (PDF)
                      </a>
                    </div>
                  )}
                </td>
                <td style={tdStyle}>
                  {seller.business_license && (
                    <div>
                      <a
                        href={createBlobURL(seller.business_license)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "none" }}
                      >
                        View Business License (PDF)
                      </a>
                    </div>
                  )}
                </td>
                <td style={tdStyle}>
                  {seller.tin_certificate && (
                    <div>
                      <a
                        href={createBlobURL(seller.tin_certificate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "none" }}
                      >
                        View TIN Certificate (PDF)
                      </a>
                    </div>
                  )}
                </td>
                <td style={tdStyle}>
                  {seller.vat_certificate && (
                    <div>
                      <a
                        href={createBlobURL(seller.vat_certificate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "none" }}
                      >
                        View VAT Certificate (PDF)
                      </a>
                    </div>
                  )}
                </td>
                <td style={tdStyle}>{seller.physical_address}</td>
                <td style={tdStyle}>{seller.bank_account}</td>
                <td style={tdStyle}>{seller.categories}</td>
                <td style={tdStyle}>{seller.status}</td>
                <td style={tdStyle}>
                  {new Date(seller.created_at).toLocaleString()}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleApprove(seller.id)}
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(seller.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
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
