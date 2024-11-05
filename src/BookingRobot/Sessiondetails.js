import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import { Button } from '@mui/material'; // Import Material-UI Button
import './AllSessions.css'; // Import your CSS file for styling

const AllSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust according to your token storage
        const response = await axios.get('/sessions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSessions(response.data.data); // Adjust based on your response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sessions-container">
      <h1>All Booked Sessions</h1>
      <table className="sessions-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Date</th>
            <th>Conformation Mail</th> 
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id}>
              <td>{session.name}</td>
              <td>{session.companyName}</td>
              <td>{session.email}</td>
              <td>{session.mobile}</td>
              <td>{session.address}</td>
              <td>{new Date(session.date).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // Handle button click here
                    console.log(`Entering session for: ${session.name}`);
                  }}
                >
                  Enter
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSessions;
