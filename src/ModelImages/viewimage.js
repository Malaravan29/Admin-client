import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModelImageDisplay = () => {
  const [modelImages, setModelImages] = useState([]);

  // Fetch the model data from the API
  useEffect(() => {
    const fetchModelImages = async () => {
      try {
        // Retrieve the token from local storage (or context)
        const token = localStorage.getItem('token'); // Adjust as needed

        const response = await axios.get('http://localhost:5000/getModelImages', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        });
        setModelImages(response.data);
      } catch (error) {
        console.error('Error fetching the model images:', error);
      }
    };

    fetchModelImages();
  }, []);

  return (
    <div>
      <h1>Model Images</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {modelImages.length > 0 ? (
          modelImages.map((model) => (
            <div key={model._id} style={styles.card}>
              <h3>{model.model}</h3>
              <img
                src={model.image} // The base64 image string is used directly here
                alt={model.model}
                style={styles.image}
              />
            </div>
          ))
        ) : (
          <p>No models found.</p>
        )}
      </div>
    </div>
  );
};

// Styles for the cards and images
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    width: '200px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
};

export default ModelImageDisplay;
