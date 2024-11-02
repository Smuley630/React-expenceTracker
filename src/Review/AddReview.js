import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ReviewForm = () => {
  const [review, setreview] = useState(''); // State to hold review text
  const [successMessage, setSuccessMessage] = useState(''); // Message to show on success or failure
  const count = useSelector((state) => state.counter.userName);
  let name = count
console.log("   /////////",name)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      // Make POST request to submit the review
    //   const response = await axios.post(apiUrl, { review: review });
      const response = await axios.post('http://localhost:8000/user/addReview', { name, review  });


      if (response.status === 200) {
        setSuccessMessage('Review submitted successfully!');
        alert(successMessage)
        setreview(''); // Clear input after successful submission
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSuccessMessage('Failed to submit review. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          style={styles.textarea}
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setreview(e.target.value)}
        />
        <br />
        <button type="submit" style={styles.button}>Submit Review</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    borderColor: '#ccc',
  },
  button: {
    padding: '10px 20px',
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ReviewForm;
