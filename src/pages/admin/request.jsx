import React, { useEffect, useState } from 'react';

const Requests = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders/admincontact');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/deletecontact/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }
      setSubmissions(submissions.filter(submission => submission.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const styles = {
    submissionList: {
      margin: '20px',
      marginLeft: '18rem',
      marginTop: '-30rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      border: '1px solid #ccc',
      padding: '10px',
      backgroundColor: '#f2f2f2',
    },
    td: {
      border: '1px solid #ccc',
      padding: '10px',
    },
    deleteButton: {
      cursor: 'pointer',
      color: 'red',
    },
  };

  return (
    <div style={styles.submissionList}>
      <h1>Contact Submissions</h1>
      {submissions.length === 0 ? (
        <p>No submissions available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Message</th>
              <th style={styles.th}>Submitted On</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td style={styles.td}>{submission.name}</td>
                <td style={styles.td}>{submission.email}</td>
                <td style={styles.td}>{submission.address}</td>
                <td style={styles.td}>{submission.message}</td>
                <td style={styles.td}>
                  {new Date(submission.created_at).toLocaleString()}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(submission.id)}
                  >
                    Delete
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

export default Requests;