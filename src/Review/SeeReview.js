import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getReview } from '../redux/action';

const ReviewList = () => {
 // Loading state
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.counter.review);


  // Fetch reviews on component mount
 
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Reviews</h2>
      { (
        reviews.length > 0 ? (
          <div style={styles.reviewContainer}>
            {reviews.map((review, index) => (
              <div key={index} style={styles.reviewCard}>
                <h3 style={styles.name}>{review.name}</h3>
                <p style={styles.review}>{review.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noReviews}>No reviews available.</p>
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  loadingText: {
    fontSize: '18px',
    color: '#666',
  },
  noReviews: {
    fontSize: '18px',
    color: '#888',
  },
  reviewContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // 2 columns for better layout on larger screens
    gap: '20px',
  },
  reviewCard: {
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'left',
  },
  name: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#007bff',
    marginBottom: '10px',
  },
  review: {
    fontSize: '16px',
    color: '#555',
  },
};

export default ReviewList;
