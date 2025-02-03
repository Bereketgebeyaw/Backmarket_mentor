import React, { useEffect, useState } from 'react';
import { fetchRequests } from '../../services/requestService'; // Import the fetch function for requests
import axios from 'axios';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleApprove = async (requestId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/request/approve/${requestId}`);
      if (response.status === 200) {
        // Update the status locally
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, status: 'approved' } : request
          )
        );
      }
    } catch (error) {
      console.error('Error approving request:', error);
      setError('Failed to approve request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/request/reject/${requestId}`);
      if (response.status === 200) {
        // Update the status locally
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, status: 'rejected' } : request
          )
        );
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      setError('Failed to reject request');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Requested Products</h2>
      <table style={{ width: '75%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '300px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Request ID</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Category</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Subcategory</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Product Name</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Date Requested</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{request.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{request.category_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{request.subcategory_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{request.product_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{request.status}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                {new Date(request.created_at).toLocaleDateString()}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                <button
                  onClick={() => handleApprove(request.id)}
                  style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', marginRight: '10px' }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
