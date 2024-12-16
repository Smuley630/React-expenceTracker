import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const location = useLocation();

  const [review, setreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const count1 = useSelector((state) => state.counter);
  const navigate = useNavigate();
  const name = location.state
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/addReview', { name, review });
      if (response.status === 200) {
        setSuccessMessage('Review submitted successfully!');
        alert("Review submitted successfully!")
        setreview('');
        navigate(-1);

      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSuccessMessage('Failed to submit review. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ flex: 1, textAlign: "center" }}>Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          style={styles.textarea}
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setreview(e.target.value)}
        />
        <br />
        <div style={{ alignItems: "center" }}>
          <button type="submit" style={styles.button}>Submit Review</button>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    margin: '20px auto',
    justifyContent: "center", alignItems: "center",
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '14px',
    borderColor: '#ccc',
  },
  button: {
    padding: '10px 20px',
    marginTop: '30px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: "200px"
  },
};

export default ReviewForm;
