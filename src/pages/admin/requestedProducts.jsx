import React, { useEffect, useState } from 'react';
import { fetchRequests } from '../../services/requestService';
import axios from 'axios';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [indexTermsMap, setIndexTermsMap] = useState({});
  const [approvedRequests, setApprovedRequests] = useState(new Set()); // Tracks approved requests
  const [showIndexTermsColumn, setShowIndexTermsColumn] = useState(false);
  const [message, setMessage] = useState(""); // To display success or error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
      } catch (error) {
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  const handleApprove = (requestId) => {
    setApprovedRequests((prev) => new Set(prev).add(requestId));
    setShowIndexTermsColumn(true); // Show "Index Terms" column
    if (!indexTermsMap[requestId]) {
      setIndexTermsMap((prev) => ({ ...prev, [requestId]: [] }));
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/request/reject/${requestId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        console.log("here");
        throw new Error("Failed to reject request");
      }
  
      // Remove the rejected request from the list
      setRequests((prevRequests) => prevRequests.filter((r) => r.id !== requestId));
  
      console.log(`Request ${requestId} rejected successfully.`);
    } catch (error) {
      console.error("Error rejecting request:", error);
      setError("Failed to reject request");
    }
  };
  

  const handleAddTerm = (requestId, term) => {
    if (term.trim()) {
      setIndexTermsMap((prev) => ({
        ...prev,
        [requestId]: [...prev[requestId], term],
      }));
    }
  };

  const handleRemoveTerm = (requestId, termToRemove) => {
    setIndexTermsMap((prev) => ({
      ...prev,
      [requestId]: prev[requestId].filter((term) => term !== termToRemove),
    }));
  };

  const handleAddToCatalog = async (request) => {
    setIsSubmitting(true);
    setMessage(""); // Clear any previous messages
  
    const formData = {
      product_name: request.product_name,
      product_description: request.product_description || "", // Default value if missing
      category_id: request.category_id,
      subcategory_id: request.subcategory_id,
      brand: request.brand || "", // Default value if missing
      model: request.model || "", // Default value if missing
      size: request.size || "", // Default value if missing
      index_terms: indexTermsMap[request.id] || [], // Include entered index terms
    };
  
    try {
      // Send request to add to catalog
      const response = await fetch("http://localhost:5000/catalog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add catalog item");
      }
  
      const data = await response.json();
      setMessage(`Success: ${data.message}`);
  
      // If successfully added to catalog, approve the request
      const approveResponse = await fetch(`http://localhost:5000/request/approve/${request.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!approveResponse.ok) {
        console.log('here');
        throw new Error("Failed to approve request");
      }
      setRequests((prevRequests) => prevRequests.filter((r) => r.id !== request.id));
      console.log(`Request ${request.id} approved successfully.`);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error adding catalog item or approving request.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '2rem' , marginTop:"-35rem"}}>
      <h2 style={{marginLeft: '32rem', marginTop:'-3rem', marginBottom:'2rem'}}>Requested Products</h2>
      {message && <div style={{ marginLeft:'20rem', marginBottom: "10px", color: "blue" }}>{message}</div>}

      <table style={{ width: '75%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '300px' }}>
        <thead>
          <tr style={{backgroundColor:'khaki'}}>
            <th style={{  padding: '10px' }}>Request ID</th>
            <th style={{  padding: '10px' }}>Category</th>
            <th style={{  padding: '10px' }}>Subcategory</th>
            <th style={{  padding: '10px' }}>Product Name</th>
            <th style={{  padding: '10px' }}>Status</th>
            <th style={{  padding: '10px' }}>Date Requested</th>
            {showIndexTermsColumn && (
              <th style={{  padding: '10px' }}>Index Terms</th>
            )}
            <th style={{  padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:"rgb(218, 231, 227)"}}>
          {requests.map((request) => (
            <tr key={request.id}>
              <td style={{ padding: '10px' }}>{request.id}</td>
              <td style={{ padding: '10px' }}>{request.category_name}</td>
              <td style={{ padding: '10px' }}>{request.subcategory_name}</td>
              <td style={{  padding: '10px' }}>{request.product_name}</td>
              <td style={{ padding: '10px' }}>{request.status}</td>
              <td style={{  padding: '10px' }}>
                {new Date(request.created_at).toLocaleDateString()}
              </td>

              {/* Show Index Terms Column Only After Approval */}
              {showIndexTermsColumn && (
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  {approvedRequests.has(request.id) ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter term"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddTerm(request.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        style={{
                          padding: '5px',
                          width: '90%',
                          marginBottom: '5px',
                        }}
                      />
                      <ul style={{ listStyle: 'none', paddingBottom: '0rem', margin:'0.1rem' ,backgroundColor:'white'}}>
                        {indexTermsMap[request.id]?.map((term, index) => (
                          <li key={index} style={{ display: 'flex', alignItems: 'center' ,  marginLeft: '-2rem',}}>
                            {term}
                            <button
                              onClick={() => handleRemoveTerm(request.id, term)}
                              style={{
                                marginLeft: '10px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0px 10px',
                              }}
                            >
                              X
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    indexTermsMap[request.id]?.join(', ') || '—'
                  )}
                </td>
              )}

              {/* Actions Column */}
              <td style={{ border: 'none', padding: '10px', width:"15rem", }}>
                {!approvedRequests.has(request.id) ? (
                    <>
                  <button onClick={() => handleApprove(request.id)} style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' ,marginRight:"1rem" }}>
                    Approve
                  </button>
                  <button onClick={() => handleReject(request.id)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}>
                  Reject
                 </button>
                 </>
                ) : (
                  <button onClick={() => handleAddToCatalog(request)} disabled={isSubmitting} style={{ backgroundColor: '#38170c', color: 'white', padding: '5px 10px' }}>
                    {isSubmitting ? "Adding..." : "Add to Catalog"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
